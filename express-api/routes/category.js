const { app, con} = require('../server');

// Registros na GRID principal do Componente :::
app.get('/categorias', async (req, res) => {

    let [query] = await con.promise().execute(`SELECT id, codigo, nome, ativo FROM categorias`);

    for(let i in query){
        if(query[i].ativo == 1){query[i].ativo = "Sim"} else
        if(query[i].ativo == 0){query[i].ativo = "Não"} else
        if(query[i].ativo == null){query[i].ativo = ""}
    }

    res.send(query)
})

// Novo registro :::
app.post('/categorias', async (req, res) => {

    let {codigo, nome, ativo, descricao} = req.body;

    let [query] = await con.promise().execute(`SELECT id FROM categorias WHERE codigo = ${codigo}`);

    if(query[0] != undefined) { res.send({falied : "Código já está sendo utilizado!"}); return}
    
    [query] = await con.promise().execute(
        `CALL nova_categoria('${codigo}','${nome}',${ativo},'${descricao}')`);

    res.send({ sucess : query })
})

// Consultar registro específico :::
app.get('/categorias/:id', async (req, res) => {

    let [query] = await con.promise().execute(`CALL consultar_categoria (${req.params.id})`);

    res.send(query);
})