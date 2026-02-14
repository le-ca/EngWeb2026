const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("Pedido recebido: " + req.url);

    const url = decodeURIComponent(req.url);

    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write("<h1>Oficina de Reparações</h1>");
        res.write("<ul>");
        res.write("<li><a href='/reparacoes'>Listar Reparações</a></li>");
        res.write("<li><a href='/intervencoes'>Listar Intervenções</a></li>")
        res.write("<li><a href='/viaturas'>Listar Viaturas</a></li>")
        res.write("</ul>");
        res.end();
    }
    else if (url === '/reparacoes') {
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                const reparacoes = resp.data;

                reparacoes.sort((a, b) => a.nome.localeCompare(b.nome));

                let html = `
                <html>
                    <head><meta charset="utf-8"><title>Reparações</title></head>
                    <body>
                        <h1>Reparações</h1>
                        <a href="/">Voltar ao Menu</a>
                        <br><br>
                        <table border="1">
                            <tr>
                                <th>Nome</th>
                                <th>NIF</th>
                                <th>Data</th>
                                <th>Viatura</th>
                                <th>Nr. Intervenções</th>               
                            </tr>`;
                
                reparacoes.forEach(r => {
                    const viaturaStr = r.viatura ? `${r.viatura.marca} ${r.viatura.modelo} (${r.viatura.matricula})` : "N/A";
                    html += `
                        <tr>
                            <td>${r.nome}</td>
                            <td>${r.nif}</td>
                            <td>${r.data}</td>
                            <td>${viaturaStr}</td>
                            <td>${r.intervencoes ? r.intervencoes.length : 0}</td>
                        </tr>`;
                });

                html += `</table></body></html>`;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(erro => tratarErro(res, erro));
    }
    else if (url === '/intervencoes') {
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                const reparacoes = resp.data;
                let stats = {};

                reparacoes.forEach(r => {
                    if (r.intervencoes) {
                        r.intervencoes.forEach(i => {
                            let codigo = i.codigo || "???";

                            if (!stats[codigo]) {
                                stats[codigo] = {
                                    codigo: codigo,
                                    nome: i.nome || "",
                                    descricao: i.descricao || "",
                                    quantidade: 0
                                };
                            }
                            stats[codigo].quantidade++;
                        });
                    }
                });

                let html = `
                <html>
                    <head><meta charset="utf-8"><title>Intervenções</title></head>
                    <body>
                        <h1>Intervenções</h1>
                        <a href="/">Voltar ao Menu</a>
                        <br><br>
                        <table border="1">
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                            </tr>`;
                
                Object.keys(stats).sort().forEach(key => {
                    html += `
                        <tr>
                            <td>${stats[key].codigo}</td>
                            <td>${stats[key].nome}</td>
                            <td>${stats[key].descricao}</td>
                            <td>${stats[key].quantidade}</td>
                        </tr>`;
                });

                html += `</table></body></html>`;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(erro => tratarErro(res, erro));
    }
    else if (url === '/viaturas') {
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                const reparacoes = resp.data;
                let stats = {};

                reparacoes.forEach(r => {
                    if (r.viatura) {
                        let chave = JSON.stringify({marca: r.viatura.marca, modelo: r.viatura.modelo });

                        if (!stats[chave]) {
                            stats[chave] = 0;
                        }
                        stats[chave]++;
                    }
                });

                let html = `
                <html>
                    <head><meta charset="utf-8"><title>Viaturas</title></head>
                    <body>
                        <h1>Viaturas</h1>
                        <a href="/">Voltar ao Menu</a>
                        <br><br>
                        <table border="1">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Total de Reparações</th>
                            </tr>`;
                Object.keys(stats).sort().forEach(jsonChave => {
                    let info = JSON.parse(jsonChave);
                    html += `
                        <tr>
                            <td>${info.marca}</td>
                            <td>${info.modelo}</td>
                            <td>${stats[jsonChave]}</td>
                        </tr>`;
                });

                html += `<table></body></html>`;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(erro => tratarErro(res, erro));
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<h1>404 - Página não encontrada</h1>");
    }

}).listen(7777);

function tratarErro(res, erro) {
    console.log(erro);
    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
    res.end("<h1>Erro no servidor</h1><p>" + erro + "</p>");
}

console.log('Servidor à escuta na porta 7777...');
