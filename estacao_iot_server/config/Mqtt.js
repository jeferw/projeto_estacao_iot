class Mqtt {
    /*Classe para executar a comunicação MQTT */
    constructor(application) {
        this.mqtt = require('mqtt');

        const _application = application;

        let options = {
            host: 'mosquitto',
            port: 1883,
            protocolId: 'MQTT',
            protocolVersion: 4,
            keepalive: 30,
            clientId: 'server_mqtt',
            username: '******',
            password: '******'
        };

        const client = this.mqtt.connect(options);

        this._client = client;

        this._client.on('close', () => {
            client.reconnect();
        });

        this._client.on('connect', function () {
            console.log('mqtt conectado ' + client.connected);
            client.subscribe('server/estacao'); //tópico que o servidor estará "escutando"
        });

        this._client.on('error', function (error) {
            console.log('erro ao se conectar ' + error);
        });
        /*Ao receber uma mensagem MQTT chama a função para grava-la  */
        this._client.on('message', function (topic, message) {
            if (topic === 'server/estacao')
                _application.app.controllers.adicionar.addMqtt(_application, JSON.parse(message));
        });
    }

    get client() {
        return this._client;
    }

    publish(topico, msg) {
        console.log('>> Topico: ', topico, ' msg: ', msg);

        this._client.publish(topico, msg);
    }
};

module.exports = () => {
    return Mqtt;
}