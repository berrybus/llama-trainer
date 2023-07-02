import {Question} from "@/app/question";
import {QuestionId} from "@/app/questionId";

export interface AnswerAction {
    currentData: Question;
    questionId: QuestionId;
    isCorrect: boolean;
}
