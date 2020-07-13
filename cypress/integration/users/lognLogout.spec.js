describe('Login', () => {
    it('should route to /auth/login',() => {
        cy.viewport(1024, 768)
        cy.get('[data-cy=login]').click()
        cy.url().should('include', '/auth/login')
    })
    it('should render SignIn component', () => {
        cy.viewport(1024, 768)
        cy.get('[data-cy=login]').click()
        cy.get('[data-cy=loginForm]').should('be.visible')
    })
})
  