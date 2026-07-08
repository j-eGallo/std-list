describe("Ajout de tâche", () => {
  it("ajoute une tâche", () => {
    cy.intercept("GET", "**/api/tasks/*", {
      statusCode: 200,
      body: [],
    }).as("getTasksBefore");

    cy.intercept("POST", "**/api/tasks", {
      statusCode: 201,
      body: {
        _id: "task-1",
        text: "Faire les courses",
        date: new Date().toISOString().split("T")[0],
      },
    }).as("addTask");

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

    cy.wait("@getTasksBefore");

    cy.get('[data-cy="open-add-task"]')
      .should("be.visible")
      .click();

    cy.contains("Nom de la tâche").should("be.visible");

    cy.get('[data-cy="text-input"]')
      .should("be.visible")
      .type("Faire les courses");

    cy.get('[data-cy="submit-task"]').click();

    cy.wait("@addTask");
  });
});