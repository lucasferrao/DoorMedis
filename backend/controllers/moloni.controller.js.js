var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moloni_access_token;
var moloni_refresh_token;
var companyID = '179319';

function getTokenMoloni() {
    var url = 'https://api.moloni.pt/v1/grant/?grant_type=password&client_id=doormedis&client_secret=9b83a502ef2b0a8733192c45fcfdf9dea9d4fc6c&username=a89262@alunos.uminho.pt&password=isi2021';
    var headers = {
    "Accept": "application/json"
    };
    return new Promise(function (resolve, reject) {
        request.post({ url: url, headers: headers }, function(error, res, body) {
            var t = JSON.parse(body);
            moloni_access_token = t.access_token;
            moloni_refresh_token = t.refresh_token;
            if (!error && res.statusCode == 200) {
                resolve(moloni_access_token);
                console.log(moloni_access_token);
            //resp.send(JSON.parse(body))
            } else {
                reject(error);
            };
        });
    });
}

function getToken(callback) {
    let options = {
        url: 'https://api.moloni.pt/v1/grant/?grant_type=password&client_id=doormedis&client_secret=9b83a502ef2b0a8733192c45fcfdf9dea9d4fc6c&username=a89262@alunos.uminho.pt&password=isi2021'
    }
        request.get(options, (err, res) => {
         if(!err && res.statusCode == 200) {
             callback({
                 'access_token': JSON.parse(res.body).access_token
             });
         } else {
             callback({
                 'statusCode': res.statusCode,
                 'body': JSON.parse(res.body)
             })
         }
     } 
     ) 
}

function getCompany(){

}

async function getFornecedor(fornecedor){
    let token = await getToken();
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/suppliers/getAll/?access_token=' + token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            qty: '50',
            offset: '0'
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            var fornecedorID;
            if (!error && response.statusCode == 200) {
                var dados = JSON.parse(response.body);
                for (var i = 0; i < dados.length; i++) {
                    if(dados[i].code == fornecedor){
                        fornecedorID = dados[i].address_id;
                    }
                }
                resolve(fornecedorID);
            } else {
                reject(error);
            };
        });
    });
}

async function getCategorias(categoria){
    let token = await getToken();
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/productCategories/getAll/?access_token=' + token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            parent_id: '0'
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            var categoriaID;
            if (!error && response.statusCode == 200) {
                var dados = JSON.parse(response.body);
                for (var i = 0; i < dados.length; i++) {
                    if(dados[i].code == categoria){
                        categoriaID = dados[i].address_id;
                    }
                }
                resolve(categoriaID);
            } else {
                reject(error);
            };
        });
    });
}

async function gerarFaturaFornecedor(encomenda,maquinhaIDmoloni){
    let token = await getTokenMoloni();
    var estado = true;
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/invoiceReceipts/insert/?access_token='+ token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            date: new Date().toISOString(),
            document_set_id: 275975,     // --------------------- PRECISA SER MUDADO ------------------------
            customer_id: 26628724,      // --------------------- PRECISA SER MUDADO ------------------------
            alternate_address_id: maquinhaIDmoloni,
            status: 0,
            products: encomenda
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(true);
            } else {
                reject(error);
            };
        });
    });
}


async function gerarEncomenda(encomenda,maquinhaIDmoloni){ //MUDIFICAR PARAMETROS 
    let token = await getTokenMoloni();
    var estado = true;
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/supplierPurchaseOrder/getAll/?access_token='+ token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            date: new Date().toISOString(),
            document_set_id: 275975,     // --------------------- PRECISA SER MUDADO ------------------------
            customer_id: 26628724,      // --------------------- PRECISA SER MUDADO ------------------------
            alternate_address_id: maquinhaIDmoloni,
            status: 0,
            products: encomenda
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(true);
            } else {
                reject(error);
            };
        });
    });
}




module.exports = {
    getTokenMoloni: getTokenMoloni,
    getToken: getToken,
    getFornecedor: getFornecedor,
    getCategorias: getCategorias,
    
}