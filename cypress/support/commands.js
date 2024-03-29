// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('userState', JSON.stringify(body))
  })
})

Cypress.Commands.add('getSearchResults', () => {
  cy.get('#keyWords').type('Prince of Thorns')
  cy.get('#search_books-button').click()
})

Cypress.Commands.add('openInfoView', () => {
  cy.get('#book_cover').click()

})

Cypress.Commands.add('addBook', (keyword) => {
  cy.get('#keyWords').type(keyword)
  cy.get('#search_books-button').click()
  cy.get('#1').click()
  cy.get('#add_book-button').click()
})