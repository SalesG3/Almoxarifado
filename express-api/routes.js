const server = require('./server.js');

const app = server.app;
const con = server.con;

// User Login request
app.post('/', async function(req, res) {
    
    let[query] = await con.promise().query(`CALL user_validate('${req.body.userIn}', '${req.body.passwordIn}')`);

    if(query[0][0] == undefined){
        res.send({
            falied:'userIn & passwordIn dont match'
        })
    } else {
        res.send({
            sucess: query[0]
        })
    }
})