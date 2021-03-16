// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the login page', () => {
    cy.visit('/')
    cy.contains('h1', 'Login')
  })

  it('It should redirect user to home page', ()=>{
    cy.visit('/')
    cy.get('#login').click()
    cy.wait(2000)
    cy.request('/home')
  })
})
