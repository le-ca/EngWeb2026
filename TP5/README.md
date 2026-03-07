# TP5: Gestão de Base de Dados de Cinema

**Data:** 04/03/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consistiu na criação de uma aplicação web em **Node.js** utilizando a framework **Express**, desenhada para gerir e visualizar uma base de dados de filmes.

A arquitetura do projeto divide-se em duas partes fundamentais:
1. Um **json-server** (a correr na porta 3000) que serve de REST API, disponibilizando os dados a partir do ficheiro `db.json`. Este ficheiro foi gerado automaticamente através do script `correctdb.py`, que leu o `cinema.json` original e injetou um identificador único (`id`) em cada filme.
2. Um servidor **Express** (a correr na porta 3001) que atua como cliente desta API. Utiliza a biblioteca **axios** para efetuar os pedidos HTTP ao `json-server` e o motor de templates **Pug** para renderizar as páginas web de forma dinâmica. O aspeto visual foi construído recorrendo à stylesheet **W3.CSS**.

A aplicação responde aos seguintes requisitos e rotas:
* **Lista de Filmes (`/` ou `/filmes`):** Apresenta uma tabela com a lista de todos os filmes, exibindo o ID, Título, Ano, Número de Géneros e Número de Atores. Ao clicar numa linha, o utilizador é redirecionado para a página do respetivo filme.
* **Detalhe do Filme (`/filmes/:id`):** Mostra toda a informação de um filme específico. Os atores e os géneros são apresentados como hiperligações que reencaminham para as respetivas páginas.
* **Lista de Atores (`/atores`):** Apresenta uma tabela ordenada alfabeticamente com todos os atores presentes na base de dados e o número total de filmes em que participaram.
* **Detalhe do Ator (`/atores/:id`):** Página dedicada a um ator, listando todos os filmes em que este participou (com hiperligações para as páginas dos filmes).
* **Lista de Géneros (`/generos`):** Apresenta uma tabela com todos os géneros cinematográficos e a contagem de filmes pertencentes a cada um.
* **Detalhe do Género (`/generos/:id`):** Lista todos os filmes catalogados com o género selecionado.

## Lista de Resultados

* [correctdb.py](correctdb.py): Script inicial desenvolvido para ler o dataset original, atribuir IDs a cada registo e gerar a base de dados final.
* [db.json](db.json): Dataset tratado e formatado, pronto a ser consumido pelo `json-server`.
* [app-cinema/](app-cinema/): Diretoria principal da aplicação gerada pelo `express-generator`.
* [app-cinema/routes/index.js](app-cinema/routes/index.js): Controlador principal que define as rotas da aplicação, faz os pedidos via Axios e processa os dados antes de os enviar para as vistas.
* [app-cinema/views/](app-cinema/views/): Diretoria contendo os templates **Pug** desenvolvidos para renderizar as interfaces (`layout.pug`, `filmes.pug`, `filme.pug`, `atores.pug`, `ator.pug`, `generos.pug`, `genero.pug`).
* [app-cinema/public/stylesheets/style.css](app-cinema/public/stylesheets/style.css): Ficheiro que contém a framework de estilos W3.CSS para a formatação visual do website.