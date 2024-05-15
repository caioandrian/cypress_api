import {API_Exemplo} from '../../../services/exemplo/api_waquino.service'
import Rest from '../../../services/common/_rest_service'

describe('Criar conta para movimentação', () => {

    it('Criação nova conta sucesso', () => {
      var user = Cypress.env("users")['exemplo'];
      API_Exemplo.get_token(user.email, user.password)

      Rest.obter_resposta('GET', 'wcaquino', 'exemplo', 'reset')
      Rest.get_query('nome', 'Conta qualquer 5').as('get_body')

      cy.get('@get_body').then((body ) => {
        Rest.obter_resposta('POST', 'wcaquino', 'exemplo', 'contas', body).as('response')
      })
      
      cy.get('@response').then(res => {
        console.log(res)
        Rest.valida_valor_propriedade_no_corpo_da_resposta(res, 'nome', 'Conta qualquer 5')
      })
    })

    it('Conta com nome já criado', () => {
      var user = Cypress.env("users")['exemplo'];
      API_Exemplo.get_token(user.email, user.password)

      Rest.obter_resposta('GET', 'wcaquino', 'exemplo', 'reset')
      Rest.get_query('nome', 'Conta para alterar').as('get_body')

      cy.get('@get_body').then((body ) => {
        Rest.obter_resposta('POST', 'wcaquino', 'exemplo', 'contas', body).as('response')
      })

      cy.get('@response').then(res => {
        Rest.valida_valor_propriedade_no_corpo_da_resposta(res, 'error', 'Já existe uma conta com esse nome!')
      })
    })
})