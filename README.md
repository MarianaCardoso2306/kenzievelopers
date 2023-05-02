KenzieVelopers é uma API Rest desenvolvida para gerenciar desenvolvedores e projetos em uma startup de tecnologia e desenvolvimento web. Através dessa API é possível realizar o registro do desenvolvedor, associar informações extras ao mesmo, registrar projetos e associar as tecnologias utilizadas nesses projetos e, por fim, adicionar projetos aos seus respectivos desenvolvedores.

O projeto foi desenvolvido em TypeScript e utiliza o banco de dados postgres para armazenar as informações. Além disso, possui testes automatizados para garantir a qualidade do código desenvolvido.

Tecnologias utilizadas:

- node.js
- typescript
- pg/pg-format
- postgreSQL
- jest
- dotenv

## **Rotas - /developers**

## Endpoints

| Método | Endpoint              | Responsabilidade                                    |
| ------ | --------------------- | --------------------------------------------------- |
| POST   | /developers           | Cadastrar um novo desenvolvedor                     |
| GET    | /developers/:id       | Listar um desenvolvedor e seus projetos             |
| PATCH  | /developers/:id       | Atualizar os dados de um desenvolvedor              |
| DELETE | /developers/:id       | Remover um desenvolvedor                            |
| POST   | /developers/:id/infos | Cadastrar informações adicionais a um desenvolvedor |

#

## **Rota - /projects**

## Endpoints

| Método | Endpoint                         | Responsabilidade                         |
| ------ | -------------------------------- | ---------------------------------------- |
| POST   | /projects                        | Cadastrar um novo projeto                |
| GET    | /projects/:id                    | Listar um projeto pelo id                |
| PATCH  | /projects/:id                    | Atualizar um projeto                     |
| DELETE | /projects/:id                    | Excluir um projeto                       |
| POST   | /projects/:id/technologies       | Cadastrar uma tecnologia para um projeto |
| DELETE | /projects/:id/technologies/:name | Deletar uma tecnologia de um projeto     |
