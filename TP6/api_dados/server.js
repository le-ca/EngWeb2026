const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

const nomeBD = "cinnema_db"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

const filmeSchema = new mongoose.Schema({ _id: String }, { strict: false, collection: 'filmes', versionKey: false });
const Filme = mongoose.model('Filme', filmeSchema);

const atorSchema = new mongoose.Schema({ _id: String }, { strict: false, collection: 'atores', versionKey: false });
const Ator = mongoose.model('Ator', atorSchema);

const generoSchema = new mongoose.Schema({ _id: String }, { strict: false, collection: 'generos', versionKey: false });
const Genero = mongoose.model('Genero', generoSchema);

async function listarDados(Modelo, req, res) {
    try {
        let queryObj = { ...req.query };
        const searchTerm = queryObj.q;
        const fields = queryObj._select;
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        delete queryObj.q; delete queryObj._select; delete queryObj._sort; delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        if (fields) {
            fields.split(',').forEach(f => projection[f.trim()] = 1);
        }

        let execQuery = Modelo.find(mongoQuery, projection);

        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const resultados = await execQuery.exec();
        res.json(resultados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

app.get('/filmes', async (req, res) => listarDados(Filme, req, res));
app.get('/filmes/:id', async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) return res.status(404).json({ error: "Não encontrado" });
        res.json(filme);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
})

app.get('/atores', async (req, res) => listarDados(Ator, req, res));
app.get('/atores/:id', async (req, res) => {
    try {
        const ator = await Ator.findById(req.params.id);
        if (!ator) return res.status(404).json({ error: "Não encontrado" });
        res.json(ator);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
})

app.get('/generos', async (req, res) => listarDados(Genero, req, res));
app.get('/generos/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ error: "Não encontrado" });
        res.json(genero);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
})

app.listen(7789, () => console.log('API de Cinema a correr em http://localhost:7789/'));