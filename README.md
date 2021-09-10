# rent-api
API de aluguel de carros.

## Como iniciar

Após baixar o repositório, a forma mais simples é utilizando docker.

É possível iniciar a aplicação com o comando:
```sh
docker-compose up
```
ou
```
docker-compose up -d # para iniciar no modo detached
```
Este comando iniciará o backend, junto com uma instância do MongoDB e o mongo-express, um cliente para acesso ao banco.

A api roda na porta `3000`, o MongoDB na porta `27017` e o mongo-express na porta `8081`.

Na primeira execução do comando o docker vai baixar as imagens necessárias e gerará um build da aplicação dentro da imagem, assim como um seed no banco de dados.

Para ambiente de desenvolvimento temos
```
npm run start:dev
```
que inicia o projeto utilizando o ts-node e o nodemon.

a url de acesso ao banco é configurada via variável de ambiente, e segue o formato:
```sh
DB_URL=DB_URL=mongodb://<usuario>:<senha>@172.17.228.115:27017
```
já definida no docker-compose.yml

## Aplicação

A aplicação utiliza o express para a comunicação http, e o driver oficial do mongoDB para acesso ao banco, não foi utilizado ORM.

Fiz testes, mas foquei mais em testes unitários do domínio, não há testes de integração.

Há uma configuração de workflow do github para executar os testes e fazer análise de qualidade com o SonarQube.

## Observações e considerações

Não foi implementado nenhum tipo de autenticação, o que está longe de ser algo aceitável para uma aplicação no mundo real, o que define se o usuário está logado ou não é a presençã de um objeto no frontend.

O CORS foi configurado, porém liberado para todas as origens.

Os erros previstos na aplicação estão sendo lançados em forma de texto simples, seria ideal ter classes de exceções personalizadas.
