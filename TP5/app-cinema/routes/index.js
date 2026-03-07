var express = require('express');
var router = express.Router();
var axios = require('axios');

const db_url = 'http://localhost:3000/filmes';

// GET / or /filmes
router.get(['/', '/filmes'], function(req, res, next) {
  axios.get(db_url)
    .then(resposta => {
      res.render('filmes', { filmes: resposta.data });
    })
    .catch(erro => res.render('error', { error: erro}));
});

// GET /filmes/:id
router.get('/filmes/:id', function(req, res, next) {
  axios.get(`${db_url}/${req.params.id}`)
    .then(resposta => {
      res.render('filme', { filme: resposta.data });
    })
    .catch(erro => res.render('error', { error: erro}));
});

// GET /atores
router.get('/atores', function(req, res, next) {
  axios.get(db_url)
    .then(resposta => {
      let filmes = resposta.data;
      let dictAtores = {};

      filmes.forEach(f => {
        if (f.cast) {
          f.cast.forEach(ator => {
            if (!dictAtores[ator]) dictAtores[ator] = 0;
            dictAtores[ator]++;
          });
        }
      });

      let listaAtores = Object.keys(dictAtores).map(k => ({ nome: k, total: dictAtores[k] }));
      listaAtores.sort((a, b) => a.nome.localeCompare(b.nome));

      res.render('atores', { atores: listaAtores });
    })
    .catch(erro => res.render('error', { error: erro}));
});

// GET /atores/:id
router.get('/atores/:id', function(req, res, next) {
  let nome = req.params.id;
  axios.get(db_url)
    .then(resposta => {
      let filmes = resposta.data;
      let filmesDoAtor = filmes.filter(f => f.cast && f.cast.includes(nome));
      res.render('ator', { ator: nome, filmes: filmesDoAtor });
    })
    .catch(erro => res.render('error', { error: erro}));
});

// GET /generos
router.get('/generos', function(req, res, next) {
  axios.get(db_url)
    .then(resposta => {
      let filmes = resposta.data;
      let dictGeneros = {};

      filmes.forEach(f => {
        if (f.genres) {
          f.genres.forEach(g => {
            if (!dictGeneros[g]) dictGeneros[g] = 0;
            dictGeneros[g]++;
          });
        }
      });

      let listaGeneros = Object.keys(dictGeneros).map(k => ({ nome: k, total: dictGeneros[k] }));
      listaGeneros.sort((a, b) => a.nome.localeCompare(b.nome));
      
      res.render('generos', { generos: listaGeneros });
    })
    .catch(erro => res.render('error', { error: erro}));
});

// GET /generos/:id
router.get('/generos/:id', function(req, res, next) {
  let nome = req.params.id;
  axios.get(db_url)
    .then(resposta => {
      let filmes = resposta.data;
      let filmesDoGenero = filmes.filter(f => f.genres && f.genres.includes(nome));
      res.render('genero', { genero: nome, filmes: filmesDoGenero });
    })
    .catch(erro => res.render('error', { error: erro}));
});

module.exports = router;
