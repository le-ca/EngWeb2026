import json

with open('cinema.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for index, filme in enumerate(data['filmes']):
    filme['id']=f"f{index+1}"

with open('db.json', 'w', encoding='utf-8') as f:
    json.dump({'filmes': data['filmes']}, f, indent=2)

print("db.json created with success!")