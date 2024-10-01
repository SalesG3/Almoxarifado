const { app, con } = require('../server');


// Dados para GRID : Fornecedores
app.get('/grid/fornecedores', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_fornecedores`);

    res.send(query[0]);
})

// Novo Registro : Fornecedores
app.post('/fornecedores', async (req, res) => {

    let [query] = await con.promise().execute(`CALL novo_fornecedor (${req.body})`);

    res.send(query);
})