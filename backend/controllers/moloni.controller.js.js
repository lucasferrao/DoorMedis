var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moloni_access_token;
var moloni_refresh_token;

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
            //resp.send(JSON.parse(body))
            } else {
                reject(error);
            };
        });
    });
}

function getToken() {
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
    
function getRefreshToken(){
    var url = "https://api.moloni.pt/v1/grant/?grant_type=refresh_token&client_id=Food2Go&client_secret=9f08bc1bcd476408f09d152a6f04947c1eae9515&refresh_token=" + moloni_refresh_token;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + " moloni_refresh_token: " + moloni_refresh_token);
}

async function getMedicamentoMoloni(medicamento){
    let token = await getTokenMoloni();
    var estado = true;
    var options = {
        method: 'POST',
        url: 'https://api.moloni.pt/v1/customerAlternateAddresses/getAll/?access_token='+ token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            company_id: '179319',
            customer_id: '26628724'
        }
    };
    return new Promise(function (resolve, reject) {
        request(options, function(error, response, body) {
            var medicamentoMoloni;
            if (!error && response.statusCode == 200) {
                var dados = JSON.parse(response.body);
                for (var i = 0; i < dados.length; i++) {
                    if(dados[i].code == medicamento){
                        medicamentoMoloni = dados[i].address_id;
                    }
                }
                resolve(medicamentoMoloni);
            } else {
                reject(error);
            };
        });
    });
}


module.exports = {
    getTokenMoloni: getTokenMoloni,
    getToken: getToken,
    getRefreshToken: getRefreshToken,
    getMedicamentoMoloni: getMedicamentoMoloni
}