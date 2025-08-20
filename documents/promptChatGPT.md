Perfeito ✅ vou refazer o **prompt do Stairs** mudando apenas esse detalhe: o botão **Templates** vai ficar na **barra lateral esquerda**, junto dos outros, sem criar uma nova barra.

---

# **Prompt — Aplicativo Stairs (Planejamento de Projetos com Backend Node.js)**

Crie um aplicativo web chamado **Stairs**, voltado para o **planejamento estruturado de projetos**.

O sistema deve ser dividido em **Frontend (HTML, CSS, JS puro)** e **Backend (Node.js, em arquivos separados)**.

---

## 🔹 FRONTEND

### **Estrutura de Arquivos**

* `index.html` → layout principal
* `style.css` → estilos globais
* `script.js` → lógica geral
* `auth.js` → login/cadastro com integração ao backend
* `db.js` → integração com backend para CRUD de projetos
* `pdf.js` → exportação para PDF
* `i18n.js` → internacionalização completa (PT / EN / ES)
* `darkmode.js` → alternância claro/escuro
* `ai.js` → integração mock para IA (Testar Hipótese / Criticar Projeto)
* `gerenciar.js` → atribuição de tarefas administrativas para cada passo

---

### **Interface**

#### 🔸 Barra Lateral Esquerda (fixa)

* **Novo Projeto**
* **Meus Projetos**
* **Templates** (organizados em Baixo / Médio / Alto Investimento, backend multilíngue)
* **Excluir Projeto** (com confirmação)
* **Testar Hipótese**
* **Criticar Projeto**
* **Gerenciar Projeto**
* **Sair (Logout)**

#### 🔸 Barra Superior (fixa)

* Nome do projeto atual
* **Renomear Projeto**
* Botões: **Salvar**, **Reeditar**, **Exportar PDF**, **Compartilhar**
* Switch de **Tema Claro/Escuro**
* Combo de **Idioma (PT / EN / ES)**

#### 🔸 Área Central (scrollável)

* Exibe os **10 blocos de passos** do projeto.
* Cada bloco tem:

  * **Texto pré-escrito** (do template escolhido, vindo do backend, traduzido)
  * **Campo editável** para anotações do usuário

---

### **Exportação**

* Projetos podem ser exportados como **PDF com design bonito**, pronto para apresentação.

---

## 🔹 BACKEND (Node.js)

### **Estrutura de Arquivos**

* `server.js` → inicialização do servidor Express
* `routes/auth.js` → rotas de autenticação
* `routes/projects.js` → CRUD de projetos
* `routes/templates.js` → acesso aos templates (3 níveis de investimento, multilíngue)
* `controllers/` → lógica das rotas
* `models/` → modelos de dados (usuários, projetos, templates)
* `config/` → conexão com banco de dados e variáveis de ambiente
* `middlewares/` → autenticação e validação

---

### **Funcionalidades do Backend**

1. **Autenticação de Usuário**

   * Login com **Google OAuth** (via `passport-google-oauth20`)
   * Login com **usuário, email e senha** (via JWT)
   * Registro de novos usuários
   * Recuperação de senha

2. **Gestão de Projetos (CRUD)**

   * Criar novo projeto (com base em template ou vazio)
   * Editar/Salvar projeto
   * Renomear projeto
   * Excluir projeto
   * Compartilhar projeto via link único
   * Exportar dados para PDF (opcional: servidor gera PDF com `pdfkit`)

3. **Gestão de Templates**

   * Armazenamento de templates no banco em **três idiomas**
   * Organização em **Baixo / Médio / Alto Investimento**
   * Retorno dinâmico do template de acordo com idioma escolhido pelo usuário

4. **Internacionalização**

   * Middleware que adapta todas as respostas do backend ao idioma selecionado no frontend

5. **Funcionalidades sugeridas**

   * Histórico de versões do projeto (versionamento estilo GitHub simples)
   * Dashboard com estatísticas: número de projetos, últimos acessos, etc.
   * Endpoint para integração futura com IA (testar hipótese e crítica do projeto)

---

### **Banco de Dados (MongoDB sugerido)**

Coleções principais:

* **users**

  ```json
  {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@email.com",
    "senhaHash": "...",
    "authProvider": "google | local",
    "dataCriacao": "2025-08-19T12:00:00Z"
  }
  ```

* **projects**

  ```json
  {
    "id": "uuid",
    "userId": "uuid",
    "nome": "Meu Projeto",
    "idioma": "pt | en | es",
    "blocos": [
      { "id": 1, "titulo": "Definição do Problema", "textoGuia": "...", "textoUsuario": "..." }
    ],
    "compartilhado": false,
    "ultimaAtualizacao": "2025-08-19T12:00:00Z"
  }
  ```

* **templates**

  ```json
  {
    "id": "uuid",
    "nivel": "baixo | medio | alto",
    "idioma": "pt | en | es",
    "blocos": [
      { "id": 1, "titulo": "Definição do Problema", "conteudo": "Texto pré-escrito..." }
    ]
  }
  ```

---

### **Estilo Visual do Frontend**

* Inspiração em **Notion + Canva**
* Tipografia: **Poppins / Inter**
* Layout responsivo (desktop e mobile)
* Modo claro/escuro elegante
* Blocos bem espaçados, com bordas arredondadas e foco em legibilidade

---

⚡ Esse é o escopo detalhado do **Stairs** atualizado:

* **Templates na barra lateral esquerda**
* **Excluir Projeto** na lateral
* **Renomear Projeto** na superior
* Idiomas aplicados em **toda a interface + blocos**
* Templates organizados em **Baixo / Médio / Alto Investimento** (backend multilíngue)
* Backend em **Node.js + MongoDB** pronto para login, CRUD e templates

---

Quer que eu já monte a **estrutura inicial de pastas e arquivos** (frontend + backend) para você rodar localmente e ir testando?
