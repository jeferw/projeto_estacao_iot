module.exports.insertOrGetCli = (application, dados, callback) => {
    /*Inserir o IP do usuário que está acessando o site */
    let cliente = {};
    cliente.IP = dados.geoplugin_request;
    cliente.IPLOCAL = dados.local_address;
    cliente.CIDADE = dados.geoplugin_city;
    cliente.ESTADO = dados.geoplugin_regionName;
    cliente.PAIS = dados.geoplugin_countryName;
    cliente.LATITUDE = dados.geoplugin_latitude;
    cliente.LONGITUDE = dados.geoplugin_longitude;

    let EstacaoDAO = new application.app.models.EstacaoDAO(application);

    EstacaoDAO.getCliente(cliente.IP, cliente.IPLOCAL, (cli) => {

        if (cli.length !== 0 && cli[0].SCLIMACLIENTE)
            callback(cli[0].SCLIMACLIENTE);
        else
            EstacaoDAO.inserirCliente(cliente, (clienteId) => {
                callback(clienteId);
            });
    });
};