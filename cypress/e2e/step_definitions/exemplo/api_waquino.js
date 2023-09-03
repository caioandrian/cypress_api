import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {API_Exemplo} from '../../../services/exemplo/api_waquino.service'

Given(`que esteja com um token válido`, ()=>{
    var user = Cypress.env("users").user_exemplo;
    API_Exemplo.get_token(user.email, user.password)
})

Given(`que o saldo da conta {string} esteja com {string}`, (nomeConta, valor)=>{
    API_Exemplo.valida_saldo_conta(nomeConta, valor);
})

Given(`tenha resetado o banco de dados pela rota`, ()=>{
    API_Exemplo.reset_app_by_api();
})

When('criar uma nova conta com o nome {string}', (tipoNome) => {
    API_Exemplo.criar_uma_conta(tipoNome).as('response')
})

When('atualizar o nome da conta {string} pelo nome {string}', (nome_atual_conta, novo_nome) => {
    API_Exemplo.atualizar_uma_conta(nome_atual_conta, novo_nome).as('response')
})

When('criar uma nova transação na conta {string}', (nomeConta) => {
    API_Exemplo.criar_uma_transacao_na_conta(nomeConta).as('response')
})

When('deletar a transação com a descrição {string}', (descricao_transacao) => {
    API_Exemplo.remover_uma_transacao(descricao_transacao).as('response')
})

When('atualizar o status da transação com a descrição {string}', (descricaoTransacao) => {
    API_Exemplo.atualiza_uma_transacao_por_descricao(descricaoTransacao).as('response')
})

Then(`deverá apresentar o saldo atualizado na conta {string} com valor {string}`, (nomeConta, valor) => {
    API_Exemplo.valida_saldo_conta(nomeConta, valor);
})

Then(`deve apresentar no corpo da resposta o conteúdo {string}`, (tipoRetornoEsperado) => {
    cy.get('@response').then((res) => {
        API_Exemplo.valida_corpo_da_resposta(res, tipoRetornoEsperado)
    })
})

Then(`deve obter como resposta o schema {string} com status {int}`, (schema, status) => {
	cy.get('@response').then(res => {
        cy.validacao_de_contrato(res, schema, status).then(valid => {
            expect(valid).to.be.true;
        })
    })
});