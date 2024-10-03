const { app, con } = require('../server');


// Dados para GRID : Fornecedores
app.post('/grid/fornecedores', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_fornecedores ( '%${req.body.busca}%' )`);

    res.send(query[0]);
});


// Novo Registro : Fornecedores
app.post('/fornecedores', async (req, res) => {
    let { codigo, nome, cnpj, responsavel, contato, agencia, conta,
        pix, uf, bairro, cidade, endereco, complemento, descricao} = req.body;

    let [query] = await con.promise().execute(`CALL novo_fornecedor ('${codigo}', '${nome}', '${cnpj}', '${responsavel}', '${contato}',
        '${agencia}', '${conta}', '${pix}', '${uf}', '${bairro}', '${cidade}', '${endereco}', '${complemento}', '${descricao}')`);

    if(!query[0])
        {res.send({ sucesso : query }); return}

    if(query[0][0].codigo)
        { res.send({ duplicado : "codigo"}); return}

    if(query[0][0].cnpj)
        { res.send({ duplicado : "cnpj"}); return}

});


// Alterando Registro : Fornecedores
app.put('/fornecedores/:id', async (req, res) => {
    let { codigo, nome, cnpj, responsavel, contato, agencia, conta,
        pix, uf, bairro, cidade, endereco, complemento, descricao} = req.body;

    let [query] = await con.promise().execute(`CALL alterar_fornecedor ('${req.params.id}','${codigo}', '${nome}', '${cnpj}', '${responsavel}',
        '${contato}', '${agencia}', '${conta}', '${pix}', '${uf}', '${bairro}', '${cidade}', '${endereco}', '${complemento}', '${descricao}')`);

    if(!query[0])
        {res.send({ sucesso : query }); return}

    if(query[0][0].codigo)
        { res.send({ duplicado : "codigo"}); return}

    if(query[0][0].cnpj)
        { res.send({ duplicado : "cnpj"}); return}

    if(query[0][0].id)
        { res.send({ erro : "ID Inexistente!"}); return}
});


// Consultar Registro : Fornecedores
app.get('/fornecedores/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_fornecedor ( ${req.params.id})`)

    res.send(query[0])
})


// Código Disponível : Fornecedores
app.get('/codigo/fornecedores', async (req, res) => {

    let [query] = await con.promise().execute(`CALL codigo_fornecedor ( )`)

    res.send(query[0]);
});