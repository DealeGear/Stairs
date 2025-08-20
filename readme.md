

# Stairs - Planejamento Estruturado de Projetos

O Stairs é um aplicativo web completo para planejamento estruturado de projetos, desenvolvido com HTML, CSS e JavaScript puro. Ele oferece uma interface intuitiva para criar, gerenciar e exportar projetos, com funcionalidades avançadas como geração de hipóteses com IA e crítica de projetos.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Uso](#instalação-e-uso)
- [Guia do Usuário](#guia-do-usuário)
- [Internacionalização](#internacionalização)
- [Modo Claro/Escuro](#modo-claroescuro)
- [Armazenamento de Dados](#armazenamento-de-dados)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

O Stairs foi projetado para ajudar empreendedores e equipes a planejar seus projetos de forma estruturada, seguindo um framework de 10 passos essenciais. Cada passo contém orientações específicas que se adaptam ao nível de investimento selecionado (Baixo, Médio ou Alto), permitindo um planejamento adequado para diferentes estágios do projeto.

## Funcionalidades

### 1. Sistema de Autenticação
- Cadastro e login de usuários
- Sessão persistente no navegador
- Logout seguro

### 2. Gestão de Projetos
- Criação de novos projetos
- Edição de projetos existentes
- Exclusão de projetos com confirmação
- Listagem de todos os projetos do usuário

### 3. Framework de 10 Passos
Cada projeto segue um framework estruturado com 10 passos essenciais:
1. Definição do Problema
2. Solução Proposta
3. Público-Alvo
4. Proposta de Valor
5. Modelo de Negócio
6. Recursos Necessários
7. Equipe
8. Plano de Ação
9. Validação
10. Próximos Passos

### 4. Níveis de Investimento
- **Baixo**: Orientações simplificadas para projetos iniciais
- **Médio**: Orientações detalhadas para projetos em desenvolvimento
- **Alto**: Orientações completas para projetos avançados

### 5. Funcionalidades Avançadas
- **Testar Hipótese**: Geração automática de landing pages ou posts para redes sociais com base no projeto
- **Criticar Projeto**: Análise automatizada do projeto com feedback estruturado
- **Gerenciar Projeto**: Atribuição de responsáveis, prazos e status para cada passo

### 6. Exportação e Compartilhamento
- Exportação de projetos em PDF com formatação profissional
- Geração de links para compartilhamento de projetos
- Exportação de críticas em formato de texto

### 7. Personalização
- Suporte a múltiplos idiomas (Português, Inglês, Espanhol)
- Alternância entre modo claro e escuro
- Interface responsiva para desktop e mobile

## Tecnologias Utilizadas

- **Frontend**:
  - HTML5
  - CSS3 com variáveis CSS para temas
  - JavaScript ES6+
  - Font Awesome para ícones
  - Google Fonts (Poppins)

- **Bibliotecas Externas**:
  - jsPDF para geração de PDFs
  - html2canvas para captura de elementos HTML

- **Armazenamento**:
  - IndexedDB para armazenamento local de projetos
  - LocalStorage para preferências do usuário

## Estrutura do Projeto

```
stairs/
├── index.html          # Página principal
├── style.css           # Estilos globais
├── script.js           # Lógica principal do aplicativo
├── auth.js             # Sistema de autenticação
├── db.js               # Camada de acesso ao banco de dados
├── pdf.js              # Funcionalidade de exportação PDF
├── i18n.js             # Sistema de internacionalização
├── darkmode.js         # Gerenciamento de temas
├── ai.js               # Integração com IA (mock)
└── gerenciar.js        # Funcionalidades de gerenciamento
```

## Instalação e Uso

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para evitar problemas com CORS)

### Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/stairs.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd stairs
   ```

3. Abra o arquivo `index.html` em seu navegador ou use um servidor local:
   ```bash
   # Usando Python
   python -m http.server 8000
   
   # Usando Node.js
   npx http-server
   ```

4. Acesse o aplicativo em `http://localhost:8000` (ou o endereço configurado).

## Guia do Usuário

### Cadastro e Login
1. Na tela inicial, escolha entre "Login" ou "Cadastro".
2. Para cadastro, preencha nome, e-mail e senha.
3. Para login, informe e-mail e senha.
4. **Credenciais de demonstração**:
   - E-mail: `demo@stairs.com`
   - Senha: `demo123`

### Criando um Projeto
1. Após o login, clique em "Novo Projeto" na barra lateral.
2. Um novo projeto será criado com o nome "Novo Projeto".
3. Clique no nome do projeto para editá-lo.
4. Selecione o nível de investimento (Baixo, Médio ou Alto).
5. Preencha cada um dos 10 passos com suas anotações.
6. Clique em "Salvar" para armazenar seu projeto.

### Níveis de Investimento
O nível de investimento determina o nível de detalhamento das orientações:
- **Baixo**: Orientações básicas para ideias iniciais
- **Médio**: Orientações intermediárias para projetos em desenvolvimento
- **Alto**: Orientações completas para projetos avançados

### Gerenciamento de Projetos
1. Na barra lateral, clique em "Meus Projetos".
2. Você verá todos os seus projetos salvos.
3. Clique em um projeto para abri-lo.
4. Use os botões na barra superior para:
   - **Salvar**: Salvar alterações
   - **Reeditar**: Habilitar edição do projeto
   - **Excluir**: Remover o projeto
   - **Exportar PDF**: Baixar o projeto em PDF
   - **Compartilhar**: Gerar link de compartilhamento

### Testar Hipótese
1. Na barra lateral, clique em "Testar Hipótese".
2. Selecione um projeto existente.
3. Escolha o tipo de saída (Landing Page ou Post para Redes Sociais).
4. Clique em "Gerar" para criar conteúdo baseado no seu projeto.
5. Copie o conteúdo gerado usando o botão "Copiar".

### Criticar Projeto
1. Na barra lateral, clique em "Criticar Projeto".
2. Selecione um projeto existente.
3. Clique em "Gerar Crítica" para obter uma análise detalhada.
4. Exporte a crítica usando o botão "Exportar".

### Gerenciar Projeto
1. Na barra lateral, clique em "Gerenciar Projeto".
2. Selecione um projeto existente.
3. Para cada passo, você pode:
   - Atribuir um responsável
   - Definir um prazo
   - Selecionar o status (Pendente, Em Progresso, Concluído)
   - Adicionar observações
4. As alterações são salvas automaticamente.

### Exportação e Compartilhamento
- **Exportar PDF**: Gera um documento PDF profissional com todo o conteúdo do projeto.
- **Compartilhar**: Cria um link único que pode ser compartilhado com outros usuários (simulado).

## Internacionalização

O Stairs suporta três idiomas:
- Português (PT)
- Inglês (EN)
- Espanhol (ES)

Para alterar o idioma:
1. No canto superior direito, clique no seletor de idioma.
2. Escolha o idioma desejado.
3. Toda a interface, incluindo os textos de orientação dos passos, será atualizada.

O sistema de internacionalização é baseado em chaves de tradução que são substituídas dinamicamente. As traduções estão organizadas no arquivo `i18n.js` e incluem:

- Textos da interface (botões, menus, etc.)
- Mensagens de notificação
- Textos de orientação dos 10 passos para cada nível de investimento

## Modo Claro/Escuro

O aplicativo oferece dois temas visuais:
- **Modo Claro**: Tema padrão com fundo claro
- **Modo Escuro**: Tema com fundo escuro para reduzir fadiga visual

Para alternar entre os temas:
1. No canto superior direito, clique no interruptor ao lado do seletor de idioma.
2. O tema será aplicado imediatamente.
3. Sua preferência será salva para futuras sessões.

O modo escuro é implementado usando variáveis CSS que são alternadas dinamicamente, garantindo uma transição suave entre os temas.

## Armazenamento de Dados

O Stairs utiliza duas tecnologias para armazenamento local:

### IndexedDB
- Armazena todos os projetos e seus dados
- Permite acesso rápido e eficiente aos dados
- Mantém os dados mesmo após fechar o navegador

### LocalStorage
- Armazena preferências do usuário (idioma, tema)
- Mantém a sessão do usuário ativa
- Dados persistem entre sessões

### Estrutura de Dados
```json
{
  "id": "uuid",
  "nome": "Projeto X",
  "nivelInvestimento": "Baixo | Médio | Alto",
  "passos": [
    { 
      "id": 1, 
      "titulo": "Definição do Problema", 
      "textoGuia": "...", 
      "textoUsuario": "...",
      "responsible": "",
      "deadline": "",
      "status": "pending",
      "notes": ""
    },
    ...
  ],
  "usuario": "idUsuario",
  "timestamp": "2025-08-19T12:00:00Z"
}
```

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

### Diretrizes de Contribuição
- Siga o padrão de código existente
- Adicione comentários quando necessário
- Atualize a documentação conforme necessário
- Teste suas alterações em diferentes navegadores

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Desenvolvedores

- [Seu Nome](https://github.com/seu-usuario) - Desenvolvedor Principal

## Agradecimentos

- À comunidade de desenvolvedores web por inspiração e recursos
- Às bibliotecas de código utilizado que tornaram este projeto possível

## Contato

- E-mail: seu-email@exemplo.com
- LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil)
- GitHub: [github.com/seu-usuario](https://github.com/seu-usuario)