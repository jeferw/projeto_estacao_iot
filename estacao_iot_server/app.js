var app = require('./config/server');

/*Starta o servidor http */
var server = app.listen(8888, () => {
	console.log('Server online!');
});

/*Starta o servidor web socket */
var io = require('socket.io')(server);

/*Starta um cliente MQTT */
new app.config.Mqtt(app);

app.set('io', io);

io.on('connection', function (socket) {

	let EstacaoDAO = new app.app.models.EstacaoDAO(app);
	/*Salva o IP do usuário quando se conecta */
	socket.on('disconnect', function () {
		app.app.controllers.acesso.endAcesso(app, socket.id);
	});
	/*Grava a hora que o usuário se desconectou  */
	socket.on('servidor/addresscli', function (data) {
		app.app.controllers.acesso.addAcesso(app, data, socket.id);
	});
	/*Envia por socket o último registro do clima  */
	EstacaoDAO.getUltimoRegistro((dados) => {
		socket.emit('msgCliente', dados[0]);
	});
});