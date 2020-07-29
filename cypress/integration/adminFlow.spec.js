beforeEach(() => {
	cy.viewport(1024, 768);
	cy.visit(Cypress.env('production')); //! change to 'development', 'staging' or 'production' here
	cy.get('#root').then((root) => {
		if (root.find('[data-cy=side-navbar]').length > 0) {
			cy.get('[data-cy=logout]').click();
		}
	});
});

describe('Admin login', () => {
	it('Should login as admin', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=side-navbar]').should('be.visible');
	});
});

describe('Admin logout', () => {
	it('Should login as admin and successfully logout', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=logout]').first().click({ force: true });
		cy.get('[data-cy=login-form]').should('be.visible');
	});
});

describe('Admin dashboard should be visible', () => {
	it('Should show the Continent component and data cards', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=side-navbar]').should('be.visible');
		cy.get('[data-cy=continents]').should('be.visible');
		cy.get('[data-cy=card]').should('be.visible');
	});
});

describe('Wishes alerts and incoming should be visible', () => {
	it('Should show the wishes alerts', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=side-navbar]').should('be.visible');
		cy.get('[data-cy=incoming-wish]').should('be.visible');
		cy.get('[data-cy=alerts]').click();
		cy.get('[data-cy=alert-box]').should('be.visible');
	});
});

describe('Pending bookings', () => {
	it('Should show the number of pending bookings and disable buttons if no bookings are pending', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=pending]').should('be.visible');
		cy.get('[data-cy=pending-number]').should('be.visible');
		if (cy.get('[data-cy=pending-number]').contains('0')) {
			cy.get('[data-cy=pending-button]').should('be.disabled');
		}
		if (cy.get('[data-cy=pending-number]').should('not.contain', '0')) {
			cy.get('[data-cy=pending-button]').should('not.be.disabled');
		}
	});
});

describe('Should have the option to close bookings', () => {
	it('Should show a button to close a specific booking', () => {
		cy.viewport(1024, 768);
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type(Cypress.env('username'));
		cy.get('[data-cy=password]').type(Cypress.env('password'));
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=bookings]').should('be.visible');
		cy
			.get('[data-cy=booking]')
			.get('[data-cy=view-link]')
			.first()
			.click({ force: true });
		cy.get('[data-cy=close-button]').should('be.visible');
	});
});
