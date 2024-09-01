const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin:'http://localhost:4200'}))

app.listen(8000, () => {
    console.log('Servidor Express Live!! http://localhost:8000/')
})

const mysql = require('mysql2/promise');
const sqlcon = mysql.createPool('mysql://root:otJKDeDzWueXZjjjxsKNYaEcnyUCcFvE@junction.proxy.rlwy.net:58360/railway');

app.get('/', async function(req, res) {
    
    let [query] = await sqlcon.execute('SELECT * FROM usuarios');

    res.send(query)
})