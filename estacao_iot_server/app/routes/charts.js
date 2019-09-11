module.exports = (application) => {
    application.get('/charts', (req, res) => {
        application.app.controllers.charts.chart(application, req, res);
    })
};