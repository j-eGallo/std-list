describe("Inscription utilisateur", () => {
  it("inscrit un nouvel utilisateur", () => {
    cy.intercept("POST", "**/auth/register", {
      statusCode: 201,
      body: {
        message: "Compte créé",
        token: "fake-token",
        admin: {
          id: "1",
          email: "test@test.com",
          nom: "Dupont",
          prenom: "Jean",
        },
      },
    }).as("register");

    cy.visit("http://localhost:5173/");
    cy.get("body", { timeout: 10000 }).should("contain.text", "CONNEXION");
    cy.contains("CONNEXION").should("be.visible");
    cy.get('[data-cy="go-register"]', { timeout: 10000 }).should("be.visible").click();


    cy.get('[data-cy="register-prenom"]').type("Jean");
    cy.get('[data-cy="register-nom"]').type("Dupont");
    cy.get('[data-cy="register-next"]').click();

    cy.get('[data-cy="register-email"]').type("test@test.com");
    cy.get('[data-cy="register-password"]').type("Password123!");
    cy.get('[data-cy="register-confirm-password"]').type("Password123!");

    cy.get('[data-cy="register-submit"]').click();

    cy.wait("@register");

    cy.contains("Compte créé avec succès").should("be.visible");
  });
});