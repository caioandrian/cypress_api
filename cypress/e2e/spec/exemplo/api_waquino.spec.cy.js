import {API_Exemplo} from '../../../services/exemplo/api_waquino.service'
import Rest from '../../../services/common/_rest_service'

describe('Criar conta para movimentação', () => {
    it('Criar nova conta com sucesso', () => {
      //logar no sistema e salvar o token
      var user = Cypress.env("users")['exemplo'];
      API_Exemplo.get_token(user.email, user.password)

      //resetar app
      Rest.obter_resposta('GET', 'wcaquino', 'exemplo', 'reset')

      //criar um json
      Rest.get_query('nome', 'Conta qualquer 5').as('get_body')

      //request para criar conta
      cy.get('@get_body')
        .then((body ) => {
          Rest.obter_resposta('POST', 'wcaquino', 'exemplo', 'contas', body).as('response')
        })
      
      //validacao da resposta
      cy.get('@response')
        .then(res => {
          Rest.valida_valor_propriedade_no_corpo_da_resposta(res, 'nome', 'Conta qualquer 5')
        })
    })

    it('Conta duplicada', () => {
      //logar no sistema e salvar o token
      var user = Cypress.env("users")['exemplo'];
      API_Exemplo.get_token(user.email, user.password)

      //resetar app
      Rest.obter_resposta('GET', 'wcaquino', 'exemplo', 'reset')

      //criar um json
      Rest.get_query('nome', 'Conta para alterar').as('get_body')

      //request para criar conta
      cy.get('@get_body')
        .then((body ) => {
          Rest.obter_resposta('POST', 'wcaquino', 'exemplo', 'contas', body).as('response')
        })

      //validacao da resposta
      cy.get('@response')
        .then(res => {
          Rest.valida_valor_propriedade_no_corpo_da_resposta(res, 'error', 'Já existe uma conta com esse nome!')
        })
    })
})