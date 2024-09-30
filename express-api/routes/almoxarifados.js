const { app, con} = require('../server');

// Dados para GRID : Almoxarifados
app.post('/grid/almoxarifados/', async (req, res) => {

    let [query] = await con.promise().execute(`CALL grid_almoxarifados("%${req.body.busca}%")`)

    res.send(query[0])
})


// Novo Registro : Almoxarifado
app.post('/almoxarifados', async (req, res) => {
    let {codigo, nome} = req.body;

    let [query] = await con.promise().execute(`CALL novo_almoxarifado (${codigo}, '${nome}')`)

    if(query[0] == undefined)
        {res.send({ sucesso : query}); return}

    else
        {res.send({duplicado : query[0]}); return}
})


// Alterando Registro : Almoxarifado
app.put('/almoxarifados/:id', async (req, res) => {
    let { codigo, nome} = req.body;

    let [query] = await con.promise().execute(`CALL alterar_almoxarifado (${req.params.id}, ${codigo}, '${nome}')`);

    if(query[0] == undefined)
        { res.send({ sucesso : query }); return}

    else if (query[0][0] == undefined)
        { res.send({ erro : "ID Inexistente!"}); return }

    else
        { res.send({ duplicado : query[0][0] }); return }
})


// Consultar Registro : Almoxarifado
app.get('/almoxarifados/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_almoxarifado (${req.params.id})`);

    res.send(query[0]);
})


// Código Disponível : Almoxarifado
app.get('/codigo/almoxarifados', async (req, res) => {

    let [query] = await con.promise().execute(`CALL codigo_almoxarifado ( )`);

    res.send(query[0]);
})