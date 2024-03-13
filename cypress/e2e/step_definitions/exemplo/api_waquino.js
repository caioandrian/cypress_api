import {Given, When, Then, After, Before, And} from 'cypress-cucumber-preprocessor/steps'

import {API_Exemplo} from '../../../services/exemplo/api_waquino.service'

Given(`que esteja com um token válido no {string}`, (ambiente)=>{
    var user = Cypress.env("users")[ambiente];
    API_Exemplo.get_token(user.email, user.password)
})