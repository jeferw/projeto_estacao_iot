module.exports = (application) => {
    application.post('/estacaoiot/add', (req, res) => {
        application.app.controllers.adicionar.add(application, req, res);
    })
};