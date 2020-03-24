describe("Test Create", function () {

    beforeEach(function () {



    })

    it("Can Create Essay-Quiz", function () {
        cy.visit("/");
        cy.get(".TessayQuestionInput")
            .type("Molly");
    });
});
// export default "";
