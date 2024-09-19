const server = require('../server.js');

const app = server.app;
const con = server.con;

// Data Table Products
app.get('/produtos', async function (req, res) {
    
    let [query] = await con.promise().query('SELECT id, codigo, nome, medida FROM produtos');

    res.send(query)
});

// New record in Products
app.post('/produtos', async function (req, res) {

    let [query] = await con.promise().query(`CALL unique_produtos('${req.body.codigo}')`);

    if(query[0][0] == undefined){

            [query] = await con.promise().query(`CALL new_product('${req.body.codigo}', '${req.body.nome}',
                '${req.body.marca}', '${req.body.medida}', NULLIF('${req.body.categoria}',''), '${req.body.localizacao}',
                '${req.body.centro_custo}', '${req.body.almoxarifado}', '${req.body.descricao}')`);

                res.send({
                    sucess: query
                })

    } else {
        res.send({
            falied: query[0]
        })
    }    
});

// Request for a especifiqued record
app.get('/produtos/:id', async function (req, res) {

    let [query] = await con.promise().execute(`CALL consult_product(${req.params.id})`);

    query[0][0].categoria = {
        id: query[0][0].CAid,
        codigo: query[0][0].CAcodigo,
        nome: query[0][0].CAnome
    }

    query[0][0].centro_custo = {
        id: query[0][0].CCid,
        codigo: query[0][0].CCcodigo,
        nome: query[0][0].CCnome
    }

    query[0][0].almoxarifado = {
        id: query[0][0].ALid,
        codigo: query[0][0].ALcodigo,
        nome: query[0][0].ALnome
    }

    res.send(query)
})