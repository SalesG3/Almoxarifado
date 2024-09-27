const {app, con} = require('../server.js');

// Dados para GRID : Produtos
app.get('/produtos', async (req, res) => {
    let [query] = await con.promise().execute('CALL grid_produtos()');
    
    res.send(query[0])
});

// Novo Registro : Produtos
app.post('/produtos', async (req, res) => {
    let {codigo, nome, marca, medida, categoria, localizacao, centro_custo, almoxarifado, descricao} = req.body;

    let [query] = await con.promise().execute(`CALL novo_produto ('${codigo}', '${nome}', '${marca}',
        '${medida}', '${categoria}', '${localizacao}', '${centro_custo}', '${almoxarifado}', '${descricao}',)`)

    if (query[0] == undefined)
        { res.send({ sucesso : query }); return}
    
    else
        { res.send({ duplicado : query[0]}); return}
});

// Alterar Registro : Produtos
app.put('/produtos/:id', async (req, res) => {
    let {codigo, nome, marca, medida, categoria, localizacao, centro_custo, almoxarifado, descricao} = req.body;

    let[query] = await con.promise().execute(`CALL alterar_produto('${req.params.id}', '${codigo}', '${nome}', '${marca}',
        '${medida}', '${categoria}', '${localizacao}', '${centro_custo}', '${almoxarifado}', '${descricao}')`)

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else
        { res.send({ erro : "ID inexistente!"}); return}
})

// Consultar Registro : Produtos
app.get('/produtos/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_produto(${req.params.id})`);

    res.send(query[0])
})

// Apagar Registro : Produtos
app.delete('/produtos/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL deletar_produto (${req.params.id})`);

    if(query[0] == undefined)
        {res.send({ sucesso : query }); return}
    
    else
    {res.send({ erro : "ID inexistente!"}); return}
})