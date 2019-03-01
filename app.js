/* importar configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta*/
var server = app.listen(80, function () {
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar a conexão por websocket */
io.on('connection', function (socket) {
    console.log('Usuário conectou!');

    socket.on('disconnect', function () {
        console.log("Usuário Desconectou!");
    });

    socket.on('msgParaServidor', function (data) {

        /*Dialogo*/
        socket.emit('msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem});

        socket.broadcast.emit('msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem});

        /*Participantes*/
        console.log(data.apelido_atualizado_nos_clientes);
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit('participantesParaCliente',
                {apelido: data.apelido});

            socket.broadcast.emit('participantesParaCliente',
                {apelido: data.apelido});
        }
    });
});
