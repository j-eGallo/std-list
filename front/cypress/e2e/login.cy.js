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

    cy.intercept("GET", "**/api/tasks/*", {
      statusCode: 200,
      body: [],
    }).as("getTasks");

    cy.visit("/");

    cy.get('[data-cy="login-email"]').type("test@test.com");
    cy.get('[data-cy="login-password"]').type("Password123!");
    cy.get('[data-cy="login-submit"]').click();

    cy.wait("@login");

    cy.url().should("include", "/auth-home");
  });
});