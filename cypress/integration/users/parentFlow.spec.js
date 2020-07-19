// beforeEach(() => {
// 	cy.viewport(1024, 768);
// 	cy.visit('/auth/login');
// 	cy.get('#root').then((root) => {
// 		if (root.find('[data-cy=side-navbar]').length > 0) {
// 			cy.get('[data-cy=logout]').click();
// 		}
// 	});
// });

describe('Parent login', () => {
	it('Should login as user', () => {
		cy.viewport(1024, 768);
		cy.visit('/auth/login');
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('cat');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=user]').should('be.visible');
	});
});

describe('Make new booking', () => {
	it('Should take input into a form and save it into a booking', () => {
		cy.viewport(1024, 768);
		cy.visit('/auth/login');
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('cat');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
        cy.get('[data-cy=user]').should('be.visible');
        cy.get('[data-cy=navbar]');
        cy.get('[data-cy=new-booking]').first().click();
        cy.url().should('inlcude', '/booking/new');

        cy.get('input[name="child_name"]')
        .type("Cat")
        .should("have.value", "Cat");
        cy.get('input[name="surname"]')
        .type("Stevens")
        .should("have.value", "Stevens");
        cy.get('input[name="teeth"]')
        .type("2")
        .should("have.value", "2");
        cy.get('input[name="address"]')
        .type("123 Brown Lane")
        .should("have.value", "123 Brown Lane");
        cy.get('input[name="city"]')
        .type("Sydney")
        .should("have.value", "Sydney");
        cy.get('input[postcode]')
        .type("2000")
        .should("have.value", "2000");
        cy.get('input[name="country"]')
        .type("Australia")
        .should("have.value", "Australia");
        cy.get('input[name="continent"]')
        .type("Oceana")
        .should("have.value", "Oceana");
        cy.get('input[name="currency"]')
        .type("AUD")
        .should("have.value", "AUD");
        cy.get("form").submit();
        });
      });



describe('User logout', () => {
	it('Should login as user and successfully logout', () => {
		cy.viewport(1024, 768);
		cy.visit('/auth/login');
		cy.get('[data-cy=login-form]').should('be.visible');
		cy.get('[data-cy=username]').type('cat');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.url().should('include', '/dashboard');
		cy.get('[data-cy=logout]').first().click();
		cy.get('[data-cy=login-form]').should('be.visible');
	});
});