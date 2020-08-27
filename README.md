
<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios-new.png" />

<blockquote align="center">“Só deseje as coisas as quais você está disposto a lutar”!</blockquote>

<h1 align="center">
  🚀 Node.js + Typescript + TypeORM + Multer🚀
</h1>

#### If you need support with the content, go to my [Notion notes](https://www.notion.so/S02-Iniciando-back-end-do-app-da01157f9a644387ab12b6ff9d737c8b)

## 🚀 Desafio 06 
O objetivo desse desafio é continuar desenvolvendo a aplicação de gestão de transações, treinando o que foi aprendido até agora no Node.js junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

##  🤓 Conceitos importantes
## → Banco de Dados

- **ESTRATÉGIAS DE ABSTRAÇÃO**

Quando vamos trabalhar com banco de dados no Node ou qualquer outra linguagem no back-end, existe **3 principais estratégias** para conseguirmos listar, editar, remover, etc. 

A **primeira estratégia** é lidar com o **driver nativo** do banco de dados. Por exemplo o Node, caso esteja utilizando o Postgres tem um driver chamado *pg.* Conseguimos fazer as querys diretamente utilizando **.query** e escrevemos a query em SQL e recebemos os retornos todos em objetos JS.

Essa é a forma mais "raiz" possível de conseguirmos fazer as querys do banco de dados. 

A **segunda estratégia** já automatizando um pouco mais, é utilizando um **query builder (Knex.js)***.* Um query builder é uma forma de construir as querys com javascript. A gente escreve as nossas querys utilizando javascript e aí depois ele converte isso para uma query SQL.

E a **terceira estratégia,** que é o maior nível de abstração possível, tocar o menos possível  em queries SQL, que é utilizando um **ORM - Object Relational Mapping.** 

Com ele vamos mapear registros da nossa tabela do banco de dados com objetos no javascript, ou seja, vamos criar *models* dentro da aplicação, e esses models sempre que criarmos uma instância daquele model (criar, alterar, deletar...) ele vai refletir no banco de dados.  

Um dos mais famosos são: **Sequelize***,* utilizando o JS, e para Typescript o **TypeORM** (mas pode ser utilizado com JS tbm)**.**

- **CONCEITOS DOCKER**

Ajuda a controlar os serviços da aplicação. 

Serviços = banco de dados, qualquer serviços externo que não seja exatamente o código da aplicação. 

**→ Como funciona?**

**.** Criação de ambientes isolados (container). Ambientes que não vão interferir no funcionamento de outras ferramentas dentro do servidor. 

**.** Containers expõe portas para comunicação entre eles.

**→ Principais conceitos**

**.**  Imagem: um serviços disponível do Docker, ferramentas, tecnologias que podemos colocar dentro de um container da aplicação.

**.** Container: instância de uma imagem.

**.** Docker Registry (Docker Hub):   onde vamos encontrar as imagens ("nuvem"). Podemos cadastrar as nossas próprias imagens lá dentro. 

**.** Dockerfile:  

~ Receita de uma imagem (para rodar em um ambiente totalmente do zero);

![Screen Shot 2020-08-26 at 21 31 24](https://user-images.githubusercontent.com/54912285/91369970-7f722180-e7e3-11ea-9e68-36686ac12762.png)

## :wrench: Rotas da aplicação

- **`POST /transactions`**: A rota deve receber `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

**Dica**: Para a categoria, você deve criar uma nova tabela, que terá os campos `id`, `title`, `created_at`, `updated_at`.

**Dica 2**: Antes de criar uma nova categoria, sempre verifique se já existe uma categoria com o mesmo título. Caso ela exista, use o `id` já existente no banco de dados.

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Alimentação"
}
```

- **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto o seguinte formato:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

**Dica**: Dentro de balance, o income é a soma de todos os valores das transações com `type` income. O outcome é a soma de todos os valores das transações com `type` outcome, e o total é o valor de `income - outcome`.

**Dica 2**: Para fazer a soma dos valores, você pode usar a função [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) para agrupar as transações pela propriedade `type`, assim você irá conseguir somar todos os valores com facilidade e obter o retorno do `balance`.

- **`DELETE /transactions/:id`**: A rota deve deletar uma transação com o `id` presente nos parâmetros da rota;

* **`POST /transactions/import`**: A rota deve permitir a importação de um arquivo com formato `.csv` contendo as mesmas informações necessárias para criação de uma transação `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados, e por fim retorne todas as `transactions` que foram importadas para seu banco de dados. O arquivo csv, deve seguir o seguinte [modelo](./assets/file.csv)

## :warning: Especificação dos testes
Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dé uma olhada em **[nosso FAQ](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/faq-desafios).**

Para esse desafio, temos os seguintes testes:

<h4 align="center">
  ⚠️ Antes de rodar os testes, crie um banco de dados com o nome "gostack_desafio06_tests" para que todos os testes possam executar corretamente ⚠️
</h4>

- **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

* **`should create tags when inserting new transactions`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o `id` que acabou de ser criado.

- **`should not create tags when they already exists`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o `id` dessa categoria existente, não permitindo a criação de categorias com o mesmo `title`.

* **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

* **`should be able to delete a transaction`**: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- **`should be able to import transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte [modelo](./assets/file.csv). Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.

**Dica**: Caso você tenha dificuldades com a leitura de CSV, temos um [guia no Notion](https://www.notion.so/Importando-arquivos-CSV-com-Node-js-2172338480cb47e28a5d3ed9981c38a0).


***

<h4 align="center">
    Made with :coffee: and 💜 by <a href="https://www.linkedin.com/in/nykollemalone/" target="_blank">Nykolle Malone</a>
</h4>

