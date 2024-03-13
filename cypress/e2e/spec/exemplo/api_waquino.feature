#language: pt

@exemplo
Funcionalidade: [regressão] API - Exemplo WCAquino
    Como cliente da aplicação
    Quero ter acesso a todas as rotas acessíveis para o meu nível de usuário

    Contexto:
        Dado que esteja com um token válido no "exemplo"
        E que tenha feito uma requisição do tipo "GET" no ms de "wcaquino" no endpoint "reset" no "exemplo"

    @api_criar_conta
    Esquema do Cenario: Criar conta para movimentação
        Dado que tenha adicionado a propriedade "nome" com valor "<nome_conta>" em um body no "exemplo"
        Quando fizer uma requisição do tipo "POST" no ms de "wcaquino" no endpoint "contas" usando um body no "exemplo"
        Então deve obter como resposta o schema "exemplo/schema/conta_movimentacao/post" com status <status>
        E deve retornar no corpo da resposta a propriedade "<propriedade>" com valor igual a "<valor>"
        Exemplos:
            | nome_conta         | status | propriedade | valor                              |
            | Conta qualquer 5   | 201    | nome        | Conta qualquer 5                   |
            | Conta para alterar | 400    | error       | Já existe uma conta com esse nome! |