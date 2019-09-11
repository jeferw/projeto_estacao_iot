class EstacaoDAO {

    constructor(application) {
        this._cds = new application.config.DataSet();
    }

    inserirClima(dados, callback) {
        this._cds.getConnection((err) =>
            this._cds.commandInsert('INSERT INTO CLIMA SET ?', dados, callback)
        );
    }

    inserirCliente(dados, callback) {
        this._cds.getConnection((err) =>
            this._cds.commandInsert('INSERT INTO CLIMACLIENTE SET ?', dados, callback)
        );
    }

    inserirAcesso(dados, callback) {
        this._cds.getConnection((err) =>
            this._cds.commandInsert('INSERT INTO CLIMACESSO SET ?', dados, callback)
        );
    }

    updateAcesso(sClimaAcesso, callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' UPDATE CLIMACESSO '
                + '  SET '
                + '      DATASAIU = NOW(), '
                + '      HORASAIU = NOW()  '
                + '  WHERE'
                + '      SCLIMACESSO = ' + sClimaAcesso
                + ' ', callback)
        );
    }

    getAcesso(soketId, callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '    CLIMACESSO.SCLIMACESSO '
                + ' FROM CLIMACESSO '
                + ' WHERE CLIMACESSO.SOCKETID = \'' + soketId + '\''
                + ' ', callback)
        );
    }

    getCliente(ip, iplocal, callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '    CLIMACLIENTE.SCLIMACLIENTE '
                + ' FROM CLIMACLIENTE '
                + ' WHERE CLIMACLIENTE.IP = \'' + ip + '\' AND CLIMACLIENTE.IPLOCAL = \'' + iplocal + '\''
                + ' ', callback)
        );
    }

    getUltimoRegistro(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '    CLIMAULT.DATAHORALBL, '
                + '    CLIMAULT.TEMPERATURA, '
                + '    CLIMAULT.UMIDADE, '
                + '    CLIMAULT.PRESSAO, '
                + '    CLIMAULT.VENTO, '
                + '    CLIMAULT.LDR '
                + ' FROM CLIMAULT '
                + ' ', callback)
        );
    }

    getFullChart(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '    ROUND(AVG(DADOS.TEMPERATURA), 1) AS TEMPERATURA,'
                + '    ROUND(AVG(DADOS.UMIDADE), 1) AS UMIDADE,'
                + '    DADOS.DATA,'
                + '    DADOS.HORA'
                + ' FROM'
                + '    (SELECT '
                + '        CLIMA.TEMPERATURA,'
                + '        CLIMA.UMIDADE,'
                + '        CLIMA.DATA,'
                + '        TIME_FORMAT(SEC_TO_TIME(TIME_TO_SEC(CLIMA.HORA) - TIME_TO_SEC(CLIMA.HORA) % (60 * 60)), "%H:%i") AS HORA'
                + '     FROM CLIMA'
                + '     WHERE CLIMA.DATAHORA >= ADDTIME(NOW(), "-23:00:00")'
                + '     ) AS DADOS'
                + ' GROUP BY DADOS.DATA, DADOS.HORA'
                + ' ORDER BY DADOS.DATA, DADOS.HORA', callback)
        );
    }

    getTempChart(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '   ROUND(AVG(D.TEMPERATURA), 2) AS TEMPERATURA,'
                + '   D.DATA,'
                + '   D.HORA'
                + ' FROM'
                + '     (SELECT '
                + '         DADOS.TEMPERATURA, DADOS.DATA, TIME_FORMAT(DADOS.INTERVALOS, "%H:%i") AS HORA'
                + '     FROM'
                + '         (SELECT '
                + '             CLIMA.TEMPERATURA,'
                + '             CLIMA.DATA,'
                + '             SEC_TO_TIME(TIME_TO_SEC(CLIMA.HORA) - TIME_TO_SEC(CLIMA.HORA) % (10 * 60)) AS INTERVALOS'
                + '     FROM CLIMA'
                + '     WHERE CLIMA.DATAHORA >= ADDTIME(NOW(), "-2:00:00")) AS DADOS) AS D'
                + ' GROUP BY D.DATA , D.HORA'
                + ' ORDER BY D.DATA , D.HORA', callback)
        );
    }

    getUmidChart(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '   ROUND(AVG(D.UMIDADE), 2) AS UMIDADE,'
                + '   D.DATA,'
                + '   D.HORA'
                + ' FROM'
                + '     (SELECT '
                + '         DADOS.UMIDADE, DADOS.DATA, TIME_FORMAT(DADOS.INTERVALOS, "%H:%i") AS HORA'
                + '     FROM'
                + '         (SELECT '
                + '             CLIMA.UMIDADE,'
                + '             CLIMA.DATA,'
                + '             SEC_TO_TIME(TIME_TO_SEC(CLIMA.HORA) - TIME_TO_SEC(CLIMA.HORA) % (10 * 60)) AS INTERVALOS'
                + '     FROM CLIMA'
                + '     WHERE CLIMA.DATAHORA >= ADDTIME(NOW(), "-2:00:00")) AS DADOS) AS D'
                + ' GROUP BY D.DATA , D.HORA'
                + ' ORDER BY D.DATA , D.HORA', callback)
        );
    }

    getPresChart(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '   ROUND(AVG(D.PRESSAO), 2) AS PRESSAO,'
                + '   D.DATA,'
                + '   D.HORA'
                + ' FROM'
                + '     (SELECT '
                + '         DADOS.PRESSAO, DADOS.DATA, TIME_FORMAT(DADOS.INTERVALOS, "%H:%i") AS HORA'
                + '     FROM'
                + '         (SELECT '
                + '             CLIMA.PRESSAO,'
                + '             CLIMA.DATA,'
                + '             SEC_TO_TIME(TIME_TO_SEC(CLIMA.HORA) - TIME_TO_SEC(CLIMA.HORA) % (10 * 60)) AS INTERVALOS'
                + '     FROM CLIMA'
                + '     WHERE CLIMA.DATAHORA >= ADDTIME(NOW(), "-2:00:00")) AS DADOS) AS D'
                + ' GROUP BY D.DATA , D.HORA'
                + ' ORDER BY D.DATA , D.HORA', callback)
        );
    }

    getLumiChart(callback) {
        this._cds.getConnection(() =>
            this._cds.command(''
                + ' SELECT '
                + '   ROUND(AVG(D.LDR), 2) AS LDR,'
                + '   D.DATA,'
                + '   D.HORA'
                + ' FROM'
                + '     (SELECT '
                + '         DADOS.LDR, DADOS.DATA, TIME_FORMAT(DADOS.INTERVALOS, "%H:%i") AS HORA'
                + '     FROM'
                + '         (SELECT '
                + '             CLIMA.LDR,'
                + '             CLIMA.DATA,'
                + '             SEC_TO_TIME(TIME_TO_SEC(CLIMA.HORA) - TIME_TO_SEC(CLIMA.HORA) % (10 * 60)) AS INTERVALOS'
                + '     FROM CLIMA'
                + '     WHERE CLIMA.DATAHORA >= ADDTIME(NOW(), "-2:00:00")) AS DADOS) AS D'
                + ' GROUP BY D.DATA , D.HORA'
                + ' ORDER BY D.DATA , D.HORA', callback)
        );
    }
}

module.exports = () => {
    return EstacaoDAO;
}