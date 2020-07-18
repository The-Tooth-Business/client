let fixtures = {}

before(() => {
	cy.fixture('registeredUser.json').then((user) => {
		fixtures.registeredUser = user;
	});
});

beforeEach(() => {
	cy.viewport(1024, 768);
	cy.visit('/auth/login');
    cy.get('[data-cy=username]').type('cat');
    cy.get('[data-cy=password]').type('123456');
    cy.get('[data-cy=login-button]').click();
});


// describe('Admin login', () => {
//     it('should render the login form', () => {
//         cy.viewport(1024, 768);
//         cy.visit('/');
//         cy.get('[data-cy=login-form]').should('be.visible');
//     });
// });

// describe('Dashboard render', () => {
//     it('should render the user\'s dashboard', () => {
        
//         // cy.get('[data-cy=toolbar]').should('be.visible');
//         cy.get('[data-cy=user]').should('be.visible');

//     });

    describe("Booking form test", () => {
        it("Can fill in the booking form", () => {
        //   cy.visit("/dashboard");
          
          cy.get('[data-cy=navbar]');
          cy.get('[data-cy=new-booking]').click({ multiple: true });
          
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
            .should("have.value", "molly@dev.dev");

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
// });