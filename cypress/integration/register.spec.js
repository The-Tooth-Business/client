describe('Test Register', () => {
	it('should route to /auth/register', () => {
		cy.viewport(1024, 768);
		cy.visit('/');
		cy.get('[data-cy=register]').click();
		cy.url().should('include', '/auth/register');
	});
});
