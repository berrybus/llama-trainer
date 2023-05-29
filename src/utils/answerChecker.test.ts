import {expect, test} from "@jest/globals";

const answerChecker = require('./answerChecker');


test('checking a single answer works', () => {
    expect(answerChecker.checkSingleAnswer(
        "georg frideric handel",
        "handel"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "georg frideric handel",
        "haendel"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "georg frideric handel",
        "george frederick handel"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "the charge of the light brigade",
        "Charge of the Light Brigade"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "the charge of the light brigade",
        "the"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "the charge of the light brigade",
        "charge of the brigade"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "robert van de graaff",
        "van de graff"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "robert van de graaff",
        "graff"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "peace in/for our time",
        "peace in our time"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "peace in/for our time",
        "peace for our time"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "peace in/for our time",
        "peace in time"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "peace in/for our time",
        "peace"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "trefoils/shortbread",
        "shortbread"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "trefoils/shortbread",
        "trefoils"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "trefoils/shortbread",
        "oils"
    )).toBe(false);

    // TODO: unfortunate
    expect(answerChecker.checkSingleAnswer(
        "trefoils/shortbread",
        "short"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "six sigma",
        "five sigma"
    )).toBe(false);

    expect(answerChecker.checkSingleAnswer(
        "verrazzano",
        "verazzano"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "jacob riis",
        "Riis "
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "jacob riis",
        "Riis"
    )).toBe(true);
});


test('checking multiple answers works', () => {
    expect(answerChecker.checkAnswer(
        "",
        "trefoils/shortbread",
        "trefoils",
    )).toBe(true);

    // TODO: unfortunate
    expect(answerChecker.checkAnswer(
        "",
        "trefoils/shortbread",
        "oils"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "bathing (a child)",
        "bathing"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "While the first four days of August 1914 saw declarations of war among Germany and Russia, France, Belgium, and Great Britain, the first declaration of war in World War I, on July 28, involved two other countries. Identify those two combatants.",
        "austria-hungary, serbia",
        "serbia,austrohugary"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "While the first four days of August 1914 saw declarations of war among Germany and Russia, France, Belgium, and Great Britain, the first declaration of war in World War I, on July 28, involved two other countries. Identify those two combatants.",
        "austria-hungary, serbia",
        "austro-hungary,serbia"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "benjamin (ben)",
        "ben"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "benjamin (ben)",
        "benjamin"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "benjamin (ben)",
        "harry"
    )).toBe(false);

    expect(answerChecker.checkAnswer(
        "",
        "cultural revolution",
        "cultural"
    )).toBe(false);

    expect(answerChecker.checkAnswer(
        "",
        "gobstopper (also acc. jawbreaker)",
        "gobstopper"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "gobstopper (also acc. jawbreaker)",
        "jawbreaker"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "malleus maleficarum/hammer of witches",
        "hammer of witches"
    )).toBe(true);

    expect(answerChecker.checkAnswer(
        "",
        "malleus maleficarum/hammer of witches",
        "malleus maleficarum"
    )).toBe(true);

    // TODO: unfortunate
    expect(answerChecker.checkAnswer(
        "",
        "periodontics",
        "orthodontics"
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "jacob riis",
        "Riis "
    )).toBe(true);

    expect(answerChecker.checkSingleAnswer(
        "jacob riis",
        "Riis"
    )).toBe(true);
});



