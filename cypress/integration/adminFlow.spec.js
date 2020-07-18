beforeEach(() => {
	cy.viewport(1024, 768);
	cy.visit('/');
	cy.get('#root').then((root) => {
		if (root.find('[data-cy=side-navbar]').length > 0) {
			cy.get('[data-cy=logout]').click();
		}
	});
});

describe('Admin login', () => {
	it('Should login as admin and render the balance component', () => {
		cy.viewport(1024, 768);
		cy.visit('/');
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('FIC');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=balance]').should('be.visible');
	});
});

describe('Admin logout', () => {
	it('Should login as admin and successfully logout', () => {
		cy.viewport(1024, 768);
		cy.visit('/');
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('FIC');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=logout]').first().click();
		cy.get('[data-cy=login-form]').should('be.visible');
	});
});
