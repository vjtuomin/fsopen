describe('Blogs app', function() {
    
    beforeEach(function() {
       // cy.request('POST', 'http://localhost:3003/api/testing/reset')
       // cy.request('POST', 'http://localhost:3003/api/users/', { "username": "cypress","name": "Cypressuser","password": "salainen",})
        cy.visit('http://localhost:3000')
      })
  
    it('front page can be opened', function() {
      
      cy.contains('Log in to application')

    })
    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('#username').type('cypress')
        cy.get('#password').type('salainen')
        cy.get('#login').click()
        cy.contains('Cypressuser logged in')
      })
     

      describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('cypress')
            cy.get('#password').type('salainen')
            cy.get('#login').click()
            cy.contains('Cypressuser logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('random')
            cy.get('#password').type('asdasd')
            cy.get('#login').click()
            cy.contains('wrong credentials')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('cypress')
            cy.get('#password').type('salainen')
            cy.get('#login').click()
        })
    
        it('A blog can be created', function() {
          cy.get('#toggle').click()
            cy.get('#title').type('cypressblogi')
            cy.get('#author').type('testaaja')
            cy.get('#url').type('testi.com')
            cy.get('#submit').click()
            cy.contains('cypressblogi')
            cy.contains('testaaja')
        })
      })

  })