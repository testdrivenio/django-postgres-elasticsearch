describe('Perusable', () => {
  it('Displays the home page.', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Perusable');
  });
});
