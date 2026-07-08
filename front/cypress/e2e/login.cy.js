describe("Connexion utilisateur", () => {
  it("connecte un utilisateur", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 200,
      body: {
        message: "Connecté",
        token: "fake-jwt-token",
        admin: {
          id: "1",
          email: "test@test.com",
          nom: "Dupont",
          prenom: "Jean",
        },
      },
    }).as("login");

    cy.visit("/");

    cy.get('[data-cy="login-email"]').type("test@test.com");
    cy.get('[data-cy="login-password"]').type("Password123!");
    cy.get('[data-cy="login-submit"]').click();


    
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.eq("fake-jwt-token");
    });

  });
});