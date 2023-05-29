import {QuestionId} from "@/app/questionId";
import {AnswerRatio} from "@/app/answerRatio";
import {map} from "zod";

export class LocalDatabase {
    private static LOCAL_STORAGE_KEY = "answer-history"

    private database: Map<string, AnswerRatio>
    // @ts-ignore
    private storage: Storage;

    constructor(storage: Storage | undefined) {
        if (storage !== undefined) {
            this.storage = storage
        } else {
            this.storage = {
                getItem(key: string): string | null {
                    return null
                },
                setItem(key: string, value: string) {
                },
                key(index: number): string | null {
                    return null
                },
                clear() {
                },
                length: 0,
                removeItem(key: string) {
                }
            }
        }
        this.database = this.deserializeFromStorage()
    }

    markAnswerAsCorrect(questionId: QuestionId): AnswerRatio {
        let statistics = this.getStatisticsForQuestion(questionId)
        statistics.correct += 1
        statistics.total += 1

        this.setStatisticsForQuestion(questionId, statistics)

        return statistics
    }

    markAnswerAsIncorrect(questionId: QuestionId): AnswerRatio {
        let statistics = this.getStatisticsForQuestion(questionId)
        statistics.total += 1

        this.setStatisticsForQuestion(questionId, statistics)

        return statistics
    }

    getStatisticsForQuestion(questionId: QuestionId): AnswerRatio {
        return this.database.get(this.serializeQuestionId(questionId)) ?? { correct: 0, total: 0 }
    }

    size(): number {
        return this.database.size
    }

    /**
     * At least 20 questions which are worse than 50%
     */
    isEligibleForPractice(): Boolean {
        return this.getPracticeQuestions().length > 20
    }

    getPracticeQuestions(): Array<QuestionId> {
        return Array.from(this.database.entries()).filter(([_, v]) => {
            if (v.total === 0) {
                return false
            } else {
                return v.correct / v.total <= 0.5
            }
        }).map(([k, _]) => this.deserializeQuestionId(k))
    }

    reset() {
        this.database = new Map()
        this.serializeToStorage()
    }

    private setStatisticsForQuestion(questionId: QuestionId, newStatistics: AnswerRatio) {
        this.database.set(this.serializeQuestionId(questionId), newStatistics)
        this.serializeToStorage()
    }

    private serializeQuestionId(questionId: QuestionId): string {
        return `${questionId.league}-${questionId.day}-${questionId.index}`;
    }

    private deserializeQuestionId(questionId: string): QuestionId {
        const split = questionId.split("-")
        return {
            league: parseInt(split[0], 10),
            day: parseInt(split[1], 10),
            index: parseInt(split[2], 10)
        }
    }

    private serializeToStorage() {
        const data = JSON.stringify(Object.fromEntries(this.database))
        this.storage.setItem(LocalDatabase.LOCAL_STORAGE_KEY, data)
    }

    private deserializeFromStorage(): Map<string, AnswerRatio> {
        const json = this.storage.getItem(LocalDatabase.LOCAL_STORAGE_KEY)
        if (json === null) {
            return new Map()
        } else {
            return new Map(Object.entries(JSON.parse(json)))
        }
    }
}
