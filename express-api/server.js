// Cria servidor utilizando biblioteca Express
// Cors para permitir requisições

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(express.json())

app.listen(8000, () => {
    console.log('Servidor Express Live!! http://localhost:8000/')
})

// Conecta com Banco de Dados
// DB online via RailWay

const mysql = require('mysql2');

const con = mysql.createConnection('mysql://root:otJKDeDzWueXZjjjxsKNYaEcnyUCcFvE@junction.proxy.rlwy.net:58360/DBmain');

con.connect(function(err){
    if(err) throw err;
    console.log('Banco de Dados conectado!')
})

// Exportar conexões

module.exports = {
    app: app,
    con: con
};