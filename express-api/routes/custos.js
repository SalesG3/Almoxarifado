const { app, con } = require('../server');

// Dados para GRID : Centro de Custos
app.get('/grid/custos', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_custos`);
    
    res.send(query[0]);

});


// Novo Registro : Centro de Custos
app.post('/custos', async (req, res) => {
    let { codigo, nome } = req.body;

    let [query] = await con.promise().execute(`CALL novo_custo ('${codigo}', '${nome}')`);

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else
        { res.send({ duplicado : query[0]}); return}
});


// Alterar Registro : Centro de Custos
app.put('/custos/:id', async (req, res) => {
    let { codigo, nome } = req.body;

    let [query] = await con.promise().execute(`CALL alterar_custo (${req.params.id}, ${codigo}, '${nome}' )`)

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else if (query[0][0] == undefined)
        { res.send({ erro : "ID Inexistente!"}); return }

    else
        { res.send({ duplicado : query[0][0] }); return }
});


// Consultar Registro : Centro de Custos
app.get('/custos/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_custo (${req.params.id})`);

    res.send(query[0]);
})


// Código Disponível : Centro de Custos
app.get('/codigo/custos', async (req, res) => {

    let [query] = await con.promise().execute(`CALL codigo_custos ( )`);

    res.send(query[0]);
});