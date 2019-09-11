module.exports.addMqtt = (application, dados) => {

    tratarDados(dados);

    var EstacaoDAO = new application.app.models.EstacaoDAO(application);

    EstacaoDAO.inserirClima(dados, () => {
        /*Ao receber uma msg, após grava-la, a reencaminha para o navegador por socket */
        EstacaoDAO.getUltimoRegistro((dados) => {
            application.get('io').emit('msgCliente', dados[0]);
        });
    });
}

tratarDados = (dados) => {
    let date = new Date();

    dados.DATA = date;
    dados.HORA = date;

    return dados;
}

module.exports.add = (application, req, res) => {
    var body = req.body;
    var dados = body;

    tratarDados(dados);

    var EstacaoDAO = new application.app.models.EstacaoDAO(application);

    EstacaoDAO.inserirClima(dados, () => {
        EstacaoDAO.getUltimoRegistro((dados) => {
            application.get('io').emit('msgCliente', dados[0]);
            res.send('OK');
        });
    });
}