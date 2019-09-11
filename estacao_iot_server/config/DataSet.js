class DataSet {
    /*Classe para executar a interação com o banco de dados */
    constructor() {
        this._pool = require('./dbConnetion');
    }

    getConnection(callback) {
        var dataSet = this;
        dataSet._pool.getConnection((err, conn) => {

            if (err) throw err;

            dataSet._connection = conn;

            callback();
        });
    }

    command(query, callback) {
        this._connection.query(query, (err, result, fields) => {
            if (err) throw err;

            this._connection.release();

            callback(result);
        });
    }

    commandInsert(query, dados, callback) {
        this._connection.query(query, dados, (err, result) => {
            this._connection.release(); callback(result.insertId);
        });
    }
}

module.exports = () => {
    return DataSet;
}