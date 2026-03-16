const express = require('express');
const axios = require('axios');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

// O URL não tem barra no fim
const API = process.env.API_URL || 'http://localhost:7789';

app.get('/', (req, res) => res.render('index'));

app.get('/filmes', async (req, res) => {
    try {
        const resp = await axios.get(`${API}/filmes`);
        res.render('filmes', { filmes: resp.data });
    } catch (e) {
        console.log("Erro ao buscar filmes: " + e);
        res.render('error', { error: e });
    }
});

app.get('/filmes/:id', async (req, res) => {
    try {
        const resp = await axios.get(`${API}/filmes/${req.params.id}`);
        res.render('filme', { filme: resp.data });
    } catch (e) {
        res.render('error', { error: e });
    }
});

app.get('/atores', async (req, res) => {
    try {
        const resp = await axios.get(`${API}/atores`);
        res.render('atores', { atores: resp.data });
    } catch (e) {
        res.render('error', { error: e });
    }
});

app.get('/atores/:id', async (req, res) => {
    try {
        const resp = await axios.get(`${API}/atores/${req.params.id}`);
        res.render('ator', { ator: resp.data });
    } catch (e) {
        res.render('error', { error: e });
    }
});

app.get('/generos', async (req, res) => {
    try {
        const resp = await axios.get(`${API}/generos`);
        
        let generosOrdenados = resp.data.sort((a, b) => {
            let numA = parseInt(a._id.substring(1));
            let numB = parseInt(b._id.substring(1));
            return numA - numB;
        });

        res.render('generos', { generos: generosOrdenados });
    } catch (e) {
        res.render('error', { error: e });
    }
});

app.listen(7790, () => console.log('Interface a correr na porta 7790'));