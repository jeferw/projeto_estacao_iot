module.exports.addAcesso = (application, dados, soketId) => {

    if (!dados.geoplugin_request || !dados.local_address)
        return;

    if (dados.geoplugin_request === '177.23.13.104' && dados.local_address === '192.168.10.105')
        return;

    application.app.controllers.cliente.insertOrGetCli(application, dados, (clienteId) => {
        let date = new Date();

        let acesso = {};
        acesso.DATAENTROU = date;
        acesso.HORAENTROU = date;
        acesso.SOCKETID = soketId;
        acesso.SCLIMACLIENTE = clienteId;

        let EstacaoDAO = new application.app.models.EstacaoDAO(application);

        EstacaoDAO.inserirAcesso(acesso, () => {
        });
    });
};

module.exports.endAcesso = (application, soketId) => {
    let EstacaoDAO = new application.app.models.EstacaoDAO(application);

    EstacaoDAO.getAcesso(soketId, (acesso) => {
        if (acesso.length !== 0 && acesso[0].SCLIMACESSO)
            EstacaoDAO.updateAcesso(acesso[0].SCLIMACESSO, () => {
            });
    });
};