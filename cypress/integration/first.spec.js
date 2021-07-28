/* eslint-disable no-undef */

describe('Login', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Login')
    cy.contains('Create User')
  })

  it('login works with correct credentials', function() {
    cy.get('#username-field').type('test_user')
    cy.get('#password-field').type('not_secure')
    cy.get('#login-button').click()

    cy.contains('My Library')
  })
})



