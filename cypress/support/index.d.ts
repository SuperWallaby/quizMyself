
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        upload(selecter: string, fixturesPath: string): Chainable<Element>
    }
}