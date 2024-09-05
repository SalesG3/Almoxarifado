const server = require('./server.js');

const app = server.app;
const DBcon = server.con;

// Requisição para Login de usuário
app.post('/', async function (req, res) {
    
    let [query] = await DBcon.promise().query(`CALL validar_usuario('${req.body.usuario}','${req.body.senha}')`)
    
    if(query[0][0] == undefined){
        res.send({
            falied: "Email/Senha não compatíveis!"
        })
    }
    else{
        res.send({
            token: "acess2255",
            id: query[0][0].id,
        })
    }
})

// Novo registro em Produtos
app.post('/produtos', async function (req, res) {

    let [consulta] = await DBcon.promise().query('SELECT codigo FROM produtos')

    for(let i in consulta){
        if(consulta[i].codigo == req.body.codigo){

            res.send({
                falied: "Código já existente no Banco de Dados!"
            })
            return
        }
    };

    let [query] = await DBcon.promise().query(`CALL novo_produto
        ('${req.body.codigo}', '${req.body.produto}', '${req.body.medida}', '${req.body.descricao}')`);

    res.send({
        sucess: query.insertId
    })
})