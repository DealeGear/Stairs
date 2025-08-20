

# Stairs - Planejamento Estruturado de Projetos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

Stairs é um aplicativo web completo para planejamento estruturado de projetos, dividido em frontend e backend. Oferece uma interface intuitiva inspirada em Notion + Canva, com suporte a múltiplos idiomas, modo claro/escuro e integração com IA para análise de projetos.

## 📋 Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## ✨ Funcionalidades

### Frontend
- **Interface Responsiva**: Design adaptável para desktop e dispositivos móveis
- **Modo Claro/Escuro**: Alternância elegante entre temas
- **Internacionalização**: Suporte completo para Português (PT), Inglês (EN) e Espanhol (ES)
- **Autenticação**: Login com email/senha e Google OAuth
- **Gerenciamento de Projetos**: Criar, editar, renomear, excluir e compartilhar projetos
- **Templates**: Organizados por nível de investimento (Baixo/Médio/Alto)
- **Blocos Estruturados**: 10 blocos pré-definidos para planejamento de projetos
- **Auto-save**: Salvamento automático do projeto
- **Exportação PDF**: Geração de PDFs profissionalmente formatados
- **Integração com IA**: Testar hipóteses e criticar projetos
- **Gerenciamento de Tarefas**: Atribuição de tarefas, gestão de equipe e cronograma

### Backend
- **API RESTful**: Endpoints bem estruturados para todas as operações
- **Autenticação JWT**: Segurança com tokens JSON Web Tokens
- **Google OAuth**: Integração com autenticação do Google
- **Banco de Dados MongoDB**: Armazenamento eficiente de dados
- **Internacionalização**: Middleware para adaptação das respostas ao idioma do usuário
- **Gestão de Templates**: Sistema de templates multilíngue
- **Compartilhamento de Projetos**: Geração de links únicos com permissões
- **Recuperação de Senha**: Sistema seguro de redefinição de senha

## 🛠 Tecnologias

### Frontend
- HTML5
- CSS3 com variáveis CSS para temas
- JavaScript Vanilla (ES6+)
- jsPDF para exportação PDF
- Font Awesome para ícones

### Backend
- Node.js
- Express.js
- MongoDB com Mongoose
- Passport.js para autenticação
- JWT para tokens de sessão
- bcryptjs para hash de senhas
- nodemailer para envio de emails
- pdfkit para geração de PDFs

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16.0.0 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/stairs-app.git
   cd stairs-app
   ```

2. **Instale as dependências do backend**
   ```bash
   cd backend
   npm install
   ```

3. **Instale as dependências do frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.example` para `.env` na pasta `backend`
   - Preencha as variáveis de ambiente conforme necessário

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/stairs

# Autenticação
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para "APIs e Serviços" > "Credenciais"
4. Crie um "ID do cliente OAuth" para "Aplicativo da Web"
5. Adicione URIs de redirecionamento autorizados:
   - `http://localhost:3000/api/auth/google/callback`
6. Copie o ID do cliente e a chave secreta para o seu arquivo `.env`

### Configuração do Email

O aplicativo usa o Gmail para enviar emails de recuperação de senha. Certifique-se de:

1. Habilitar a "Verificação em duas etapas" na sua conta Google
2. Gerar uma "Senha de aplicativo" para usar no aplicativo
3. Usar essa senha de aplicativo no campo `EMAIL_PASSWORD` do `.env`

## 🏃 Execução

### Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

1. **Inicie o backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Inicie o frontend**
   ```bash
   cd frontend
   npm run dev
   ```

O backend estará disponível em `http://localhost:3000` e o frontend em `http://localhost:8080`.

### Produção

Para executar o projeto em modo de produção:

1. **Construa o frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Inicie o backend**
   ```bash
   cd backend
   npm start
   ```

### Execução Completa (Frontend + Backend)

Para executar ambos os serviços simultaneamente:

```bash
npm run dev:full
```

## 📁 Estrutura do Projeto

```
stairs-app/
├── frontend/
│   ├── index.html          # Layout principal
│   ├── style.css           # Estilos globais
│   ├── script.js           # Lógica geral
│   ├── auth.js             # Login/cadastro
│   ├── db.js               # Integração com backend
│   ├── pdf.js              # Exportação para PDF
│   ├── i18n.js             # Internacionalização
│   ├── darkmode.js         # Alternância claro/escuro
│   ├── ai.js               # Integração com IA
│   ├── gerenciar.js        # Gestão de tarefas
│   └── package.json        # Dependências do frontend
│
├── backend/
│   ├── server.js           # Inicialização do servidor
│   ├── routes/
│   │   ├── auth.js         # Rotas de autenticação
│   │   ├── projects.js    # Rotas de projetos
│   │   └── templates.js   # Rotas de templates
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectsController.js
│   │   └── templatesController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── projectModel.js
│   │   └── templateModel.js
│   ├── config/
│   │   ├── db.js           # Conexão com MongoDB
│   │   ├── env.js          # Variáveis de ambiente
│   │   └── passport.js     # Configuração do Passport
│   ├── middlewares/
│   │   ├── auth.js         # Middleware de autenticação
│   │   └── i18n.js         # Middleware de internacionalização
│   ├── utils/
│   │   └── mailer.js       # Utilitário de email
│   └── package.json        # Dependências do backend
│
└── README.md               # Este arquivo
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login com email e senha
- `POST /api/auth/register` - Cadastro de novo usuário
- `GET /api/auth/google` - Inicia autenticação com Google
- `GET /api/auth/google/callback` - Callback do Google OAuth
- `POST /api/auth/forgot-password` - Solicitar recuperação de senha
- `POST /api/auth/reset-password` - Redefinir senha
- `GET /api/auth/check` - Verificar se usuário está autenticado
- `POST /api/auth/logout` - Logout do usuário

### Projetos
- `GET /api/projects` - Obter todos os projetos do usuário
- `GET /api/projects/:id` - Obter um projeto específico
- `POST /api/projects` - Criar um novo projeto
- `PUT /api/projects/:id` - Atualizar um projeto
- `DELETE /api/projects/:id` - Excluir um projeto
- `POST /api/projects/:id/share` - Compartilhar um projeto
- `GET /api/projects/shared/:token` - Acessar projeto compartilhado

### Templates
- `GET /api/templates` - Obter todos os templates
- `GET /api/templates/:id` - Obter um template específico
- `POST /api/templates` - Criar um novo template
- `PUT /api/templates/:id` - Atualizar um template
- `DELETE /api/templates/:id` - Excluir um template

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

### Passos para Contribuir

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Notion](https://www.notion.so/) pela inspiração de design
- [Canva](https://www.canva.com/) pela inspiração de interface
- [Font Awesome](https://fontawesome.com/) pelos ícones
- [Google Fonts](https://fonts.google.com/) pelas fontes Poppins e Inter

---

**Desenvolvido com ❤️ por [Seu Nome]**