const { app, con} = require('../server');

// Dados para GRID : Categorias
app.post('/grid/categorias', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_categorias ('%${req.body.busca}%' )`);

    res.send(query[0]);
});


// Novo Registro : Categorias
app.post('/categorias', async (req, res) => {
    let {codigo, nome, ativo, descricao} = req.body;

    let [query] = await con.promise().execute(`CALL novo_categoria ('${codigo}', '${nome}', ${ativo}, '${descricao}')`);

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else
        { res.send({ duplicado : query[0]}); return}
})


// Alterando Registro : Categorias
app.put('/categorias/:id', async (req, res) => {
    let {codigo, nome, ativo, descricao} = req.body;

    let [query] = await con.promise().execute(`CALL alterar_categoria ( ${req.params.id}, '${codigo}', '${nome}', ${ativo}, '${descricao}')`)

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else if (query[0][0] == undefined)
        { res.send({ erro : "ID Inexistente!"}); return }

    else
        { res.send({ duplicado : query[0][0] }); return }
})


// Consultar Registro : Categorias
app.get('/categorias/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_categoria (${req.params.id})`);

    res.send(query[0]);
})


// Código Disponível : Categorias
app.get('/codigo/categorias', async (req, res) => {

    let [query] = await con.promise().execute(`CALL codigo_categoria ( )`);

    res.send(query[0]);
})