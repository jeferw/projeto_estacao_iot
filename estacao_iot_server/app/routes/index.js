module.exports = (application) => {
    application.get('/estacaoiot', (req, res) => {
        application.app.controllers.index.home(application, req, res);
    })
};