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

  it(`login doesn't work wiht wrong password`, function() {
    cy.get('#username-field').type('test_user')
    cy.get('#password-field').type('wrong_password')
    cy.get('#login-button').click()

    cy.contains('Oops!')
  })

  it('login works with correct credentials', function() {
    cy.get('#username-field').type('new_user')
    cy.get('#password-field').type('new_password')
    cy.get('#login-button').click()

    cy.contains('My Library')
  })
})

describe('Searching and adding books', function() {
  beforeEach(function() {
    cy.login({ username: 'new_user', password: 'new_password' })
  })

  it('books can be searched', function() {
    cy.get('#keyWords').type('Prince of Thorns')
    cy.get('#search_books-button').click()
    cy.contains('Search results for "Prince of Thorns"')
  })

  it('book can be added', function() {
    cy.getSearchResults()
    cy.get('#1').click()
    cy.get('#add_book-button').click()
    
    cy.contains(`You're awesome!`)
  })

  it('book info can be opened', function() {
    cy.get('#book_cover').click()
    cy.contains('Review')
  })
})

describe('Editing book information', function() {
  it('review can be written and saved', function() {
    cy.get('#edit_review').click()
    cy.get('#review_box').type('This is a test review!')
    cy.get('#save_review-button').click()

    cy.contains('This is a test review!')
  })

  it('quote can be written and saved', function() {
    cy.get('#quotes_tab').click()
    cy.get('#add_quote-button').click()
    cy.get('#quote_box').type('This is a test quote!')
    cy.get('#save_quote-button').click()
    cy.contains('This is a test quote!')
  })

  it('quote can be deleted', function() {
    cy.get('#delete_quote-button').click()
    cy.contains('This is a test quote!').should('not.exist')
    
  })

  it('category can written and saved', function() {
    cy.get('#categories_tab').click()
    cy.get('#add_category-button').click()
    cy.get('#category_box').type('fantasy')
    cy.get('#save_category-button').click()

    cy.contains('fantasy')
  })

  it('category can be deleted', function() {
    cy.get('#delete_category-button').click()
    cy.contains('fiction').should('not.exist')
  })

  // it('book can be marked as read and owned', function() {

  // })
})






