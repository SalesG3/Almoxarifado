require('./routes/lookups.js');
require('./routes/produtos.js');
require('./routes/categorias.js');
require('./routes/almoxarifados.js');
require('./routes/custos.js')
require('./routes/locais.js')
require('./routes/fornecedores.js')

const { app, con } = require('./server.js');

// Requisição de Login Usuário
app.post('/login', async function(req, res) {
    let {userIn, passwordIn} = req.body;
    
    let[query] = await con.promise().query(`CALL login_usuario ( '${passwordIn}', '${userIn}')`);

    if(query[0] == undefined)
        {res.send({ erro : "Login e Senha não compatíveis"}); return}

    else
        {res.send({ sucesso : query[0] }); return}

})