const { app, con } = require('../server');

app.post('/locais', async (req, res) => {
    let { codigo, nome, ativo, endereco, descricao } = req.body;
    let subelementos = req.body.subelementos;

    let [query] = await con.promise().execute(`CALL novo_local (${codigo}, '${nome}', ${ativo}, '${endereco}', '${descricao}')`);

    if(query[0] != undefined)
        {res.send({ duplicado : query[0]}); return };

    for(let i in subelementos){
        [query] = await con.promise().execute(`CALL novo_responsavel (${codigo}, '${subelementos[i].nome}', '${subelementos[i].inicio}')`);
    };

    res.send({ sucesso : query });
});