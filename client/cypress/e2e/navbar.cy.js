/// <reference types="cypress" />

describe("CustomNavbar", () => {
  it("renders the title and logo", () => {
    cy.visit("http://localhost:3000");

    cy.contains("La Marató Beacon Network Browser").should("be.visible");

    cy.get("img.lamaratologo").should("be.visible");
  });
});
