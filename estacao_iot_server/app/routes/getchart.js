module.exports = (application) => {
    application.post('/estacaoiot/getchart', (req, res) => {
        application.app.controllers.getchart.getchart(application, req, res);
    })
};