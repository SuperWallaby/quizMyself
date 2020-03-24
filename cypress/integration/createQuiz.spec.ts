
type TQuiz = {
  title: string, options?: string[], answer: string, customHint: string,
  describe: string,
  img: string
}



describe("Test Create", function () {

  beforeEach(function () {
    cy.fixture('quize.json').as('quizes')
      .then(quizes => quizes.filter((quiz: any) => quiz.dev === "basic")).as('basicQuizes');

    cy.fixture('quize.json').as('quizes')
      .then(quizes => quizes.filter((quiz: any) => quiz.dev === "select-type")).as('selectQuizes');

    cy.fixture('quize.json').as('quizes')
      .then(quizes => quizes.filter((quiz: any) => quiz.dev === "full-test")).as('fullOptionalQuizes');

    cy.visit("/");
    cy.get("answerI").as("AnswerI")
      .get("essayI").as("EssayI")
      .get("addB").as("AddB")
      .get("essayTab").as("EssayTab")
      .get("selectTab").as("SelectTab").click()
      .get("multipleI").as("MultipleI")
  })

  const submitQuiz = () => cy.get("addB").click();
  const checkResult = (i: number) => cy.get("snackBar").invoke("text").should("include", i === 0 ? "remember" : "Added");
  const typeBasic = ({ answer, title }: TQuiz) => cy.get("@EssayTab").click().get("@AnswerI").type(answer).get("@EssayI").type(title);
  const checkEmpty = () => cy.get("@AnswerI").should("have.value", "").get("@EssayI").should("have.value", "")

  // Can Create Quiz
  it("Can Create Bassic-Quiz", function () {
    cy.wrap(this.basicQuizes).each((quiz: TQuiz, i) => {
      typeBasic(quiz).then(() => {
        submitQuiz()
        checkResult(i)
      })
    })

    checkEmpty()
  });

  it("Can Create Multi-Select-Quiz", function () {
    cy.wrap(this.selectQuizes).each((quiz: TQuiz, i) => {
      const { answer, title, options } = quiz;
      cy.get("@SelectTab").click();

      cy.get("multipleI").type(title);

      cy.wrap(options!).each((text: string, i, array) => {
        cy.get("optionI").eq(i).as("targetOp").type(text);

        if (answer === text) {
          cy.get("@targetOp").find("[data-cy=iconTrue]").click();
        }

        if (array.length !== i + 1) {
          cy.get("addOptionB").click()
        }
      })

      submitQuiz();

      cy.get("multipleI").should("have.value", "");
      cy.get("optionI").each(($op) => {
        cy.wrap($op).should("have.value", "");
      })
    })
  })

  it("Can Delete Option", function () {
    cy.get("@SelectTab").click();
    cy.get("addOptionB").click()
    cy.get("addOptionB").click()
    cy.get("addOptionB").click()
    cy.get("iconDelete").should("not.be.visible");
    cy.get("iconDelete").eq(1).invoke("show").click();
    cy.get("optionI").should('have.length', 3);
  })

  it.only("Can Create Full Option", function () {
    cy.wrap(this.fullOptionalQuizes).each((quiz: TQuiz, i) => {
      typeBasic(quiz).then(() => {
        // @ts-ignore
        cy.get("fileUploader").attachFile()
        submitQuiz()
        checkResult(i)
      })
    })

  })
})

  // export default "";


  //  다음 테스트들을 하나로 만든다.

