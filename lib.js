var r = require('rethinkdb');

module.exports.formulario = function(nombre,asunto,mensaje) {
//Aqui empieza el codigo RethinkDB
var nombre = nombre;
var asunto = asunto;
var mensaje = mensaje;
var connection = null;

//Conectar a RethinkDB
r.connect({host:'localhost', port:28015, db:'test'},function(err, conn){
    if (err) throw err;
        connection = conn;

//Enviamos todos los del formulario
 r.table('info').insert({id:nombre, nombre:nombre, asunto:asunto, mensaje:mensaje}).run(connection);

}); //Aqui cierra la conexion que se inicio con r.connect
}

module.exports.chat = function(mensaje) {
//Conectar a RethinkDB
var mensaje = mensaje
var connection = null;
r.connect({host:'localhost', port:28015, db:'test'}, function(err, conn) 
{
    if (err) throw err;
        connection = conn;

r.table('chat').insert({mensaje:mensaje}).run(connection);
}); //Aqui cierra la conexion que se inicio con r.connect
}

module.exports.cambios = function() {
//Conectar a RethinkDB
var connection = null;
r.connect({host:'localhost', port:28015, db:'test'}, function(err, conn) {
    if (err) throw err;
        connection = conn;
r.table('info').changes().run(connection, function(err, cursor) {
    if (err) throw err;
        cursor.each(function(err, row)
    {
        if (err) throw err;
            console.log(JSON.stringify(row, null, 2));
    });
}); //Aqui cierra la peticion r.table('info').changes()

}); //Aqui cierra la conexion que se inicio con r.connect
}