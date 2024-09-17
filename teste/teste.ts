var columns = ['id', 'codigo', 'nome'];
var table = 'produtos';

var data = [
    {
        id : 1,
        codigo : 1,
        nome : 'Gabriel'
    },
    {
        id : 2,
        codigo : 2,
        nome : 'José'
    },
    {
        id : 3,
        codigo : 3,
        nome : 'Alfredo'
    }
]

function request (table : string, columns : string[]) {

    let text : string = "";

    for(let i in data){

        text += '<tr>'

        for(let j in data[i]){
            text += '<td>' + data[i][j] + '</td>'
        }

        text += '</tr>'
    }

    console.log(text)
}

request('',['']);