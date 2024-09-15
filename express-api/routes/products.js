const server = require('../server.js');

const app = server.app;
const con = server.con;

// Data Table Products
app.get('/produtos', async function (req, res) {
    
    let [query] = await con.promise().query('SELECT id, codigo, nome, medida FROM produtos');

    res.send(query)
})

// New record in Products
app.post('/produtos', async function (req, res) {

    let [query] = await con.promise().query(`CALL unique_produtos('${req.body.codigo}')`);

    if(query[0][0] == undefined){
            [query] = await con.promise().query(`CALL new_product('${req.body.codigo}', '${req.body.nome}',
                '${req.body.marca}', '${req.body.medida}', '${req.body.categoria}', '${req.body.localizacao}',
                '${req.body.centro_custo}', '${req.body.almoxarifado}', '${req.body.descricao}')`);

                res.send({
                    sucess: query
                })
    } else {
        res.send({
            falied: query[0]
        })
    }    
})