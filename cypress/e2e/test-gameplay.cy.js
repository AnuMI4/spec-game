describe("2 player game", () => {
  const predictions = ["QH", "KC"];
  const guesses = [
    "AS",
    "QH",
    "AD",
    "QC",
    "AH",
    "QS",
    "AC",
    "QD",
    "KS",
    "JH",
    "KH",
    "JC",
    "KD",
    "JS",
    "KC",
    "JD",
    "TS",
    "JR",
    "TD",
    "JR",
    "TH",
    "JR",
    "TS",
    "JR",
  ];
  it("should play game", () => {
    cy.visit("/");
    cy.contains("2 Player").click();
    cy.get("input").each((input, i) => cy.wrap(input).type(predictions[i]));
    cy.contains("Submit Guesses").click();
    cy.get(".grid-item").each((item, i) => {
      if (i === 23) {
        cy.pause();
      }
      cy.wrap(item).click();
      cy.get("input").type(guesses[i], { delay: 2 });
      cy.contains("Submit").click();
    });
  });
});
