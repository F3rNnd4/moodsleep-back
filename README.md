# 🌙✨ MoodSleep Tracker - Desenvolvimento Full Stack

## 🎯 Objetivo da Atividade

Desenvolver uma aplicação web completa (front-end + back-end) demonstrando os conhecimentos adquiridos durante o curso.

## Funcionalidades

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js com Express.js 💚
- **Banco de Dados**: SQLite com Prisma ORM 🗄️
- **Autenticação**: JWT (JSON Web Token) 🔐
- **Segurança**: bcrypt.js para hash de senhas 🛡️
- **Middleware**: CORS para controle de acesso 🌐
- **Desenvolvimento**: Nodemon ⚡
- **Gerenciamento de Ambiente**: dotenv 📋

## ⚙️ Instruções para instalação e execução

1. **📥 Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd individual-final-project-back
   ```

2. **📦 Instale as dependências:**

   ```bash
   npm install
   ```

3. **🔧 Configure as variáveis de ambiente:**

   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis necessárias:

   ```env
   PORT=3000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="seu_jwt_secret_aqui"
   ```

4. **🗄️ Execute as migrações do banco:**
   ```bash
   npx prisma migrate dev
   ```

### 🚀 Executando o projeto

**⚡ Modo desenvolvimento:**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000` (ou na porta definida no `.env`). ✅

## 📁 Estrutura do Projeto

```
individual-final-project-back/
├── 📊 prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
├── 📂 src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   └── server.js
├── 📋 .env.example
├── 🚫 .gitignore
├── 📦 package.json
└── 📖 README.md
```

## Exemplos de uso da API

## 👨‍💻 Autor

**F3rNnd4**
