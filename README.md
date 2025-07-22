# 🏦 Bytebank-API

API RESTful para gerenciamento de transações bancárias, construída com Node.js, Express, TypeScript e Prisma.

## 📦 Funcionalidades

- Listagem de transações (`GET /transactions`)
- Criação de nova transação (`POST /transactions`)
- Autenticação básica e proteção de rotas
- Validação de dados e envio de erros adequados

## 🔧 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express** como framework HTTP
- **Prisma** para ORM e migrações com PostgreSQL (ou outro banco suportado)
- **Jest** (ou similar) para testes unitários e integração
- **ESLint** + **Prettier** para manter qualidade do código

## 🚀 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/DionataBergmann/Bytebank-API.git
    cd Bytebank-API
    ```

2. Instale as dependências:
    ```bash
    npm install
    # ou yarn
    ```

3. Configure o banco de dados:
    - Atualize a variável `DATABASE_URL` no `.env` apontando para seu PostgreSQL.
    - Execute as migrações:
      ```bash
      npx prisma migrate deploy
      ```

4. (Opcional) Preencha dados no banco:
    ```bash
    npx prisma db seed
    ```

5. Inicie a API:
    ```bash
    npm run dev
    ```

