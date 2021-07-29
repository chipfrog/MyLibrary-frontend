/* eslint-disable no-undef */
describe('User creation', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
  })

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('user creation window opens', function() {
    cy.get('#create_user-button').click()
    cy.contains('Register new user')
  })

  it('new user can be created', function() {
    cy.get('#create_user-button').click()
    cy.get('#usernameRegister').type('new_user')
    cy.get('#passwordRegister').type('new_password')
    cy.get('#submit-button').click()
  })

  it(`user can't be created if username already exists`, function() {
    cy.get('#create_user-button').click()
    cy.get('#usernameRegister').type('new_user')
    cy.get('#passwordRegister').type('new_password')
    cy.get('#submit-button').click()
  }) 
})

describe('Login', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Login')
    cy.contains('Create User')
  })

  it('login works with correct credentials', function() {
    cy.get('#username-field').type('new_user')
    cy.get('#password-field').type('new_password')
    cy.get('#login-button').click()

    cy.contains('My Library')
  })

  it(`login doesn't work wiht wrong password`, function() {
    cy.get('#username-field').type('test_user')
    cy.get('#password-field').type('wrong_password')
    cy.get('#login-button').click()

    cy.contains('Oops!')
  })
})

describe.only('When logged in...', function() {
  beforeEach(function() {
    // cy.visit('http://localhost:3000')
    // cy.get('#username-field').type('new_user')
    // cy.get('#password-field').type('new_password')
    // cy.get('#login-button').click()
    cy.login({ username: 'new_user', password: 'new_password' })
  })

  it('books can be searched', function() {
    cy.visit('http://localhost:3000')
    cy.get('#keyWords').type('Prince of Thorns')
    cy.get('#search_books-button').click()

    cy.contains('Search results for "Prince of Thorns"')
  })

  // it('book info can be viewed', function() {
  //   cy.get_search_results()
  // })
})




