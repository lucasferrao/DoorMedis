const jsonMessagesPath = "../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Ler dados de uma encomenda (GET)
function read(req, res) {
    const query = connect.con.query('SELECT * FROM encomenda ORDER BY id_encomenda desc', function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//Ler dados de uma encomenda através do seu ID (GET)
function readID(req, res) {
    const id_encomenda = req.sanitize('id').escape();
    const post = { id_encomenda: id_encomenda };
    const query = connect.con.query('SELECT * FROM encomenda WHERE id_encomenda = ?', post, function(err, rows, fields) { 
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//Registo de uma nova encomenda (POST)
function save(req, res) {
    const estado = req.sanitize('estado').escape();
    const descricao = req.sanitize('descricao').escape();
    const preco = req.sanitize('preco').escape();
    const id_cliente = req.sanitize('id_cliente').escape();
    const id_estafeta = req.sanitize('id_estafeta').escape();
    const id_farmacia = req.sanitize('id_farmacia').escape();
    var query = "";
    //Validations
    req.checkBody("estado", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("descricao", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("preco", "Insira apenas números.").matches(/^[+-]?([0-9]*[.])?[0-9]+/i);
    req.checkBody("id_cliente", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("id_estafeta", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("id_farmacia", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (estado != "NULL" && descricao != "NULL" && preco != "NULL" && id_cliente != "NULL" && id_estafeta != "NULL" && id_farmacia != "NULL") {
            var post = { 
                estado: estado, 
                descricao: descricao, 
                preco: preco,
                id_cliente: id_cliente,
                id_estafeta: id_estafeta,
                id_farmacia: id_farmacia,
            };
            //Create & Execute a query on database to insert present data from post
            query = connect.con.query('INSERT INTO encomenda SET ?', post, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                    console.log("Message: 1 record inserted!");
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else 
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    };
}


//Atualizar uma encomenda (PUT)
function update(req, res) {
    const id_encomenda = req.sanitize('id_encomenda').escape();
    const estado = req.sanitize('estado').escape();
    const descricao = req.sanitize('descricao').escape();
    const preco = req.sanitize('preco').escape();
    //Validations
    req.checkParams("id_encomenda", "Insira o id de encomenda válido.").matches(/^[0-9]+$/i);
    req.checkBody("estado", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("descricao", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("preco", "Insira apenas números.").matches(/^[+-]?([0-9]*[.])?[0-9]+/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_encomenda != "NULL" && estado != "NULL" && descricao != "NULL" && preco != "NULL") {
            const update = [id_encomenda, estado, descricao, preco];
            const query = connect.con.query('UPDATE encomenda SET ? WHERE id_encomenda=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                    console.log("Message: 1 record updated!");
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
};