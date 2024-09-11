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
    cy.contains("Log in").click();

    if(mail) {
        cy.get('#mail').type(mail);
    }
    if(password) {
        cy.get('#pass').type(password);
    }
    cy.contains("Submit").click();
   // cy.contains("Добро пожаловать " + mail).should("be.visible");
    
 })
 Cypress.Commands.add('validationMessage', (mail, Message) => {
    cy.get(mail)
    .then((elem) => elem[0].validationMessage)
    .should("contain", Message);
 })
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