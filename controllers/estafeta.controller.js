//const jsonMessagesPath = "../assets/jsonMessages/";
//const jsonMessages = require(jsonMessagesPath + "bd");
//const connect = require('../config/connectMySQL');

//Ler dados de um estafeta (GET)
function read(req, res) {
    const query = connect.con.query('SELECT * FROM estafeta ORDER BY id_estafeta desc', function(err, rows, fields) {
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

//Ler dados de um estafeta através do seu ID (GET)
function readID(req, res) {
    const id_estafeta = req.sanitize('id').escape();
    const post = { id_estafeta: id_estafeta };
    const query = connect.con.query('SELECT * FROM estafeta WHERE id_estafeta = ?', post, function(err, rows, fields) { 
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

//Registo de um novo estafeta (POST)
function save(req, res) {
    const nome = req.sanitize('nome').escape();
    const contacto = req.sanitize('contacto').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    //const morada = req.sanitize('morada').escape();
    const avaliacao = req.sanitize('avaliacao').escape();
    const nif = req.sanitize('nif').escape();
    const ativo = 0; 
    var query = "";
    //Validations
    req.checkBody("nome", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("contacto", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("email", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("password", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    //req.checkBody("morada", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("avaliacao", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome != "NULL" && contacto != "NULL" && email != "NULL" && password != "NULL" && /*morada != "NULL" && */ avaliacao != "NULL" && nif != "NULL" && ativo != "NULL") {
            var post = { 
                nome: nome, 
                contacto: contacto, 
                email: email,
                password: password,
                //morada: morada,
                avaliacao: avaliacao,
                nif: nif,    
            };
            //Create & Execute a query on database to insert present data from post
            query = connect.con.query('INSERT INTO estafeta SET ?', post, function(err, rows, fields) {
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


//Atualizar um estafeta (PUT)
function update(req, res) {
    const id_estafeta = req.sanitize('id_estafeta').escape();
    const nome = req.sanitize('nome').escape();
    const contacto = req.sanitize('contacto').escape();
    const email = req.sanitize('email').escape();
    const password = req.sanitize('password').escape();
    //const morada = req.sanitize('morada').escape();
    const avaliacao = req.sanitize('avaliacao').escape();
    const nif = req.sanitize('nif').escape();
    const ativo = req.sanitize('ativo').escape();
    //Validations
    req.checkParams("id_cliente", "Insira o id de estafeta válido.").matches(/^[0-9]+$/i);
    req.checkBody("contacto", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("email", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("password", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    //req.checkBody("morada", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("avaliacao", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("nif", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("ativo", "Escolha apenas uma opção.").matches(/^[0-1]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_estafeta != "NULL" && nome != "NULL" && contacto != "NULL" && email != "NULL" && password != "NULL" && morada != "NULL" && avaliacao != "NULL" && nif != "NULL" && ativo != "NULL") {
            const update = [id_cliente, nome, contacto, email, password, morada, nif, ativo];
            const query = connect.con.query('UPDATE estafeta SET ? WHERE id_estafeta=?', update, function(err, rows, fields) {
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

//Delete Lógico (PUT)
function deleteL(req, res) {
    const update = [0, req.sanitize('id').escape()];
    const query = connect.con.query('UPDATE estafeta SET ativo = ? WHERE id_estafeta = ?', update, function(err, rows, fields) {
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
    const query = connect.con.query('DELETE FROM estafeta WHERE id_estafeta = ?', update, function(err, rows, fields) {
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
    update: update,
    deleteL: deleteL,
    deleteP: deleteP,
};