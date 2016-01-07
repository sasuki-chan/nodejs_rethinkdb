//Usando Node.js 0.10.24 con RethinkDB 2.0.1
//Importar RethinkDB
var r = require('rethinkdb');
var connection = null;

//Conectar a RethinkDB
r.connect({host:'https://aws-us-east-1-portal6.dblayer.com:11171/', 
           port:28015, db:'anime', 
           authKey:'khomGojMjrNpzTiKQfCqylxPX6uaHAgeXWjLhQOcFa4',
           ssl: }, function(err, conn) {
    if (err) throw err;
        connection = conn;

//Consulta todos los datos de una tabla
r.table('anime').run(connection, function(err,cursor) {
    if (err) throw err;
        cursor.toArray(function(err, result) {
        if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
    });
});

//Usando ChangeFeed para avisarnos de los cambios en RethinkDB
r.table('anime').changes().run(connection, function(err, cursor) {
    if (err) throw err;
        cursor.each(function(err, row) {
        if (err) throw err;
            console.log(JSON.stringify(row, null, 2));
    });
});

});