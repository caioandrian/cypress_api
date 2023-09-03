import Rest from '../common/_rest_service'

const URL_VOTES = '/votes'

export class API_Exemplo extends Rest{

    static get_token(user, passwd){
        let body = {email: user, redirecionar: false, senha: passwd}

        super.http_request_with_body('POST',  Cypress.env("exemplo") + '/signin', body)
            .its('body.token')
            .should('not.be.empty')
            .then(token => {
                Cypress.env('token', token)
            })
    }

    static reset_app_by_api(){
        super.http_request_without_body('GET', Cypress.env("exemplo") + '/reset').its('status').should('be.eq', 200)
    }

    static criar_uma_conta(nomeConta){
        let body = {nome: nomeConta}
        return super.http_request_with_body('POST', Cypress.env("exemplo") + '/contas', body)
    }

    static get_conta_por_name_QS(nomeConta){
        return super.http_request_without_body('GET', Cypress.env("exemplo") + '/contas', {}, {nome: nomeConta})
    }

    static atualizar_uma_conta(nomeConta, novoNome){
        return this.get_conta_por_name_QS(nomeConta).then(res => {
            let body = {nome: novoNome}
            super.http_request_with_body('PUT', Cypress.env("exemplo") + `/contas/${res.body[0].id}`, body)
        })
    }

    static criar_uma_transacao_na_conta(nomeConta){
        return this.get_conta_por_name_QS(nomeConta)
            .then((res) => {
                let body = {
                    conta_id: res.body[0].id,
                    data_pagamento: "20/10/2025",
                    data_transacao: "18/02/2021",
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }

                super.http_request_with_body('POST', Cypress.env("exemplo") + '/transacoes', body)
            })
    }

    static valida_saldo_conta(nomeConta, valor){
        super.http_request_without_body('GET', Cypress.env("exemplo") + '/saldo').then((res) => {
            let saldoConta = null

            res.body.forEach(c => {
                if(c.conta === nomeConta)
                    saldoConta = c.saldo
            })
            expect(saldoConta).to.be.eq(valor)
        })
    }

    static pegar_id_transacao_por_descricao_QS(descricaoTransacao){
        return super.http_request_without_body('GET', Cypress.env("exemplo") + '/transacoes', {}, {descricao: descricaoTransacao} )
    }

    static atualiza_uma_transacao_por_descricao(descricaoTransacao){
        return this.pegar_id_transacao_por_descricao_QS(descricaoTransacao).then( (res) => {
            let body = {
                status: true,
                data_transacao: "11/02/2021",
                data_pagamento: "18/02/2021",
                descricao: res.body[0].descricao,
                envolvido: res.body[0].envolvido,
                valor: res.body[0].valor,
                conta_id: res.body[0].conta_id
            }

            super.http_request_with_body('PUT', Cypress.env("exemplo") + `/transacoes/${res.body[0].id}`, body)
        })
    }

    static remover_uma_transacao(descricaoTransacao){
        return this.pegar_id_transacao_por_descricao_QS(descricaoTransacao).then((res) => {
            super.http_request_without_body('DELETE', Cypress.env("exemplo") + `/transacoes/${res.body[0].id}`)
        })
    }

    static valida_corpo_da_resposta(resposta, tipoRetornoEsperado){
        switch (tipoRetornoEsperado) {
            case "da conta":
                expect(resposta.body).to.have.property('id')
                expect(resposta.body).to.have.property('nome', resposta.body.nome)
                break;

            case "da transação":
                expect(resposta.body).to.have.property('id')
                expect(resposta.body).to.have.property('descricao', resposta.body.descricao)
                break;
        
            default:
                expect(resposta.body).to.have.property('error', tipoRetornoEsperado)
                break;
        }
    }
}
