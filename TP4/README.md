# TP4: Gestão de Exames Médicos Desportivos (EMD)

**Data:** 25/02/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consiste na criação de uma aplicação web completa para a gestão de **Exames Médicos Desportivos (EMD)**, implementando todas as operações **CRUD** (Create, Read, Update, Delete) sobre um dataset.

O sistema opera com uma arquitetura de dois serviços:
1.  Um **json-server** que corre na porta **3000** e serve o dataset (`emd.json`), atuando como a base de dados REST API. O dataset foi normalizado para utilizar o campo `id` como identificador único.
2.  Um servidor **Node.js** (`servidor.js`) que corre na porta **7777**. Este servidor processa os pedidos HTTP, comunica com a API de dados via **axios** e renderiza as interfaces utilizando o motor de templates **Pug**.

A aplicação oferece as seguintes rotas e funcionalidades:

* **Página Principal (`/` ou `/emd`):** Apresenta uma tabela com a lista de exames (Nome, Data, Modalidade, Resultado). Inclui:
    * Botões para ordenar a lista por **Nome** (ascendente) ou **Data** (descendente).
    * Botões de ação para cada registo: Ver, Editar e Apagar.
    * Acesso às estatísticas e ao formulário de criação.
* **Detalhe do Exame (`/emd/:id`):** Página individual que mostra toda a informação detalhada de um registo específico.
* **Adicionar/Editar Exame (`/emd/registo` e `/emd/editar/:id`):** Implementação de um formulário reutilizável (`form.pug`) que serve tanto para criar novos registos como para editar existentes. O servidor trata os dados recebidos via POST, ajustando a estrutura do objeto `nome` e gerando IDs automaticamente quando necessário.
* **Apagar Exame (`/emd/apagar/:id`):** Remove o registo da base de dados e redireciona o utilizador para a página principal.
* **Estatísticas (`/emd/stats`):** Página dedicada que calcula e apresenta a distribuição dos exames por Género, Modalidade e Resultado (Aptos/Não Aptos).

## Lista de Resultados

* [servidor.js](servidor.js): Servidor aplicacional Node.js com a lógica de encaminhamento e CRUD.
* [templates.js](templates.js): Módulo auxiliar para compilação e renderização das views Pug.
* [static.js](static.js): Módulo para servir recursos estáticos (CSS, imagens).
* [emd.json](emd.json): Dataset tratado e normalizado dos exames médicos.
* [views/](views/): Pasta que contém os templates Pug (`index.pug`, `emd.pug`, `form.pug`, `stats.pug`, `error.pug`, `layout.pug`).
* [public/](public/): Pasta que contém toda a biblioteca `w3.css`.