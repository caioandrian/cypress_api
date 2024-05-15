export default class Rest{
    //Para teste local você pode mudar o método do cypress usando o plugin cy.api()

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

    static get_token(muser, passwd){
        let body = {email: user, redirecionar: false, senha: passwd}

        this.http_request_with_body('POST',  Cypress.env("exemplo").wcaquino + '/signin', body)
            .its('body.token')
            .should('not.be.empty')
            .then(token => {
                Cypress.env('token', token)
            })
    }

    static verificar_versao_endpoint(base, endpoint){
        if(endpoint.includes("v2") || endpoint.includes("v3")) base = base.replace("/v1", "")
        return base
    }

    static enviar_requisicao(verbo, endpoint, body = {}, header, query = {}){
        if(verbo != "GET" && verbo != "DELETE")
            return this.http_request_with_body(verbo, endpoint, body, header)
        
        return this.http_request_without_body(verbo, endpoint, header, query)
    }

    static get_valor_base_ms(ambiente, ms) {
        const minhaVariavel = Cypress.env(ambiente);
        const valorPropriedade = minhaVariavel[ms];
        return valorPropriedade;
    }

    static get_header_add_api_key(config_chave){
        let header_modificado = this.header()
        header_modificado["x-api-key"] = Cypress.env("keys")[config_chave]

        return cy.wrap(header_modificado)
    }

    static filtrar_array_por_valor_igual(array, propriedade, valor){
        return array.body.filter(function(objeto) {
            return objeto[propriedade] === valor;
        });
    }

    static filtrar_array_por_valor_diferente_de(array, propriedade, valor){
        return array.body.filter(function(objeto) {
            return objeto[propriedade] !== valor;
        });
    }

    static validacao_status_code(res, status_code_esperado = 200){
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

    static header(){
        let obj = {}
        return {obj}
    }

    static valida_corpo_da_resposta_vazio(res){
        expect(res.body).to.be.empty
    }

    static valida_corpo_da_resposta_nao_vazio(res){
        expect(res.body).to.be.not.empty
    }

    static valida_valor_propriedade_no_corpo_da_resposta(res, propriedade, valor = null){
        if (Array.isArray(res.body) && res.body.length > 0 && typeof res.body[0] === 'object') 
            var body = res.body[0][propriedade]
        else
            var body = res.body[propriedade]

        expect(body).to.be.eq(valor)
    }

    static valida_array_propriedade_no_corpo_da_resposta(res, propriedade, valor = null){
        if (Array.isArray(res.body) && res.body.length > 0 && typeof res.body[0] === 'object'){
            expect(res.body.map(e=>e[propriedade])).to.include(valor);
        } 
        else{
            if(this.valida_corpo_da_resposta_nao_vazio()){
                expect(res.body[propriedade]).to.be.eq(valor)
            }
        }
    }

    static valida_quantidade_registros_no_corpo_da_resposta(res, quantidade, propriedade = undefined){
        cy.log(quantidade)
        if(!propriedade)
            expect(res.body).to.have.length(quantidade)
        else{
            expect(res.body[propriedade]).to.have.length(quantidade)
        }
    }

    static valida_propriedade_nao_vazia_no_corpo_da_resposta(res, propriedade = undefined){
        expect(res.body[propriedade]).to.be.not.empty
    }

    static valida_corpo_da_resposta_array(res){
        expect(res.body).to.be.an('array')
    }

    static valida_propriedade_booleano_no_corpo_da_resposta(res, propriedade, valor = null){
        if (Array.isArray(res.body) && res.body.length > 0 && typeof res.body[0] === 'object') 
            var body = res.body[0][propriedade]
        else
            var body = res.body[propriedade]

        expect(body).to.be.an('boolean')
        
        if(valor != null){
            var boolean = (valor === 'true')
            expect(body).to.be.eq(boolean)
        }  
    }

    static valida_quantidade_caracteres_propriedade_corpo_da_resposta(res, propriedade, qtde){
        if (Array.isArray(res.body) && res.body.length > 0 && typeof res.body[0] === 'object'){
            res.body.forEach(e => {
                if (e[propriedade].length != "") {
                    const numeroString = e[propriedade].toString();
                    expect(numeroString).to.have.length(qtde)
                }
            });
        }
        else{
            const numeroString = res.body[propriedade].toString();
            expect(numeroString).to.have.length(qtde)
        }
    }

    static get_quantidade_registros(ms, ambiente, endpoint, propriedade = undefined){
        let base = this.get_valor_base_ms(ambiente, ms)

        return this.http_request_without_body('GET', base + "/" + endpoint, this.header())
            .then((res) => {
                cy.log(propriedade)
                if(!propriedade){
                    cy.log(res.body.length)
                    return res.body.length
                }else{
                    cy.log(res.body[propriedade])
                    return res.body[propriedade]
                }
            })
    }

    static get_header_modificado(propriedade_adicional, valor){
        let header = this.header()
        header[propriedade_adicional] = valor
        return cy.wrap(header)
    }

    static criar_json(propriedade, valor){
        let obj = {}
        obj[propriedade] = valor
        return cy.wrap(obj)
    }

    static request(verbo = "GET", ms, ambiente, endpoint, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, this.header())
    }

    static request_por_id(verbo = "GET", ms, ambiente, endpoint, id, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, this.header())
    }

    static request_por_query(verbo = "GET", ms, ambiente, endpoint, query, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, this.header(), query)
    }

    static request_por_id_e_query(verbo = "GET", ms, ambiente, endpoint, id, query, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, this.header(), query)
    }

    static request_por_id_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, id, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_com_header_modificado(verbo = "GET", ms, ambiente, endpoint, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_por_2_ids(verbo = "GET", ms, ambiente, endpoint, id, endpoint2, id2, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id + "/" + endpoint2 + "/" + id2
        return this.enviar_requisicao(verbo, caminho, body, this.header())
    }

    static request_por_id_e_por_query_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, id, query, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms) 
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, header_modificado, query)
    }

    static request_por_query_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, query, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, header_modificado, query)
    }

    static request_por_id_e_body_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, id, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_header_modificado(verbo = "GET", ms, ambiente, endpoint, header_modificado, body = {}){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_por_id_e_por_body_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, id, body, header_modificado){
        let base = this.get_valor_base_ms(ambiente, ms) 
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_por_body_e_header_modificado(verbo = "GET", ms, ambiente, endpoint, body, header_modificado){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }

    static request_por_id_e_body(verbo = "GET", ms, ambiente, endpoint, id, body){
        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint + "/" + id
        return this.enviar_requisicao(verbo, caminho, body, this.header())
    }

    static request_por_api_key(verbo = "GET", ms, ambiente, endpoint, body = {}){
        const minhaVariavel = Cypress.env("keys");
        const valorPropriedade = minhaVariavel[ms];

        let header_modificado = this.header()
        header_modificado["x-api-key"] = valorPropriedade

        let base = this.get_valor_base_ms(ambiente, ms)
        base = this.verificar_versao_endpoint(base, endpoint)

        let caminho = base + "/" + endpoint
        return this.enviar_requisicao(verbo, caminho, body, header_modificado)
    }
}