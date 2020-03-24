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

import "cypress-file-upload";

Cypress.Commands.overwrite("get", (originalFn, selecter, options) => {
  const REGAX = new RegExp(/\.|\#|\[|\@/);
  if (REGAX.test(selecter)) return originalFn(selecter, options);
  return originalFn(`[data-cy=${selecter}]`, options);
});
