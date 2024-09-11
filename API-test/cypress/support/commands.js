

Cypress.Commands.add("workWithUser", (method, url, id, username, firstName, lastName, email, password, phone, userStatus) => {
  cy.request({ 
      method: method, 
      url: url, 
      body: { 
        id: id || null,
        username: username || null,
        firstName: firstName || null,
        lastName: lastName || null,
        email: email || null,
        password: password || null,
        phone: phone || null,
        userStatus: userStatus || null,
      }
  })
});



