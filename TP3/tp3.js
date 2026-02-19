const http = require('http');
const axios = require('axios');

function genPagina(titulo, conteudo) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>${titulo}</title>
            <link rel="stylesheet" href="http://www.w3schools.com/w3css/4/w3.css">
            <style>
                .w3-bar { margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="w3-bar w3-teal">
                <a href="/" class="w3-bar-item w3-button">Home</a>
                <a href="/alunos" class="w3-bar-item w3-button">Alunos</a>
                <a href="/cursos" class="w3-bar-item w3-button">Cursos</a>
                <a href="/instrumentos" class="w3-bar-item w3-button">Instrumentos</a>
            </div>
            
            <div class="w3-container">
                <h1>${titulo}</h1>
                ${conteudo}
            </div>
            
            <footer class="w3-container w3-teal w3-margin-top w3-padding-16">
                <p>TPC3</p>
            </footer>
        </body>
    </html>
    `;   
}

function genTabela(lista, campos) {
    if (lista.length === 0) return "<p>Não há dados.</p>";

    let html = '<table class="w3-table-all w3-hoverable">';

    html += '<tr class="w3-light-grey">';
    campos.forEach(campo => {
        html += `<th>${campo.toUpperCase()}</th>`;
    });
    html += '</tr>';

    lista.forEach(item => {
        html += '<tr>';
        campos.forEach(campo => {
            let valor = item[campo];

            if (campo === 'instrumento' && typeof valor === 'object') {
                valor = valor['#text'] || valor['id'];
            }

            html += `<td>${valor}</td>`;
        });
        html += '<tr>';
    });

    html += '</table>';
    return html;
}

const server = http.createServer(async (req, res) => {
    console.log("Recebido pedido: " + req.url);

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(genPagina("Escola de Música", `
            <div class="w3-panel w3-pale-green w3-leftbar w3-border-green">
                <p>Bem-vindo à Escola de Música</p>
                <p>Utilize o menu acima para navegar.</p>
            </div>    
        `));
    }

    else if (req.url === '/alunos') {
        try{
            const resp = await axios.get('http://localhost:3000/alunos');
            const alunos = resp.data;

            const campos = ["id", "nome", "dataNasc", "curso", "anoCurso", "instrumento"];
            const tabela = genTabela(alunos, campos);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Lista de Alunos", tabela));
        } catch (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Erro", "<p>Erro ao obter alunos: " + erro + "</p>"));
        }
    }

    else if (req.url === '/cursos') {
        try{
            const resp = await axios.get('http://localhost:3000/cursos');
            const cursos = resp.data;

            const campos = ["id", "designacao", "duracao", "instrumento"];
            const tabela = genTabela(cursos, campos);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Lista de Cursos", tabela));
        } catch (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Erro", "<p>Erro ao obter cursos: " + erro + "</p>"));
        }
    } 

    else if (req.url === '/instrumentos') {
        try{
            const resp = await axios.get('http://localhost:3000/instrumentos');
            const instrumentos = resp.data;

            const instrumentosFormatados = instrumentos.map(i => ({
                id: i.id,
                nome: i['#text']
            }));

            const tabela = genTabela(instrumentosFormatados, ["id", "nome"]);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Lista de Instrumentos", tabela));
        } catch (erro) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(genPagina("Erro", "<p>Erro ao obter instrumentos: " + erro + "</p>"));
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(genPagina("404", "<p>Página não encontrada.</p>"));
    }
});

server.listen(25000);
console.log("Servidor à escuta na porta 25000...");