describe('Fluxo de Compra - Sauce Demo', () => {

  beforeEach(() => {
    // Visita o site antes de cada teste
    cy.visit('https://www.saucedemo.com/')
  })

  it('Deve realizar login e adicionar um produto ao carrinho', () => {
    // Login
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Verificação: Se entramos na página de produtos
    cy.get('.title').should('contain', 'Products')

    // Adicionar produto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    // Verificar se o carrinho tem "1" item
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('Deve exibir erro ao tentar logar com usuário bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Verificação da mensagem de erro
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
  })
})