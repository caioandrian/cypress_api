import {Given, When, Then, Before} from 'cypress-cucumber-preprocessor/steps'

import Rest from '../../../services/common/_rest_service'

Then(`deve retornar na resposta o status code {int}`, (status_code_esperado) => {
	cy.get('@response').then(res => {
        Rest.validacao_status_code(res, status_code_esperado)
    })
});

Then(`deve retornar no corpo da resposta uma mensagem de erro`, () => {
	cy.get('@response').then(res => {
        Rest.validacao_mensagem_erro_existe(res)
    })
});

Then(`deve retornar no corpo da resposta uma mensagem de erro com a {string}`, (mensagem_esperada) => {
	cy.get('@response').then(res => {
        Rest.validacao_texto_mensagem_erro(res, mensagem_esperada)
    })
});

Then(`deve obter como resposta o schema {string} com status {int}`, (schema, status) => {
	cy.get('@response').then(res => {
        cy.validacao_de_contrato(res, schema, status).then(valid => {
            expect(valid).to.be.true;
        })
    })
});

Then(`o tempo de resposta deverá ser menor do que {int} segundos`, (tempo_limite) => {
	cy.get('@response').then(res => {
        Rest.valida_tempo_resposta(res, tempo_limite)
    })
});
