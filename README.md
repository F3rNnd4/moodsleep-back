# MoodSleep Tracker - Backend

API RESTful para gerenciamento de registros de humor e sono, desenvolvida com Node.js, Express e Prisma ORM.

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web minimalista
- **Prisma** - ORM moderno para Node.js e TypeScript
- **SQLite** - Banco de dados relacional leve
- **CORS** - Middleware para habilitar requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/F3rNnd4/moodsleep-back.git
cd moodsleep-back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
PORT=5000
DATABASE_URL="file:./moodsleep2.db"
```

4. Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

5. (Opcional) Popule o banco com dados de exemplo:
```bash
npm run seed
```

## 🎯 Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

O servidor iniciará em `http://localhost:5000`

## 📚 Estrutura do Projeto

```
moodsleep-back/
├── prisma/
│   ├── schema.prisma      # Schema do banco de dados
│   ├── seed.js           # Script para popular o banco
│   └── prisma.js         # Configuração do Prisma Client
├── src/
│   ├── controllers/
│   │   └── registerController.js  # Lógica de negócio dos registros
│   ├── models/
│   │   └── registerModel.js       # Modelo de dados dos registros
│   ├── routes/
│   │   └── index.routes.js        # Rotas principais
│   └── server.js                  # Arquivo principal do servidor
├── .env                   # Variáveis de ambiente (não versionado)
├── package.json
└── README.md
```

## 🛣️ Rotas da API

### Registros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/registers` | Lista todos os registros |
| GET | `/api/registers/:id` | Busca um registro específico |
| POST | `/api/registers` | Cria um novo registro |
| PUT | `/api/registers/:id` | Atualiza um registro existente |
| DELETE | `/api/registers/:id` | Remove um registro |

### Exemplos de Requisições

#### Criar Registro
```bash
POST /api/registers

{
  "date": "2025-10-05T12:00:00.000Z",
  "moodLevel": 4,
  "sleepHours": 7.5,
  "notes": "Dia produtivo"
}
```

#### Listar Registros
```bash
GET /api/registers
```

Resposta:
```json
[
  {
    "id": 1,
    "date": "2025-10-05T12:00:00.000Z",
    "moodLevel": 4,
    "sleepHours": 7.5,
    "notes": "Dia produtivo",
    "createdAt": "2025-10-05T15:30:00.000Z",
    "updatedAt": "2025-10-05T15:30:00.000Z"
  }
]
```

#### Atualizar Registro
```bash
PUT /api/registers/1

{
  "moodLevel": 5,
  "sleepHours": 8,
  "notes": "Excelente dia!"
}
```

#### Deletar Registro
```bash
DELETE /api/registers/1
```

## 📊 Schema do Banco de Dados

```prisma
model Register {
  id         Int      @id @default(autoincrement())
  date       DateTime @default(now())
  moodLevel  Int      // 1 a 5
  sleepHours Float    // Horas de sono
  notes      String?  // Observações opcionais
  
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("registers")
}
```

## 🔐 Validações

### MoodLevel
- Tipo: Inteiro
- Valores aceitos: 1 a 5
- 1 = Irritado, 2 = Triste, 3 = Neutro, 4 = Feliz, 5 = Muito feliz

### SleepHours
- Tipo: Float
- Valores aceitos: 0 a 24
- Representa as horas de sono

### Notes
- Tipo: String (opcional)
- Limite: 200 caracteres


## 📝 Notas de Desenvolvimento

- Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Projetos
- O sistema de autenticação foi removido para simplificar o projeto conforme orientação do professor
- O foco principal é demonstrar as operações CRUD completas em uma API REST

## 👩‍💻 Autora

**Fernanda Alves Louro**
- Turma: 2TDS2
- Professor: Felipe Santos
- Instituição: SENAI

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.