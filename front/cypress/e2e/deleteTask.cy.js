describe("Suppression de tâche", () => {
  beforeEach(() => {
    cy.window().then((win) => {
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
    });
  });

  it("supprime une tâche", () => {
    cy.intercept("GET", "**/api/tasks/*", {
      statusCode: 200,
      body: [
        {
          _id: "task-1",
          text: "Faire les courses",
          date: new Date().toISOString().split("T")[0],
        },
      ],
    }).as("getTasks");

    cy.intercept("DELETE", "**/api/tasks/task-1", {
      statusCode: 200,
      body: {
        message: "Tâche supprimée",
      },
    }).as("deleteTask");

    cy.visit("/auth-home");

    cy.wait("@getTasks");

    cy.contains("Faire les courses").should("be.visible");

    cy.get('[data-cy="delete-task"]').click();

    cy.wait("@deleteTask");

    cy.contains("Faire les courses").should("not.exist");
  });
});