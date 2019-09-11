module.exports.getchart = (application, req, res) => {

    var EstacaoDAO = new application.app.models.EstacaoDAO(application);
    /*Funções para retornar os gráficos para a tela */
    EstacaoDAO.getFullChart((dados) => {
        let retono = {};
        let dadosAux = {};

        let labels = [];
        let temperatura = [];
        let umidade = [];

        dados.forEach((item) => {
            labels.push(item.HORA)
            temperatura.push(item.TEMPERATURA)
            umidade.push(item.UMIDADE)
        });

        dadosAux.HORA = labels;
        dadosAux.TEMPERATURA = temperatura;
        dadosAux.UMIDADE = umidade;

        retono.FULL = dadosAux;

        EstacaoDAO.getTempChart((dados) => {
            dadosAux = {};
            temperatura = [];
            labels = [];

            dados.forEach((item) => {
                labels.push(item.HORA)
                temperatura.push(item.TEMPERATURA)
            });

            dadosAux.HORA = labels;
            dadosAux.TEMPERATURA = temperatura;

            retono.TEMP = dadosAux;

            EstacaoDAO.getUmidChart((dados) => {
                dadosAux = {};
                umidade = [];
                labels = [];

                dados.forEach((item) => {
                    labels.push(item.HORA)
                    umidade.push(item.UMIDADE)
                });

                dadosAux.HORA = labels;
                dadosAux.UMIDADE = umidade;

                retono.UMID = dadosAux;

                EstacaoDAO.getPresChart((dados) => {
                    dadosAux = {};
                    let pressao = [];
                    labels = [];

                    dados.forEach((item) => {
                        labels.push(item.HORA)
                        pressao.push(item.PRESSAO)
                    });

                    dadosAux.HORA = labels;
                    dadosAux.PRESSAO = pressao;

                    retono.PRES = dadosAux;

                    EstacaoDAO.getLumiChart((dados) => {
                        dadosAux = {};
                        let luminosidade = [];
                        labels = [];

                        dados.forEach((item) => {
                            labels.push(item.HORA)
                            luminosidade.push(item.LDR)
                        });

                        dadosAux.HORA = labels;
                        dadosAux.LDR = luminosidade;

                        retono.LUMI = dadosAux;

                        res.json(retono);
                    });
                });
            });
        });
    });
}