import json
import os

with open('cinema.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

filmes = []
atores_dict = {}
generos_dict = {}

for i, filme in enumerate(data['filmes']):
    filme_id = f"f{i}"
    
    novo_filme = {
        "_id": filme_id,
        "title": filme.get("title", ""),
        "year": filme.get("year", ""),
        "cast": filme.get("cast", []),
        "genres": filme.get("genres", [])
    }
    filmes.append(novo_filme)
    
    for ator in novo_filme["cast"]:
        if ator not in atores_dict:
            atores_dict[ator] = {"_id": f"a{len(atores_dict)}", "nome": ator, "filmes": []}
        atores_dict[ator]["filmes"].append(filme_id)
        
    for gen in novo_filme["genres"]:
        if gen not in generos_dict:
            generos_dict[gen] = {"_id": f"g{len(generos_dict)}", "designacao": gen, "filmes": []}
        generos_dict[gen]["filmes"].append(filme_id)

with open('filmes.json', 'w', encoding='utf-8') as f: json.dump(filmes, f, indent=2)
with open('atores.json', 'w', encoding='utf-8') as f: json.dump(list(atores_dict.values()), f, indent=2)
with open('generos.json', 'w', encoding='utf-8') as f: json.dump(list(generos_dict.values()), f, indent=2)

print("Data treated with success! Generated filmes.json, atores.json and generos.json.")