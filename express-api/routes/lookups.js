const server = require('../server.js');

const app = server.app;
const con = server.con;

// Lookup Categorias request
app.get('/lookup/categoria', async function (req, res) {

    let [query] = await con.promise().query('SELECT * FROM categorias');

    res.send(query);
})

// Lookup Centro Custos request
app.get('/lookup/centro_custo', async function (req, res) {

    let [query] = await con.promise().query('SELECT * FROM centro_custo');

    res.send(query)
})

// LookUp Almoxarifado request
app.get('/lookup/almoxarifado', async function (req, res) {

    let [query] = await con.promise().query('SELECT * FROM almoxarifado')

    res.send(query)
})