describe("Suppression du compte", () => {
  it("supprime le compte utilisateur", () => {
    cy.intercept("DELETE", "**/account/delete", {
      statusCode: 200,
      body: {
        message: "Compte supprimé",
      },
    }).as("deleteAccount");

    cy.visit("/auth-home", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "fake-jwt-token");
        win.localStorage.setItem("admin_id", "1");
        win.localStorage.setItem(
          "admin_info",
          JSON.stringify({
            id: "1",
            email: "test@test.com",
            nom: "Dupont",
            prenom: "Jean",
          })
        );
      },
    });

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Password123!");
    });

    cy.get('[data-cy="open-user-menu"]').click();
    cy.get('[data-cy="go-account"]').click();

    cy.contains("Gérer mon compte").should("be.visible");

    cy.get('[data-cy="delete-account"]').click();

    cy.wait("@deleteAccount");

    cy.url().should("eq", "http://localhost:5173/");
  });
});