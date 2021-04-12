//const jsonMessagesPath = "../assets/jsonMessages/";
//const jsonMessages = require(jsonMessagesPath + "bd");
//const connect = require('../config/connectMySQL');

//Ler dados de um stock (GET)
function read(req, res) {
    const query = connect.con.query('SELECT * FROM stock ORDER BY id_stock desc', function(err, rows, fields) {
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

//Ler dados de um stock através do seu ID (GET)
function readID(req, res) {
    const id_stock = req.sanitize('id').escape();
    const post = { id_stock: id_stock };
    const query = connect.con.query('SELECT * FROM stock WHERE id_stock = ?', post, function(err, rows, fields) { 
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

//Registo de um novo stock (POST)
function save(req, res) {
    const quantidade = req.sanitize('quantidade').escape();
    const id_produto = req.sanitize('id_produto').escape();
    const id_farmacia = req.sanitize('id_farmacia').escape(); 
    var query = "";
    //Validations
    req.checkBody("quantidade", "Por favor, introduza texto.").matches(/^[a-zA-Z0-9&@.$%\-,():;` ]+$/);
    req.checkBody("id_produto", "Insira apenas números.").matches(/^[0-9]+$/i);
    req.checkBody("id_farmacia", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (quantidade != "NULL" && id_produto != "NULL" && id_farmacia != "NULL") {
            var post = { 
                quantidade: quantidade, 
                id_produto: id_produto, 
                id_farmacia: id_farmacia,
            };
            //Create & Execute a query on database to insert present data from post
            query = connect.con.query('INSERT INTO stock SET ?', post, function(err, rows, fields) {
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


//Atualizar um stock (PUT)
function update(req, res) {
    const id_stock = req.sanitize('id_stock').escape();
    const quantidade = req.sanitize('quantidade').escape();
    //Validations
    req.checkParams("id_stock", "Insira o id de farmacia válido.").matches(/^[0-9]+$/i);
    req.checkBody("quantidade", "Insira apenas números.").matches(/^[0-9]+$/i);
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_stock != "NULL" && quantidade != "NULL") {
            const update = [id_stock, quantidade];
            const query = connect.con.query('UPDATE stock SET ? WHERE id_stock=?', update, function(err, rows, fields) {
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