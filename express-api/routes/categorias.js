const { app, con} = require('../server');

// Dados para GRID : Categorias
app.get('/grid/categorias', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_categorias ( )`);

    res.send(query[0]);
});

// Novo registro : Categorias
// Desenvolvimento :::
app.post('/categorias', async (req, res) => {
    let {codigo, nome, ativo, descricao} = req.body;
})

// Consultar registro específico :::
app.get('/categorias/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_categoria (${req.params.id})`);

    res.send(query);
})