beforeEach(() => {
	cy.viewport(1024, 768);
	cy.visit(Cypress.env('production')); //! change to 'development', 'staging' or 'production' here
	cy.get('#root').then((root) => {
		if (root.find('[data-cy=side-navbar]').length > 0) {
			cy.get('[data-cy=logout]').click();
		}
	});
});

describe('Parent login', () => {
	it('Should login as user', () => {
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('lulu');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=user]').should('be.visible');
	});
});

describe('Make new booking', () => {
	it('Should take input into a form and save it into a booking', () => {
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('lulu');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=user]').should('be.visible');
		cy.get('[data-cy=side-navbar]');
		cy.get('[data-cy=booking-new]').first().click();
		cy.url().should('include', '/booking/new');

		cy.get('input[name="child_name"]').type('Cat').should('have.value', 'Cat');
		cy.get('input[name="teeth"]').type('2').should('have.value', '2');
		cy.get('input[name="address"]')
			.type('123 Brown Lane')
			.should('have.value', '123 Brown Lane');
		cy.get('input[name="city"]').type('Sydney').should('have.value', 'Sydney');
		cy.get('input[name=postcode]').type('2000').should('have.value', '2000');
		cy.get('input[name="country"]')
			.type('Australia')
			.should('have.value', 'Australia');
		cy.get('input[name="continent"]')
			.type('Oceana')
			.should('have.value', 'Oceana');
		cy.get('select').select('Australian Dollar').should('have.value', 'AUD');
		cy.get('[data-cy=booking-new-submit]').click();
		cy.url().should('include', '/dashboard');
	});
});

describe('Parent logout', () => {
	it('Should login as a parent and successfully logout', () => {
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('lulu');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=logout]').first().click();
		cy.get('[data-cy=login-form]').should('be.visible');
	});
});
