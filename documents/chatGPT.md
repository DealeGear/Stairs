Ótima pergunta 👍 Vou te dar um passo a passo bem simples para você rodar o **Stairs** localmente assim que tiver o código pronto (frontend + backend).

---

## 🖥️ Como testar o **Stairs** localmente

### 1. Instalar Node.js

* Baixe e instale o **Node.js** (LTS recomendado) em [https://nodejs.org](https://nodejs.org)
* Depois confirme no terminal:

  ```bash
  node -v
  npm -v
  ```

---

### 2. Estrutura de pastas sugerida

Você terá algo assim:

```
stairs/
│── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── templates.js
│   ├── controllers/
│   ├── models/
│   ├── config/
│   └── package.json
│
│── frontend/
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
```

---

### 3. Configurar o backend

No terminal, vá até a pasta `backend`:

```bash
cd stairs/backend
```

Inicialize o projeto Node:

```bash
npm init -y
```

Instale dependências principais:

```bash
npm install express mongoose cors dotenv passport passport-google-oauth20 jsonwebtoken bcryptjs
```

Se quiser exportação de PDF no servidor:

```bash
npm install pdfkit
```

Crie o arquivo `.env` para configurar variáveis (exemplo):

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/stairs
JWT_SECRET=uma_senha_secreta
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
```

Rode o servidor:

```bash
node server.js
```

Se aparecer algo como **Servidor rodando na porta 4000**, está ok 🚀

---

### 4. Rodar o frontend

Você pode abrir o **`index.html` diretamente no navegador**, mas para evitar problemas de CORS é melhor rodar um servidor local simples.

Na pasta `frontend`, rode:

```bash
npx http-server
```

Ou use a extensão **Live Server** no VS Code.

Depois, acesse no navegador:
👉 `http://localhost:8080` (ou a porta que aparecer).

---

### 5. Fluxo esperado

* O frontend (`localhost:8080`) se conecta ao backend (`localhost:4000`).
* Você faz login (Google ou usuário/senha).
* Pode criar, salvar, excluir, renomear projetos.
* Pode abrir **Templates** (vindos do backend em 3 idiomas e 3 níveis de investimento).
* Pode exportar para PDF.
* Pode trocar idioma e tema (claro/escuro).

---

👉 Se você quiser, eu já preparo para você um **passo a passo de teste inicial** com comandos prontos (como `npm run dev`) para simplificar ainda mais. Quer que eu monte esse guia pronto para colar e rodar?
