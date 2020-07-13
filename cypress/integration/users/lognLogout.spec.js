describe('Test login', () => {
    it('Should go to the login page', () => {
      cy.visit('/')
      cy.contains('Login').click()
      cy.url().should('include', '/auth/login')
    })
    it('should render SignIn component', () => {
        cy.root().should('contain','Username')
          .should('contain', 'Password')
      })
    })
  