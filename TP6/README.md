# TP6: App sobre Cinema Americano com Orquestração Docker

**Data:** 11/03/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consistiu na criação de uma arquitetura de microsserviços para implementar uma aplicação web de gestão e visualização de uma base de dados de cinema. Todo o sistema foi isolado em contentores e gerido através de uma orquestração com **Docker Compose**.

A arquitetura do projeto está dividida em três componentes principais interligados por uma rede virtual interna (`cinema-network`):
1. **MongoDB (`mongodb_cinema`)**: Base de dados NoSQL que armazena os dados do projeto. Os dados originais (`cinema.json`) foram alvo de um pré-processamento através de um script em Python (`tratar_dados.py`) para gerar três ficheiros distintos e normalizados (`filmes.json`, `atores.json`, `generos.json`). Estes ficheiros são importados automaticamente para a base de dados no arranque do contentor através de um script shell (`import.sh`).
2. **API de Dados (`api_cinema`)**: Um servidor desenvolvido em **Node.js** com a framework **Express** e a biblioteca **Mongoose** (a correr na porta 7789). Esta API REST atua de forma minimalista, respondendo a pedidos sobre as coleções de Filmes, Atores e Géneros, e tem a capacidade de processar *query strings* para ordenação de dados.
3. **Servidor de Interface (`interface_cinema`)**: Um servidor aplicacional cliente (a correr na porta 7790), também desenvolvido em **Express**, que consome os dados da API recorrendo à biblioteca **axios**. Utiliza o motor de templates **Pug** para gerar páginas HTML dinâmicas, formatadas visualmente com a framework **W3.CSS**. No lado do servidor (neste componente) foi implementada lógica em JavaScript para, por exemplo, extrair a componente numérica dos IDs e ordenar corretamente listas (como a dos géneros).

A aplicação responde aos seguintes requisitos e rotas definidas no servidor aplicacional:
* **Lista de Filmes (`/filmes`):** Apresenta uma tabela com todos os filmes, exibindo o ID (clicável), Título, Ano, Número de Atores e Número de Géneros.
* **Detalhe do Filme (`/filmes/:id`):** Mostra toda a informação de um filme específico.
* **Lista de Atores (`/atores`):** Apresenta uma tabela com os IDs (como links), os nomes e a contagem de filmes em que cada ator participou.
* **Detalhe do Ator (`/atores/:id`):** Apresenta a página individual de um ator, listando os IDs dos filmes em que esteve envolvido com os respetivos links para o detalhe.
* **Lista de Géneros (`/generos`):** Apresenta uma tabela ordenada pelos IDs de forma numérica com a designação do género e a respetiva contagem de filmes associados.

## Lista de Resultados

* [docker-compose.yml](docker-compose.yml): Ficheiro responsável pela orquestração dos 3 contentores (MongoDB, API e Interface) na rede `cinema-network`.
* [api_dados/dataset/tratar_dados.py](api_dados/dataset/tratar_dados.py): Script de extração e tratamento dos dados do `cinema.json` que permitiu isolar e povoar as coleções de Atores e Géneros.
* [api_dados/mongo-init/import.sh](api_dados/mongo-init/import.sh): Script Shell que efetua o import das três coleções JSON de forma automatizada (`mongoimport`) para o MongoDB.
* [api_dados/server.js](api_dados/server.js): Controlador do lado da API com as rotas que expõem os dados das três coleções modeladas no Mongoose.
* [interface/app.js](interface/app.js): Controlador da interface visual, contendo as rotas que efetuam os pedidos ao `api_cinema` e a lógica de ordenação de dados enviada para o frontend.
* [interface/views/](interface/views/): Diretoria que contém os ficheiros base **Pug** (`layout.pug`, `index.pug`, `filmes.pug`, `filme.pug`, `atores.pug`, `ator.pug`, `generos.pug`), todos alavancados pela framework **W3.CSS** importada no layout principal.

## Para Executar

* Garantir que o Docker está em execução.
* Executar `docker compose up -d --build` no terminal, dentro da pasta onde se situa o `docker-compose.yml`.
* Abrir `http://localhost:7790`