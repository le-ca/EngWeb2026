import json, os

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

def new_file(filename, content):
    os.makedirs(os.path.dirname(filename), exist_ok=True)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

dados = open_json("dataset_reparacoes.json")
lista_reparacoes = dados['reparacoes']

# -------------- Dicionários --------------

for i, rep in enumerate(lista_reparacoes):
    rep['id'] = i

intervencoes_dict = {}
marcas_modelos_dict = {}

for rep in lista_reparacoes:
    marca = rep['viatura']['marca']
    modelo = rep['viatura']['modelo']
    chave_marca_modelo = f"{marca} {modelo}"

    if chave_marca_modelo not in marcas_modelos_dict:
        marcas_modelos_dict[chave_marca_modelo] = {'marca': marca, 'modelo': modelo, 'lista_reparacoes': []}
    marcas_modelos_dict[chave_marca_modelo]['lista_reparacoes'].append(rep)

    for interv in rep['intervencoes']:
        cod = interv['codigo']
        if cod not in intervencoes_dict:
            intervencoes_dict[cod] = {'nome': interv['nome'], 'descricao': interv['descricao'], 'lista_reparacoes': []}
        if rep not in intervencoes_dict[cod]['lista_reparacoes']:
            intervencoes_dict[cod]['lista_reparacoes'].append(rep)

lista_intervencoes_ordenada = sorted(intervencoes_dict.keys())
lista_marcas_modelos_ordenada = sorted(marcas_modelos_dict.keys())

# -------------- Página principal --------------

conteudo_index = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Oficina Automóvel</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Oficina Automóvel</h1>
        <h3>Dados Consultáveis:</h3>
        <ul>
            <li><a href="lista_reparacoes.html">Lista de Reparações</a></li>
            <li><a href="lista_intervencoes.html">Lista de Intervenções</a></li>
            <li><a href="lista_marcas_modelos.html">Lista de Marcas e Modelos</a></li>
        </ul>
    </body>
</html>
'''
new_file("output/index.html", conteudo_index)

# -------------- Página da Lista de Reparações --------------

linhas_tabela = ""
for rep in lista_reparacoes:
    link = f"reparacao_{rep['id']}.html"
    linhas_tabela += f'''
    <tr>
        <td>{rep['nome']}</td>
        <td>{rep['nif']}</td>
        <td>{rep['data']}</td>
        <td>{rep['viatura']['marca']}</td>
        <td>{rep['viatura']['modelo']}</td>
        <td>{len(rep['intervencoes'])}</td>
        <td><a href="{link}">Ver Detalhes</a></td>
    </tr>
    '''

conteudo_reparacoes = f'''
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Lista de Reparações</h1>
        <table border="1">
            <tr>
                <th>Nome</th>
                <th>NIF</th>
                <th>Data</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nr. Intervenções</th>
                <th>Link</th>
            </tr>
            {linhas_tabela}
        </table>
        <p><a href="index.html">Voltar ao Índice</a></p>
    </body>
</html>
'''
new_file("output/lista_reparacoes.html", conteudo_reparacoes)

# -------------- Página da Lista de Intervenções --------------

linhas_interv = ""
for cod in lista_intervencoes_ordenada:
    dados = intervencoes_dict[cod]
    link = f"intervencao_{cod}.html"
    linhas_interv += f'''
    <tr>
        <td><a href="{link}">{cod}</a></td>
        <td>{dados['nome']}</td>
        <td>{dados['descricao']}</td>
    </tr>
    '''

conteudo_interv = f'''
<html>
    <head>
        <title>Lista de Intervenções</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Lista de Intervenções</h1>
        <table border="1">
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
            {linhas_interv}
        </table>
        <p><a href="index.html">Voltar ao Índice</a></p>
    </body>
</html>
'''
new_file("output/lista_intervencoes.html", conteudo_interv)

# -------------- Página de Lista de Marcas e Modelos de Veículos --------------

linhas_marcas_modelos = ""
for chave in lista_marcas_modelos_ordenada:
    dados = marcas_modelos_dict[chave]
    nome_ficheiro = chave.replace(" ","_")
    link = f"marca_modelo_{nome_ficheiro}.html"
    linhas_marcas_modelos += f'''
    <tr>
        <td>{dados['marca']}</td>
        <td><a href="{link}">{dados['modelo']}</a></td>
        <td>{len(dados['lista_reparacoes'])}</td>
    </tr>
    '''

conteudo_marcas_modelos = f'''
<html>
    <head>
        <title>Lista de Marcas e Modelos</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Lista de Marcas e Modelos</h1>
        <table border="1">
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Qtd. carros</th>
            </tr>
            {linhas_marcas_modelos}
        </table>
        <p><a href="index.html">Voltar ao Índice</a></p>
    </body>
</html>
'''
new_file("output/lista_marcas_modelos.html", conteudo_marcas_modelos)

# -------------- Página Reparação --------------

for rep in lista_reparacoes:
    lista_int_html = ""
    for int_local in rep['intervencoes']:
        link_int = f"intervencao_{int_local['codigo']}.html"
        lista_int_html += f"<li><a href='{link_int}'>({int_local['codigo']})</a> {int_local['nome']}: {int_local['descricao']}</li>"

    nome_ficheiro_marca_modelo = (f"{rep['viatura']['marca']} {rep['viatura']['modelo']}").replace(" ","_")
    link_marca_modelo = f"marca_modelo_{nome_ficheiro_marca_modelo}.html"

    conteudo_pag_rep = f'''
    <html>
        <head>
            <title>Detalhes da Reparação</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Detalhes da Reparação</h1>
            <p><b>Nome:</b> {rep['nome']} (NIF: {rep['nif']})</p>
            <p><b>Data:</b> {rep['data']}</p>
            <p><b>Viatura:</b> <a href="{link_marca_modelo}">{rep['viatura']['marca']} {rep['viatura']['modelo']}</a> ({rep['viatura']['matricula']})</p>

            <h3>Intervenções Realizadas:</h3>
            <ul>
                {lista_int_html}
            </ul>
            <adress>
                <a href="lista_reparacoes.html">Ver Lista de Reparações</a>
            </adress>
        </body>
    </html>
    '''
    new_file(f"output/reparacao_{rep['id']}.html", conteudo_pag_rep)

# -------------- Página Intervenção --------------

for cod in lista_intervencoes_ordenada:
    dados = intervencoes_dict[cod]

    lista_rep_html = ""
    for r in dados['lista_reparacoes']:
        link_rep = f"reparacao_{r['id']}.html"
        lista_rep_html += f"<li><a href='{link_rep}'>{r['nome']} ({r['nif']}) - {r['data']} - {r['viatura']['marca']} {r['viatura']['modelo']}</a></li>"

    conteudo_pag_int = f'''
    <html>
        <head>
            <title>{cod} - {dados['nome']}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{cod} - {dados['nome']}</h1>
            <p><b>Código:</b> {cod}</p>
            <p><b>Nome:</b> {dados['nome']}</p>
            <p><b>Descrição:</b> {dados['descricao']}</p>
            
            <h3>Reparações onde foi realizada:</h3>
            <ul>
                {lista_rep_html}
            </ul>
            <adress>
                <a href="lista_intervencoes.html">Ver Lista de Intervenções</a>
            </adress>
        </body>
    </html>
    '''
    new_file(f"output/intervencao_{cod}.html", conteudo_pag_int)

# -------------- Página Marca/Modelo --------------

for chave in lista_marcas_modelos_ordenada:
    dados = marcas_modelos_dict[chave]
    nome_ficheiro = chave.replace(" ","_")

    lista_rep_html = ""
    for r in dados['lista_reparacoes']:
        link_rep = f"reparacao_{r['id']}.html"
        lista_rep_html += f"<li><a href='{link_rep}'>{r['nome']} ({r['nif']}) - {r['data']} - {r['viatura']['marca']} {r['viatura']['modelo']}</a></li>"

    conteudo_pag_marca_modelo = f'''
    <html>
        <head>
            <title>{chave}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{chave}</h1>
            <p><b>Marca:</b> {dados['marca']}</p>
            <p><b>Modelo:</b> {dados['modelo']}</p>
            
            <h3>Histórico de Reparações ({len(dados['lista_reparacoes'])}):</h3>
            <ul>
                {lista_rep_html}
            </ul>
            <adress>
                <a href="lista_marcas_modelos.html">Ver Lista de Marcas/Modelos</a>
            </adress>
        </body>
    </html>
    '''
    new_file(f"output/marca_modelo_{nome_ficheiro}.html", conteudo_pag_marca_modelo)