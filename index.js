var io = require('socket.io');
var express = require('express');
var app = express()
var server = require('http').createServer(app)
var io = io.listen(server);
var formidable = require('formidable');
var util = require("util");
var lib = require('./lib');
var fs = require("fs");

server.listen(6969);

app.get("/", function(req,res){
  app.use(express.static(__dirname + "/public"));
  res.sendfile(__dirname);
}); // Cerramos el app.get

app.post('/upload', upload);

function upload(req, res, next){
    var form = new formidable.IncomingForm();
    fields = [],files = [];
    form.uploadDir = './uploads';
    console.log("Se ha recibido el formulario");

    form.parse(req, function(err, fields, files) {
      var nombre = fields.nombre;
      var asunto = fields.asunto;
      var mensaje = fields.mensaje;
      console.log("El nombre es:" + nombre);
      console.log("El asunto es:" + asunto);
      console.log("El mensaje es:"+ mensaje);
      var archivo = files.upload.name;
      fs.rename(files.upload.path, archivo)
      console.log("El nombre del archivo es:" + archivo);
      console.log(util.inspect(files));
      res.redirect('/');
      lib.formulario(nombre,asunto,mensaje);
      lib.cambios();
    });
  }


io.sockets.on("connection",iniciar)

function iniciar(socket)
{
  console.log("Entraron datos al manejador de eventos");
  socket.on("newMessage",enviar);
}

function enviar(mensaje)
{
  console.log("Entraron datos al evento sendEvent");
  io.sockets.emit("sendEvent", mensaje);
  lib.chat(mensaje);
}