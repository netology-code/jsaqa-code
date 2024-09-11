const login = require("../fixtures/login");
const selectors = require("../fixtures/selectors");
const tests = require("../fixtures/seats");
const valid = login.valid;
const invalid = login.invalid;

describe("Working with the user interface", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should show correct number of days", () => {
    cy.get(selectors.daysWeek).should("have.length", 7);
  });

  tests.forEach((test) => {
    it(test.name, () => {
      cy.get(selectors.pageNav).click();
      cy.get(selectors.movie).first().contains("12:00").click();
      test.data.forEach((seat) => {
        cy.get(
          `${selectors.buyingScheme}  
           ${selectors.child}(${seat.row})  
           ${selectors.child}(${seat.seat})`
        ).click();
      });

      cy.get(selectors.acceptinButton).click();
      cy.contains(selectors.messageAboutSelectedTickets).should("be.visible");
    });
  });

  it.skip("Try to book a reserved seat", () => {
    cy.get(selectors.pageNav).click();
    cy.get(selectors.movie).first().contains("12:00").click();
    cy.get(`${selectors.child2}(5) > ${selectors.child2}(8)`).click();
    cy.get(selectors.acceptinButton).should("be.disabled");
  });
});

