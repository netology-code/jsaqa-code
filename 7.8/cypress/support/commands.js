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
 Cypress.Commands.add('login', (mail, password) => {
    const selectors = require("../fixtures/selectors");
    
    if(mail) {
        cy.get(selectors.emailField).type(mail);
    }
    if(password) {
        cy.get(selectors.passwordField).type(password);
    }
    cy.get(selectors.loginButton).click();
   // cy.contains("Добро пожаловать " + mail).should("be.visible");
    
 })
//  Cypress.Commands.add('validationMessage', (mail, Message) => {
   
//  })
// 
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })