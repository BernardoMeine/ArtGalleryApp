# Galeria de Arte Virtual

Este projeto é uma galeria de arte virtual que permite aos usuários visualizar obras de arte, bem como adicionar, excluir e gerenciar obras através de um formulário. O aplicativo é construído com **React** no frontend e **ASP.NET Core** no backend, com o armazenamento de imagens em base64 e um carrossel para navegação entre as obras.

## Funcionalidades

- Adicionar obras de arte com título, artista, data de criação, técnica, preço e imagem.
- Visualizar uma lista de obras de arte com informações detalhadas.
- Excluir obras de arte diretamente da galeria.
- Navegar pelas obras de arte usando um carrossel.
- Entrar em contato via WhatsApp através de um botão personalizado.

## Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca JavaScript para a criação de interfaces de usuário.
- **Axios**: Para a comunicação com a API.
- **CSS Modules**: Para a estilização modular e organizada.
- **Fontes Google**: Para uma tipografia moderna e elegante.

### Backend
- **ASP.NET Core**: Framework para criação da API.
- **Entity Framework Core**: Para o mapeamento objeto-relacional e comunicação com o banco de dados.
- **SQL Server**: Banco de dados utilizado para armazenar as informações das obras de arte.
- **Base64**: Armazenamento de imagens no formato base64.

## Estrutura do Projeto

- **Frontend (`art-gallery/`)**
  - Contém os componentes React, como o `ArtworkForm`, `ArtworkCarousel`, `ArtworkList`, e `WhatsAppButton`.
  - Usa Axios para fazer requisições para o backend.

- **Backend (`ArtGalleryAPI/`)**
  - Contém a API para gerenciar as operações CRUD (criar, ler, atualizar, deletar) das obras de arte.
  - Rota para upload de imagem e salvamento em base64.
  - Uso do Entity Framework Core para comunicação com o banco de dados SQL Server.

## Instalação e Configuração

### Backend

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/BernardoMeine/ArtGalleryApp.git
   \`\`\`

2. Navegue até o diretório `ArtGalleryAPI`:
   \`\`\`bash
   cd ArtGalleryAPI
   \`\`\`

3. Instale as dependências do projeto:
   \`\`\`bash
   dotnet restore
   \`\`\`

4. Configure a conexão com o banco de dados no arquivo `appsettings.json`.

5. Aplique as migrações para o banco de dados:
   \`\`\`bash
   dotnet ef database update
   \`\`\`

6. Execute o servidor:
   \`\`\`bash
   dotnet run
   \`\`\`

### Frontend

1. Navegue até o diretório `art-gallery`:
   \`\`\`bash
   cd art-gallery
   \`\`\`

2. Instale as dependências do projeto:
   \`\`\`bash
   npm install
   \`\`\`

3. Execute a aplicação React:
   \`\`\`bash
   npm run dev
   \`\`\`

## Endpoints da API

- \`GET /api/artworks\`: Retorna uma lista de todas as obras de arte.
- \`POST /api/artworks\`: Adiciona uma nova obra de arte.
- \`DELETE /api/artworks/{id}\`: Exclui uma obra de arte por ID.

## Estilização

A estilização da aplicação foi feita usando **CSS Modules** para isolar os estilos e garantir modularidade. O layout é responsivo e se adapta a dispositivos móveis, garantindo uma boa experiência para todos os usuários.

## Contato via WhatsApp

A aplicação inclui um botão que, ao ser clicado, redireciona o usuário para o WhatsApp Web ou para o aplicativo do WhatsApp no celular. Isso facilita o contato direto com a galeria para mais informações.


