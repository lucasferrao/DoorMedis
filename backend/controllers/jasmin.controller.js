const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jasmin_access_token;
var jasmin_refresh_token;
global.fetch = require("node-fetch");
const querystring = require('querystring');






//Artigos de inventário [ https://my.jasminsoftware.com/252922/252922-0001/#/materialscore/materialsItems/list?listname=MaterialsItems ]
function obterArtigosInventario(req, res) {
  obterToken(function (token) {
    console.log(token);
    if (token) {
      let options = {
        method: 'GET',
        url: "https://my.jasminsoftware.com/252922/252922-0001/materialsCore/materialsItems",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      request(options, function (error, response, body) {
        console.log(response.statusCode)
        res.send(JSON.parse(body));
      })
    } else {
      res.send("erro");
    }
  });
}


function obterTokenJasmin() {
  var url = 'https://identity.primaverabss.com/core/connect/token';
  var headers = {
    "Accept": "application/json"
  };

  var form = {
    "client_id": "isi2021",
    "client_secret": "ad052a3b-3092-4fc1-bb9c-1135c1c9a514",
    "grant_type": "client_credentials",
    "scope": "application",
  };
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  var jsonStructure = '[' + xmlHttp.responseText + ']';
  var json = JSON.parse(jsonStructure);
  jasmin_access_token = json[0]["access_token"];
  jasmin_refresh_token = json[0]["refresh_token"];
  console.log("jasmin_access_token: " + jasmin_access_token + " jasmin_refresh_token: " + jasmin_refresh_token);
}


module.exports = {
  obterTokenJasmin: obterTokenJasmin,
  obterArtigosInventario: obterArtigosInventario
};