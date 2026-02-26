const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.examesListPage = (tlist, d) => renderPug('index', { list: tlist, date: d });
exports.exameFormPage = (d) => renderPug('form', { date: d });
exports.examePage = (e, d) => renderPug('emd', { exame: e, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d })
exports.exameFormEditPage = (e, d) => renderPug('form', { exame: e, date: d });
exports.statsPage = (lista, d) => renderPug('stats', { list: lista, date: d });