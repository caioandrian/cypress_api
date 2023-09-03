export default class Rest{
    static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.api({
            method: method,
            url: endpoint,
            body: body,
            headers: headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.api({
            method: method,
            url: endpoint,
            headers : headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static validacao_status_code(res, status_code_esperado){
        expect(res).to.have.deep.property('status', status_code_esperado)
    }

    static validacao_mensagem_erro_existe(res){
        if(res.body.hasOwnProperty('message')){
            expect(res.body.message).to.be.not.empty
        }else{
            expect(res.body.error).to.have.property('message').and.not.empty
        }
    }

    static validacao_texto_mensagem_erro(res, mensagem_esperada = ""){
        if(res.body.hasOwnProperty('message')){
            expect(res.body.message).to.contain(mensagem_esperada)
        }else{
            expect(res.body.error).to.have.deep.property('message', mensagem_esperada)
        }
    }

    static valida_tempo_resposta(res, limite = 5000){
        limite = limite * 1000
        expect(res.duration).to.be.lte(limite) 
    }

    static header(ie = 3){
        return {
            ie_id : ie,
            user_id: 9999
        }
    }

    static repeat_request_withbody_chance_ie(type, path, body = {}, qtde = 3){
        for (let i = 1; i <= qtde; i++) {
            this.http_request_with_body(type, path, body, this.header(i))
        }
    }

    static repeat_request_withoutbody_chance_ie(type, path, qtde = 3){
        for (let i = 1; i <= qtde; i++) {
            this.http_request_without_body(type, path, this.header(i))
        }
    }
}