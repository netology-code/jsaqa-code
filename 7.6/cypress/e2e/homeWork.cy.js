const { test, bropet } = require("./users");

const title = "Гарри Поттер и философский камень";
const description =
  "Сюжет строится вокруг главного героя, сироты Гарри Поттера, который узнаёт, что он волшебник в его одиннадцатый день рождения.";
const authors = "Джоан Роулинг";

beforeEach(() => {
  cy.visit("/");

});

it("First test", () => {
  cy.get('[class="ml-2"]').should("be.visible");
});

describe("Tests from the lecture", () => {
  it("Should be login", () => {
    cy.login(test.mail, test.pass);
    cy.contains("Добро пожаловать " + test.mail).should("be.visible");
  });

  it("Check for missing email", () => {
    cy.login(null, test.pass);
    cy.get("#mail")
      .then((elem) => elem[0].checkValidity())
      .should("be.false");
    cy.validationMessage("#mail", "Заполните это поле.");
  });

  it("Check for missing password", () => {
    cy.login(test.mail, null);
    cy.validationMessage("#pass", "Заполните это поле.");
  });
});

describe("My tests", () => {
  it("creating a book", () => {
    cy.login(bropet.mail, bropet.pass);
    cy.contains("Добро пожаловать " + bropet.mail).should("be.visible");

    // Ждем полной .mail, test.pass);рузки страницы
    cy.get(".loader").should("not.exist");
    cy.get(".p-0 > .btn").click();
    cy.get("#title").type(title);
    cy.get("#description").type(description);
    cy.get("#authors").type(authors);
    cy.contains("Submit").click();

    cy.contains(".mt-3", title).should("be.visible");
  });

  it("checking the created book in the library", () => {
    cy.login(bropet.mail, bropet.pass);
    cy.contains("Добро пожаловать " + bropet.mail).should("be.visible");
    cy.contains(title).click();
    cy.contains(title).should("be.visible");
    cy.contains(description).should("be.visible");
    cy.contains(authors).should("be.visible");
  });

  it("Check the book from another account", () => {
    cy.login(bropet.mail, bropet.pass);
    cy.contains("Добро пожаловать " + bropet.mail).should("be.visible");
    cy.contains(title).click();
    cy.contains(title).should("be.visible");
    cy.contains(description).should("be.visible");
    cy.contains(authors).should("be.visible");
  });
});
