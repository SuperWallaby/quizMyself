// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

Cypress.Commands.add("uploadDrop", (selecter, pathFixture) => {
  const dropEvent = {
    dataTransfer: {
      files: []
    }
  };

  return cy
    .fixture(pathFixture)
    .then(picture => {
      return Cypress.Blob.base64StringToBlob(picture, "image/jpeg").then(
        blob => {
          dropEvent.dataTransfer.files.push(blob);
        }
      );
    })
    .get(selecter)
    .trigger("drop", dropEvent, { force: true });
});

Cypress.Commands.add("upload", (selecter, pathFixture) => {
  return cy.get(selecter).then(subject => {
    cy.fixture(pathFixture, "base64").then(front => {
      Cypress.Blob.base64StringToBlob(front, "image/jpeg").then(function(blob) {
        var testfile = new File([blob], "filename", { type: mimeType });
        var dataTransfer = new DataTransfer();
        var fileInput = subject[0];

        dataTransfer.items.add(testfile);
        fileInput.files = dataTransfer.files;
        cy.wrap(subject).trigger("change", { force: true });
      });
    });
  });
});

Cypress.Commands.overwrite("get", (originalFn, selecter, options) => {
  const REGAX = new RegExp(/\.|\#|\[|\@/);
  if (REGAX.test(selecter)) return originalFn(selecter, options);
  return originalFn(`[data-cy=${selecter}]`, options);
});
