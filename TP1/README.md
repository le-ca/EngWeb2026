# TP1: Análise de Dataset de Reparações Automóveis

**Data:** 04/02/2026

**Autor:** Lourenço Martins

**UC:** Engenharia Web (2026)

## Autor

* **ID:** A106849
* **Nome:** Lourenço Costa Martins
* **Foto:**

  ![Foto do Autor](Foto.jpg)

## Resumo
Este TPC consiste num script em Python desenvolvido para processar um dataset de reparações de uma oficina automóvel e gerar um website para consulta fácil destes dados.

O script (`tp1.py`) começa por ler o ficheiro de dados (`dataset_reparacoes.json`). De seguida, percorre a lista de reparações para extrair e organizar a informação em estruturas de dados auxiliares (dicionários), permitindo agrupar **Tipos de Intervenção** e **Marcas/Modelos** do veículo.

Por fim, o programa gera automaticamente a estrutura de pastas e ficheiros HTML. O resultado é um website navegável composto por:
* Uma **página principal** (index) que serve de menu;
* **Páginas de listagem** (todas as reparações, todos os tipos de intervenção, todas as marcas);
* **Páginas de detalhe** para cada entidade (página individual de cada reparação, página de cada tipo de intervenção com o histórico de usos, e página de cada modelo de carro com o seu histórico de manutenções).

## Lista de Resultados
* [tp1.py](tp1.py): Script Python principal que realiza o processamento e geração do site.
* [dataset_reparacoes.json](dataset_reparacoes.json): Ficheiro de dados utilizado (input).
* [output](output): Pasta com os ficheiros html, gerados através do script (`tp1.py`). Website para consultar facilmente os dados do dataset.
