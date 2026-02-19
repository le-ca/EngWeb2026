# TP2: Servidor de Reparações Automóveis

**Data:** 18/02/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consiste no desenvolvimento de um servidor aplicacional em **Node.js** que interage com uma API de dados(simulada pelo **json-server**) para gerar páginas web dinâmicas para a gestão de uma Escola de Música.

O sistema é composto por dois serviços principais:
1. Um **json-server** que serve o dataset (`db.json`) de reparações na porta 3000, disponibilizando os recursos `/alunos`, `/cursos` e `/instrumentos`. 
2. Um servidor **Node.js** (`tp3.js`) que corre na porta 25000, consome os dados da API via **axios** e renderiza o HTML de resposta utilizando templates e **W3.CSS** para o estilo visual.

O servidor aplicacional apresenta as seguintes funcionalidades:
* **Página Principal(`/`):** Um painel de boas-vindas com um menu de navegação que facilita o acesso às diferentes entidades.
* **Listagem de Alunos(`/alunos`):** Tabela HTML com todos os alunos registados, apresentando o ID, Nome, Data de Nascimento, Curso, Ano do Curso e Instrumento.
* **Listagem de Cursos(`/cursos`):** Tabela HTML com a informação dos cursos, incluindo ID, Designação, Duração e o Instrumento associado.
* **Listagem de Instrumentos(`/instrumentos`):** Tabela HTML simples que lista o ID e o Nome de todos os instrumentos lecionados na escola.

A opção por uma arquitetura de dois servidores, e não três, deve-se à simplicidade dos requisitos funcionais e do modelo de dados deste projeto. Este TPC3 exige apenas a listagem direta das entidades (alunos, cursos e instrumentos) tal como estão armazenadas na base de dados. Adicionar uma camada intermédia de API de dados traria complexidade desnecessária sem valor acrescentado, uma vez que o servidor aplicacional pode consumir os recursos REST do json-server diretamente e renderizar as tabelas HTML de forma eficiente.

## Lista de Resultados
* [tp3.js](tp3.js): Código fonte do servidor aplicacional Node.js que processa os pedidos HTTP e gera o HTML.
* [db.json](db.json): Dataset da escola de música utilizado para alimentar a API REST do json-server.
