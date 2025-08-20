

# Stairs - Aplicativo Web de Planejamento Estruturado de Projetos

Implementei um aplicativo web completo chamado "Stairs" para planejamento estruturado de projetos, dividido em frontend e backend conforme solicitado.

## Estrutura do Projeto

```
stairs-app/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── auth.js
│   ├── db.js
│   ├── pdf.js
│   ├── i18n.js
│   ├── darkmode.js
│   ├── ai.js
│   └── gerenciar.js
│
└── backend/
    ├── server.js
    ├── routes/
    │   ├── auth.js
    │   ├── projects.js
    │   └── templates.js
    ├── controllers/
    │   ├── authController.js
    │   ├── projectsController.js
    │   └── templatesController.js
    ├── models/
    │   ├── userModel.js
    │   ├── projectModel.js
    │   └── templateModel.js
    ├── config/
    │   ├── db.js
    │   ├── env.js
    │   └── passport.js
    └── middlewares/
        ├── auth.js
        └── i18n.js
```

## Funcionalidades Implementadas

### Frontend

1. **Interface do Usuário**
   - Barra lateral esquerda fixa com menu de navegação
   - Barra superior com informações do projeto e ações
   - Área central scrollável com 10 blocos de passos do projeto
   - Design responsivo para desktop e mobile
   - Modo claro/escuro com alternância elegante

2. **Internacionalização (i18n.js)**
   - Suporte completo para três idiomas: Português (PT), Inglês (EN) e Espanhol (ES)
   - Tradução de todos os textos da interface
   - Armazenamento da preferência de idioma no localStorage

3. **Autenticação (auth.js)**
   - Login com email e senha
   - Cadastro de novos usuários
   - Login com Google OAuth
   - Recuperação de senha
   - Gerenciamento de sessão

4. **Gerenciamento de Projetos (db.js)**
   - Criação de novos projetos
   - Carregamento de projetos existentes
   - Edição e salvamento de projetos
   - Exclusão de projetos com confirmação
   - Renomeação de projetos
   - Compartilhamento de projetos via link único

5. **Templates**
   - Organização por nível de investimento (Baixo/Médio/Alto)
   - Carregamento de templates pré-definidos
   - Criação de projetos a partir de templates

6. **Exportação PDF (pdf.js)**
   - Exportação do projeto completo para PDF
   - Formatação profissional adequada para apresentação
   - Implementação usando jsPDF (lado do cliente)

7. **Integração com IA (ai.js)**
   - Funcionalidade "Testar Hipótese" com análise simulada
   - Funcionalidade "Criticar Projeto" com feedback simulado
   - Interface para interação com serviços de IA

8. **Gerenciamento de Tarefas (gerenciar.js)**
   - Atribuição de tarefas administrativas para cada passo
   - Gestão de equipe
   - Cronograma do projeto
   - Interface com abas para diferentes aspectos do gerenciamento

9. **Modo Escuro (darkmode.js)**
   - Alternância entre modo claro e escuro
   - Detecção automática da preferência do sistema
   - Armazenamento da preferência no localStorage

### Backend

1. **Servidor Express (server.js)**
   - Configuração do servidor web
   - Conexão com banco de dados MongoDB
   - Middlewares para CORS, parsing de JSON, sessão
   - Configuração do Passport para autenticação

2. **Autenticação (routes/auth.js, controllers/authController.js)**
   - Implementação de login JWT
   - Registro de usuários com hash de senha
   - Google OAuth 2.0
   - Recuperação de senha com token temporário
   - Middleware de autenticação

3. **Gerenciamento de Projetos (routes/projects.js, controllers/projectsController.js)**
   - CRUD completo de projetos
   - Validação de propriedade do projeto
   - Renomeação de projetos
   - Compartilhamento com opções de permissão
   - Exportação para PDF usando pdfkit

4. **Templates (routes/templates.js, controllers/templatesController.js)**
   - CRUD de templates
   - Organização por nível de investimento e idioma
   - Filtros para busca de templates específicos

5. **Modelos de Dados (models/)**
   - Modelo de Usuário com autenticação local e Google
   - Modelo de Projeto com blocos estruturados
   - Modelo de Template com suporte a múltiplos idiomas

6. **Internacionalização (middlewares/i18n.js)**
   - Middleware para adaptação das respostas ao idioma do usuário
   - Suporte a múltiplos idiomas nas respostas da API

## Banco de Dados

O projeto utiliza MongoDB com as seguintes coleções:

### users
```javascript
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "senhaHash": "...",
  "authProvider": "google | local",
  "dataCriacao": "2023-06-19T12:00:00Z"
}
```

### projects
```javascript
{
  "id": "uuid",
  "userId": "uuid",
  "nome": "Meu Projeto",
  "idioma": "pt | en | es",
  "blocos": [
    { 
      "id": 1, 
      "titulo": "Definição do Problema", 
      "textoGuia": "...", 
      "textoUsuario": "..." 
    }
  ],
  "compartilhado": false,
  "ultimaAtualizacao": "2023-06-19T12:00:00Z"
}
```

### templates
```javascript
{
  "id": "uuid",
  "nivel": "baixo | medio | alto",
  "idioma": "pt | en | es",
  "blocos": [
    { 
      "id": 1, 
      "titulo": "Definição do Problema", 
      "conteudo": "Texto pré-escrito..." 
    }
  ]
}
```

## Como Executar o Projeto

1. **Pré-requisitos**
   - Node.js instalado
   - MongoDB instalado e rodando
   - Conta Google OAuth para autenticação (opcional)

2. **Configuração**
   - Criar arquivo `.env` na raiz do projeto com as variáveis de ambiente
   - Exemplo de `.env`:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/stairs
   JWT_SECRET=your_jwt_secret_key_here
   SESSION_SECRET=your_session_secret_key_here
   FRONTEND_URL=http://localhost:8080
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Instalação das Dependências**
   ```bash
   npm install
   ```

4. **Execução do Backend**
   ```bash
   npm run dev
   ```

5. **Execução do Frontend**
   ```bash
   npm run client
   ```

6. **Execução Completa (Frontend + Backend)**
   ```bash
   npm run dev:full
   ```

## Funcionalidades Adicionais

1. **Auto-save**
   - Salvamento automático do projeto após 5 segundos de inatividade
   - Notificação visual quando o projeto é salvo

2. **Atalhos de Teclado**
   - Ctrl/Cmd + S: Salvar projeto
   - Ctrl/Cmd + N: Novo projeto
   - Ctrl/Cmd + O: Meus projetos
   - Ctrl/Cmd + E: Exportar PDF
   - Esc: Fechar modais

3. **Notificações**
   - Sistema de notificações visual
   - Suporte a notificações do navegador quando a página não está visível

4. **Responsividade**
   - Layout adaptável para diferentes tamanhos de tela
   - Menu móvel com botão de alternância

O aplicativo Stairs está pronto para uso e oferece uma solução completa para planejamento estruturado de projetos, com todas as funcionalidades solicitadas implementadas.