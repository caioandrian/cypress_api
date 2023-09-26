#language: pt

@exemplo
Funcionalidade: API
    Como cliente da aplicação
    Quero ter acesso a todas as rotas acessíveis para o meu nível de usuário

    Contexto:
        Dado que esteja com um token válido
        E tenha resetado o banco de dados pela rota

    @api_criar_conta
    Esquema do Cenario: Criar conta para movimentação
        Quando criar uma nova conta com o nome "<nome_conta>"
        Então deve obter como resposta o schema "exemplo/schema/conta_movimentacao/post" com status <status>
        E deve apresentar no corpo da resposta o conteúdo "<conteudo>"
        Exemplos:
            | nome_conta         | status | conteudo                           |
            | Conta qualquer 5   | 201    | da conta                           |
            | Conta para alterar | 400    | Já existe uma conta com esse nome! |

    @api_atualizar_conta
    Cenario: Atualizar nome de uma conta por ID
        Quando atualizar o nome da conta "Conta para alterar" pelo nome "conta alterada via rest"
        Então deve obter como resposta o schema "exemplo/schema/conta_movimentacao/put" com status 200
        E deve apresentar no corpo da resposta o conteúdo "da conta"

    @api_criar_transacao
    Cenario: Criar nova transação em uma conta
        Quando criar uma nova transação na conta "Conta para alterar"
        Então deve obter como resposta o schema "exemplo/schema/transacao/post" com status 201
        E deve apresentar no corpo da resposta o conteúdo "da transação"

    @api_atualizar_saldo_conta
    Cenario: Atualizar o status de uma transação por ID
        Dado que o saldo da conta "Conta para saldo" esteja com "534.00"
        Quando atualizar o status da transação com a descrição "Movimentacao 1, calculo saldo"
        Então deve obter como resposta o schema "exemplo/schema/transacao/put" com status 200
        E deverá apresentar o saldo atualizado na conta "Conta para saldo" com valor "4034.00"

    @api_delete_transacao
    Cenario: Deletar uma transação por ID
        Quando deletar a transação com a descrição "Movimentacao para exclusao"
        Então deve obter como resposta o schema "exemplo/schema/transacao/delete" com status 204