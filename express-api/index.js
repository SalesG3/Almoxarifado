require('./routes/lookups.js');
require('./routes/products.js');
require('./routes/category.js');

const server = require('./server.js');
const app = server.app;
const con = server.con;

// User Login request
app.post('/login', async function(req, res) {
    let {userIn, passwordIn} = req.body;
    
    let[query] = await con.promise().query(`CALL user_validate('${userIn}', '${passwordIn}')`);
    
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