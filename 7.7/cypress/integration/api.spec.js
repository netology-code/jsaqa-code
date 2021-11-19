it('API test', ()=> {

cy.request({
    method: "POST",
    url: "https://petstore.swagger.io/v2/pet",
    body: {
      id: 1,
      category: {id: 0, name: "string"},
      name: "bobik",
      photoUrls: ["string"],
      tags: [{
          id: 0,
          name: "string",
        }],
      status: "available",
    }
  }).then((response) => {
    cy.log(JSON.stringify(response.body));
    expect(response.status).to.eq(200);
}) 
})