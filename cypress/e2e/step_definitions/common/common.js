import {Given, When, Then, Before} from 'cypress-cucumber-preprocessor/steps'

import Rest from '../../../services/common/_rest_service'

Given(`que tenha feito uma requisição do tipo {string} no ms de {string} no endpoint {string} no {string}`, (verbo, ms, endpoint, ambiente) => {
    Rest.obter_resposta(verbo, ms, ambiente, endpoint).as('response_pre')
})

Given(`que tenha feito uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {int} no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    Rest.obter_resposta_por_id(verbo, ms, ambiente, endpoint, id).as('response_pre')
})

Given(`que tenha adicionado a propriedade {string} e o valor {int} no header no {string}`, (propriedade_adicional, valor, ambiente) => {
    Rest.get_header_modificado(propriedade_adicional, valor).as('header_modificado')
})

Given(`que tenha adicionado a propriedade {string} e o valor {string} em uma query no {string}`, (propriedade, valor, ambiente) => {
    Rest.get_query(propriedade, valor).as('get_query')
})

Given(`que tenha adicionado a propriedade {string} e o valor {int} em uma query no {string}`, (propriedade, valor, ambiente) => {
    Rest.get_query(propriedade, valor).as('get_body')
})

Given(`que tenha feito uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um body no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_body').then((body ) => {
        Rest.obter_resposta(verbo, ms, ambiente, endpoint, body).as('response_pre_condicao')
    })
})

Given(`que tenha adicionado a propriedade {string} com valor {int} em um body no {string}`, (campo, valor, ambiente) => {
    Rest.get_query(campo, valor).as('get_body')
})

Given(`que tenha adicionado a propriedade {string} com valor {string} em um body no {string}`, (campo, valor, ambiente) => {
    Rest.get_query(campo, valor).as('get_body')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} no {string}`, (verbo, ms, endpoint, ambiente) => {
    Rest.obter_resposta(verbo, ms, ambiente, endpoint).as('response')

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um id criado recentemente no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@response_pre_condicao').then((res_pre) => {
        Rest.obter_resposta_por_id(verbo, ms, ambiente, endpoint, res_pre.body.id).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um id criado recentemente e um body no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_body').then((body) => {
        cy.get('@response_pre_condicao').then((res_pre) => {
            Rest.obter_resposta_por_id(verbo, ms, ambiente, endpoint, res_pre.body.id, body).as('response')
        })
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um id criado recentemente e um body e um header modificado no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@header_modificado').then((header) => {
        cy.get('@get_body').then((body) => {
            cy.get('@response_pre_condicao').then((res_pre) => {
                Rest.obter_resposta_por_id_e_body_e_header_modificado(verbo, ms, ambiente, endpoint, res_pre.body.id, header, body).as('response') 
            })
        })
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {int} no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    Rest.obter_resposta_por_id(verbo, ms, ambiente, endpoint, id).as('response')

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {string} no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    Rest.obter_resposta_por_id(verbo, ms, ambiente, endpoint, id).as('response')

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {int} e {string} com o id {int} no {string}`, (verbo, ms, endpoint, id, endpoint2, id2, ambiente) => {
    Rest.obter_resposta_por_2_ids(verbo, ms, ambiente, endpoint, id, endpoint2, id2).as('response')

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando uma query no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_query').then((query ) => {
        Rest.obter_resposta_por_query(verbo, ms, ambiente, endpoint, query).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando uma query e id do período {string} no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    cy.get('@get_query').then((query ) => {
        Rest.obter_resposta_por_id_e_query(verbo, ms, ambiente, endpoint, id, query).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {int} e o header modificado no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    cy.get('@header_modificado').then((header) => {
        Rest.obter_resposta_por_id_e_header_modificado(verbo, ms, ambiente, endpoint, id, header).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o header modificado no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@header_modificado').then((header) => {
        Rest.obter_resposta_header_modificado(verbo, ms, ambiente, endpoint, header).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} com o id {int} usando uma query e header modificado no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    cy.get('@get_query').then((query ) => {
        cy.get('@header_modificado').then((header) => {
            Rest.obter_resposta_por_id_e_por_query_e_header_modificado(verbo, ms, ambiente, endpoint, id, query, header).as('response')
        })
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando uma query e header modificado no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_query').then((query ) => {
        cy.get('@header_modificado').then((header) => {
            Rest.obter_resposta_por_query_e_header_modificado(verbo, ms, ambiente, endpoint, query, header).as('response')
        })
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um body e header modificado no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_body').then((body ) => {
        cy.get('@header_modificado').then((header) => {
            Rest.obter_resposta_por_body_e_header_modificado(verbo, ms, ambiente, endpoint, body, header).as('response')
        })
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um body no {string}`, (verbo, ms, endpoint, ambiente) => {
    cy.get('@get_body').then((body ) => {
        Rest.obter_resposta(verbo, ms, ambiente, endpoint, body).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando um body e id do período {string} no {string}`, (verbo, ms, endpoint, id, ambiente) => {
    cy.get('@get_body').then((body ) => {
        Rest.obter_resposta_por_id_e_body(verbo, ms, ambiente, endpoint, id, body).as('response')
    })

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})

When(`fizer uma requisição do tipo {string} no ms de {string} no endpoint {string} usando uma api key no {string}`, (verbo, ms, endpoint, ambiente) => {
    Rest.obter_resposta_por_api_key(verbo, ms, ambiente, endpoint).as('response')

    cy.wrap({"verbo": verbo, "ms": ms, "endpoint": endpoint, "ambiente": ambiente}).as('dados_endpoint')
})


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

Then(`deve retornar no corpo da resposta uma mensagem de erro com o texto {string}`, (mensagem_esperada) => {
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

Then(`deve obter um tempo de resposta menor que {int} segundos`, (tempo_limite) => {
	cy.get('@response').then(res => {
        Rest.valida_tempo_resposta(res, tempo_limite)
    })
});

Then(`deve retornar no corpo da resposta o total de {int} registros`, (quantidade = 1) => {
	cy.get('@response').then(res => {
        Rest.valida_quantidade_registros_no_corpo_da_resposta(res, quantidade)
    })
});

Then(`deve retornar no corpo da resposta um objeto não vazio`, (quantidade = 1) => {
	cy.get('@response').then(res => {
        Rest.valida_corpo_da_resposta_nao_vazio(res, quantidade)
    })
});

Then(`deve retornar no corpo da resposta um objeto vazio`, () => {
	cy.get('@response').then(res => {
        Rest.valida_corpo_da_resposta_vazio(res)
    })
});

Then(`não deve retornar no corpo da resposta nenhum registro`, () => {
	cy.get('@response').then(res => {
        Rest.valida_corpo_da_resposta_vazio(res)
    })
});

Then(`deve retornar no corpo da resposta o total de {int} registros dentro de {string}`, (quantidade = 1, propriedade) => {
	cy.get('@response').then(res => {
        Rest.valida_quantidade_registros_no_corpo_da_resposta(res, quantidade, propriedade)
    })
});

Then(`deve retornar no corpo da resposta um array`, () => {
	cy.get('@response').then(res => {
        Rest.valida_corpo_da_resposta_array(res)
    })
});

Then(`deve retornar no corpo da resposta um array não vazio`, () => {
	cy.get('@response').then(res => {
        Rest.valida_corpo_da_resposta_array(res)
        Rest.valida_corpo_da_resposta_nao_vazio(res)
    })
});

Then(`deve retornar no corpo da resposta a propriedade {string} com valor booleano`, (propriedade) => {
	cy.get('@response').then(res => {
        Rest.valida_propriedade_booleano_no_corpo_da_resposta(res, propriedade)
    })
});

Then(`deve retornar no corpo da resposta a propriedade {string} com valor booleano igual a {string}`, (propriedade, valor) => {
	cy.get('@response').then(res => {
        Rest.valida_propriedade_booleano_no_corpo_da_resposta(res, propriedade, valor)
    })
});

Then(`deve retornar no corpo da resposta a propriedade {string} com ao menos registro`, (propriedade) => {
	cy.get('@response').then(res => {
        Rest.valida_propriedade_nao_vazia_no_corpo_da_resposta(res, propriedade)
    })
});

Then(`deverá excluir com sucesso o registro que foi recém criado`, () => {
    cy.get('@response').then((res) => {
        cy.get('@dados_endpoint').then((caminho) => {
            Rest.obter_resposta_por_id("DELETE", caminho.ms, caminho.ambiente, caminho.endpoint, res.body.id).as('response_delete_after')
        })
    })

    cy.get('@response_delete_after').then((res_delete) => {
        Rest.validacao_status_code(res_delete)
    })
})

Then(`deve retornar no corpo da resposta a propriedade {string} com valor igual a {string}`, (propriedade, valor) => {
	cy.get('@response').then(res => {
        Rest.valida_valor_propriedade_no_corpo_da_resposta(res, propriedade, valor)
    })
});