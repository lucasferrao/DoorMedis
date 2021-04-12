const jsonMessagesPath = "../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connectMySQL');

//Ler dados de um produto (GET)
function read(req, res) {
    const query = connect.con.query('SELECT * FROM produto ORDER BY id_produto desc', function(err, rows, fields) {
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

//Ler dados de um produto através do seu ID (GET)
function readID(req, res) {
    const id_produto = req.sanitize('id').escape();
    const post = { id_produto: id_produto };
    const query = connect.con.query('SELECT * FROM produto WHERE id_produto = ?', post, function(err, rows, fields) { 
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

//Registo de um novo produto (POST)
function save(req, res) {
    const nome = req.sanitize('nome').escape();
    const descricao = req.sanitize('descricao').escape();
    const receita_medica = req.sanitize('receita_medica').escape();
    var query = "";
    //Validations
    req.checkBody("nome", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("descricao", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);  
    req.checkBody("receita_medica", "Escolha apenas uma opção.").matches(/^[0-1]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome != "NULL" && descricao != "NULL" && receita_medica != "NULL") {
            var post = { 
                nome: nome, 
                descricao: descricao, 
                receita_medica: receita_medica,   
            };
            //Create & Execute a query on database to insert present data from post
            query = connect.con.query('INSERT INTO produto SET ?', post, function(err, rows, fields) {
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

//Delete Lógico (PUT)
function deleteL(req, res) {
    const update = [0, req.sanitize('id').escape()];
    const query = connect.con.query('UPDATE produto SET ativo = ? WHERE id_produto = ?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

//Delete físico (DELETE)
function deleteP(req, res) {
    const update = req.sanitize('id').escape();
    const query = connect.con.query('DELETE FROM produto WHERE id_produto = ?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

module.exports = {
    read: read,
    readID: readID,
    save: save,
    deleteL: deleteL,
    deleteP: deleteP,
};