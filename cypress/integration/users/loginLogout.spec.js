let fixtures = {};

before(() => {
	cy.fixture('registeredUser.json').then((user) => {
		fixtures.registeredUser = user;
	});
});

// beforeEach(() => {
// 	cy.viewport(1024, 768);
// 	cy.visit('/');
// 	cy.get('[data-cy=navbar]').then((nav) => {
// 		if (nav.find('[data-cy=logout]').length > 0) {
// 			cy.get('[data-cy=logout]').click();
// 		}
// 	});
// });

describe('Test Login', () => {
	it('should route to /auth/login', () => {
		cy.visit('/');
		cy.get('[data-cy=login]').click();
		cy.url().should('include', '/auth/login');
	});
	it('should render SignIn component', () => {
		cy.get('[data-cy=login]').click();
		cy.get('[data-cy=login-form]').should('be.visible');
	});
	it('can login', () => {
		cy.get('[data-cy=login]').click();
		cy.get('[data-cy=username]').type('admin');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=logout]').should('be.visible');
		cy.get('[data-cy=logout]').click();
	});
});
describe('Logout', () => {
	it('should logout user', () => {
		cy.get('[data-cy=login]').click();
		cy.get('[data-cy=username]').type('admin');
		cy.get('[data-cy=password]').type('123456');
		cy.get('[data-cy=login-button]').click();
		cy.get('[data-cy=logout]').click();
		// cy.get('[data-cy=navLoggedOut').should('contain','guest')
	});
});
