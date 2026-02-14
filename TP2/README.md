# TP2: Servidor de Reparações Automóveis

**Data:** 12/02/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consiste no desenvolvimento de um servidor aplicacional em **Node.js** que interage com uma API de dados(simulada pelo **json-server**) para gerar páginas web sobre reparações de automóveis.

O sistema é composto por dois serviços principais:
1. Um **json-server** que serve o dataset de reparações na porta 3000
2. Um servidor **Node.js** (`tp2.js`) que corre na porta 7777, consome os dados via **axios** e gera o HTML de resposta.

O servidor aplicacional apresenta as seguintes funcionalidades:
* **Página Principal:** Um menu de navegação que facilita o acesso às diferentes listagens.
* **Listagem de Reparações:** Tabela ordenada alfabeticamente por Nome, apresentando o NIF, Data, Viatura e número de intervenções.
* **Listagem de Intervenções:** Tabela ordenada por Código, apresentando o Nome, Descrição e número de vezes que a intervenção foi realizada.
* **Listagem de Viaturas:** Tabela ordenada alfabeticamente por Marca e Modelo, apresentando o número de reparações associadas.

## Lista de Resultados
* [tp2.js](tp2.js): Código fonte do servidor Node.js que processa os pedidos e gera o HTML.
* [dataset_reparacoes.json](dataset_reparacoes.json): Dataset utilizado para alimentar o json-server.
