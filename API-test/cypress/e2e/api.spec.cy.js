const user = require('../fixtures/user');
const { id, userName, userName2, firstName, lastName, email, password, phone, userStatus } = user;

describe("API user tests", () => {
  it("Creating a user", () => {
    cy.workWithUser("POST", "/user", id[0], userName, firstName, lastName, email, password, phone, userStatus)
      .then((response) => {  
        expect(response.status).to.eql(200); 
        expect(response.body).to.eql({
          code: 200,
          type: "unknown",
          message: "987456",
        });
        cy.workWithUser("GET", "/user/" + userName)
        .then((response) => {
           expect(response.body.username).to.equal(userName);
});
      });
  });

  it("User editing", () => {
    cy.workWithUser("POST", "/user", id[0], userName, firstName, lastName, email, password, phone, userStatus)
      .then(() => {
        cy.workWithUser("PUT", "/user/Nikola", id[1], userName2, firstName, lastName, email, password, phone, userStatus)
          .then((response) => {  
            expect(response.body).to.eql({
              code: 200,
              type: "unknown",
              message: "789654",
            });
          });

          cy.workWithUser("GET", "/user/" + userName2)
            .then((response) => {
               expect(response.body.username).to.equal(userName2);
  });

      });
  });

  it("Delete user", () => {
    cy.workWithUser("POST", "/user", id[0], userName, firstName, lastName, email, password, phone, userStatus)
      .then(() => {
        cy.workWithUser("DELETE", "/user/Nikola")
          .then((response) => {  
            expect(response.status).to.eql(200);
            })
          });
      });
  });