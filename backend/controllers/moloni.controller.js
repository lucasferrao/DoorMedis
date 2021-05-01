var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moloni_access_token;
var moloni_refresh_token;
var companyID = '179319';
var fornecedores = [];
var dadosFornecedor;

function obterToken() {
    var url = "https://api.moloni.pt/v1/grant/?grant_type=password&client_id=doormedis&client_secret=9b83a502ef2b0a8733192c45fcfdf9dea9d4fc6c&username=a89262@alunos.uminho.pt&password=isi2021";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + " moloni_refresh_token: " + moloni_refresh_token);
}

function obterFornecedor() {
    obterToken();
    console.log("foi buscar o access_token");
    var options = {
        method: 'GET',
        url: 'https://api.moloni.pt/v1/suppliers/getAll',
        qs: { access_token: '' + moloni_access_token },
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: { company_id: '179319' }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        //res.status(200).send(body);
        dadosFornecedor = JSON.parse(response.body);
        for (var i = 0; i < dadosFornecedor.length; i++) {
            fornecedores.push(dadosFornecedor[i].fornecedor_id);
        }
        console.log(dadosFornecedor);
        console.log(fornecedores);
    });

}


module.exports = {
    obterToken: obterToken,
    obterFornecedor: obterFornecedor,
}