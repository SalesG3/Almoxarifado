const server = require('./server.js');

const app = server.app;
const DBcon = server.con;

// Requisição para Login de usuário
app.post('/', async function (req, res) {
    
    let [query] = await DBcon.promise().query(`CALL validar_usuario('${req.body.usuario}','${req.body.senha}')`)

    res.send({
        sucess: query[0][0].id
    })
})