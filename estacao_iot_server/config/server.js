//process.env.TZ = 'America/Sao_Paulo';

/*Importar o módulo do framework express */
var express = require('express');

/*importar o modulo do consign */
var consign = require('consign');

/*importar o modulo do body-parser */
var bodyParser = require('body-parser');

/*iniciar o objeto express */
var app = express();

/*setar as variaveis 'view engine' e 'views' do express */

app.set('view engine', 'ejs');
app.set('views', './app/views');

/*configurar o middleware express.static */
app.use(express.static('./app/public'));

/*configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));

/*efetua o auto load das rotas, models e controlles para o objeto app  */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
	.then('config/DataSet.js')
    .then('config/dbConnetion.js')
    .then('config/Mqtt.js')
    .into(app);

/*exportar o objeto app */
module.exports = app;