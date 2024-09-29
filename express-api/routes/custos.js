const { app, con } = require('../server');

// Dados para GRID : Centro de Custos
app.get('/grid/custos', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_custos`);
    
    res.send(query[0]);

})

// Novo Registro : Centro de Custos
app.post('/custos', async (req, res) => {
    let { codigo, nome } = req.body;

    let [query] = await con.promise().execute(`CALL novo_custo ('${codigo}', '${nome}')`);

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else
        { res.send({ duplicado : query[0]}); return}
})