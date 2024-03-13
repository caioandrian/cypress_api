import Rest from '../common/_rest_service'

const URL_VOTES = '/votes'

export class API_Exemplo extends Rest{

    static get_token(user, passwd){
        let body = {email: user, redirecionar: false, senha: passwd}

        super.http_request_with_body('POST',  Cypress.env("exemplo").wcaquino + '/signin', body)
            .its('body.token')
            .should('not.be.empty')
            .then(token => {
                Cypress.env('token', token)
            })
    }
}
