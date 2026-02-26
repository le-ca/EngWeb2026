var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var examesServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    

    if(static.staticResource(req)){
            static.serveStaticResource(req, res)
        }
        else{
            switch(req.method){
                case "GET": 
                    // GET /emd ------------------------------------------------------------------
                    
                    var partes = req.url.split('?')
                    var rota = partes[0]
                    var parametros = partes[1] ? '?' + partes[1] : ''

                    if(rota == '/' || rota == '/emd'){
                        axios.get("http://localhost:3000/emd" + parametros)
                        .then(resp => {
                            var exames = resp.data 
                            
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.examesListPage(exames, d))
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end("<p>Erro na listagem de registos: " + erro + "</p>")
                        })
                    }

                    // GET /emd/registo - responde com o formulário para recolha dos dados do novo EMD;
                    else if(rota == '/emd/registo') {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.exameFormPage(d))
                    }

                    // GET /emd/editar/:id
                    else if(/\/emd\/editar\/[a-zA-Z0-9]+$/.test(rota)) {
                        var idExame = rota.split('/')[3]
                        axios.get('http://localhost:3000/emd/' + idExame)
                            .then(resp => {
                                var exame = resp.data
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.exameFormEditPage(exame, d))
                            })
                            .catch(erro => {
                                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage(erro, d))
                            })
                    }
                    
                    // GET /emd/apagar/:id
                    else if(/\/emd\/apagar\/[a-zA-Z0-9]+$/.test(rota)) {
                        var idExame = rota.split('/')[3]
                        axios.delete('http://localhost:3000/emd/' + idExame)
                            .then(resp => {
                                res.writeHead(303, {'Location': '/'})
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage(erro, d))
                            })
                    }

                    // GET /emd/stats
                    else if(rota === '/emd/stats') {
                        axios.get("http://localhost:3000/emd")
                            .then(resp => {
                                var exames = resp.data
                                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                                res.end(templates.statsPage(exames, d))
                            })
                            .catch(erro => {
                                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                                res.end(templates.errorPage(erro, d))
                            })
                    }

                    // GET /emd/:id --------------------------------------------------------------
                    else if(/\/emd\/[a-zA-Z0-9]+$/.test(req.url)){
                        var idEmd = req.url.split('/')[2]
                        axios.get('http://localhost:3000/emd?_id=' + idEmd)
                        .then(resp => {
                            var exame = resp.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.examePage(exame, d))
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end("<p>Erro na obtenção do registo: " + erro + "</p>")
                        })
                    }
                    else {
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(`Erro 404: A rota '${req.url}' não existe neste servidor.`, d))
                    }
                    break   

                case "POST":
                    // POST /emd
                    if (req.url == '/emd'){
                        collectRequestBodyData(req, result => {
                            if (result) {
                                if(result['nome[primeiro]'] || result['nome[último]']) {
                                    result.nome = {
                                        primeiro: result['nome[primeiro]'],
                                        último: result['nome[último]']
                                    };
                                    delete result['nome[primeiro]'];
                                    delete result['nome[último]'];
                                }

                                result.federado = result.federado === 'on';
                                result.resultado = result.resultado === 'on';

                                axios.post('http://localhost:3000/emd', result)
                                    .then(resp => {
                                        res.writeHead(303, {'Location': '/'})
                                        res.end()
                                    })
                                    .catch(erro => {
                                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf8'})
                                        res.end(templates.errorPage(erro, d))
                                    })
                            }
                        })
                    }
                    
                    // POST /emd/:id
                    else if (/\/emd\/[a-zA-Z0-9]+$/.test(req.url)) {
                        var idExame = req.url.split('/')[2]
                        collectRequestBodyData(req, result => {
                            if(result){
                                if(result['nome[primeiro]'] || result['nome[último]']) {
                                    result.nome = {
                                        primeiro: result['nome[primeiro]'],
                                        último: result['nome[último]']
                                    };
                                    delete result['nome[primeiro]'];
                                    delete result['nome[último]'];
                                }
                                result.federado = result.federado === 'on';
                                result.resultado = result.resultado === 'on';

                                axios.put('http://localhost:3000/emd/' + idExame, result)
                                    .then(resp => {
                                        res.writeHead(303, {'Location': '/'})
                                        res.end()
                                    })
                                    .catch(erro => {
                                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf8'})
                                        res.end(templates.errorPage(erro, d))
                                    })
                            }
                        })
                    }
                    break

                default: 
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage(`Erro 405: O método '${req.method}' não é suportado.`, d))
                    break
                    
            }
    }
})

examesServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
