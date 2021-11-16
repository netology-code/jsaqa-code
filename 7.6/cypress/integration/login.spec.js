it("Should successfully login", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.visit("/booksNode");
  cy.contains("Log in").click();
  cy.get("#mail").type(" ");
  cy.get("#pass").type("test");
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Please fill out this field.");
});

it("Should not login with empty password", () => {
  cy.visit("/booksNode");
  cy.contains("Log in").click();
  cy.get("#mail").type("test@test.com");
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});
