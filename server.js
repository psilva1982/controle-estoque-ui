const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/controle-estoque'));

app.get('/*', function(request, response){
  response.sendFile(__dirname + '/dist/controle-estoque/index.html');
});

app.listen(4200, '192.168.0.90');

/* Para executar  */
/* node server.js */
