var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jasmin_access_token;
var jasmin_refresh_token;
//global.fetch = require("node-fetch");
//const querystring = require('querystring');

/*
function obterToken() {
  var url = "https://my.jasminsoftware.com/api/resource?client_id=DOORMEDIS21&client_secret=2ffdff71-9d70-46be-91e1-04293e38dd9e&account=252922&subscription=252922-0001";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  var jsonStructure = '[' + xmlHttp.responseText + ']';
  var json = JSON.parse(jsonStructure);
  jasmin_access_token = json[0]["access_token"];
  jasmin_refresh_token = json[0]["refresh_token"];
  console.log("jasmin_access_token: " + jasmin_access_token + " jasmin_refresh_token: " + jasmin_refresh_token);
}
*/


function obterToken(cb) {
  request(
    {
      url: "https://identity.primaverabss.com/core/connect/token",
      method: "POST",
      auth: {
        user: "DOORMEDIS",
        pass: "796d2366-05f9-489c-b11d-8af6fec75a7e",
      },
      form: {
        grant_type: "client_credentials",
        scope: "application",
      },
    },
    function (err, res) {
      if (res) {

        const json = JSON.parse(res.body);
        cb(json.access_token);
    console.log("AAAAAAAAAAAAAAA");

        jasmin_access_token = json.access_token;
        console.log(jasmin_access_token);
      } else {
        console.log("Could not obtain acess token.");
        cb(false);
      }
    }
  );
}

/*function obterToken() {
  var url = 'https://identity.primaverabss.com/core/connect/token';
  //var url = 'https://my.jasminsoftware.com/api/';
  var headers = {
    "Accept": "application/json"
  };

  var form = {
    "client_id": "DOORMEDIS21",
    "client_secret": "2ffdff71-9d70-46be-91e1-04293e38dd9e",
    "account": "252922",
    "subscription": "252922-0001",
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
}*/
//Artigos de inventário [ https://my.jasminsoftware.com/253324/253324-0001/#/materialscore/materialsItems/list?listname=MaterialsItems ]
function obterArtigosInventario(req, res) {
  obterToken(function (token) {
    console.log(token);
    if (token) {
      let options = {
        method: 'GET',
        url: "https://my.jasminsoftware.com/api/253324/253324-0001/materialsCore/materialsItems",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      request(options, function (error, response, body) {
        console.log(response.statusCode)
        res.send(JSON.parse(body));
        console.log("OKKKKKKKKK");
      })
    } else {
      res.send("erro");
    }
  });
}

/**
 * Lista de encomendas relativa ao cliente
 * @param {*} req 
 * @param {*} res 
 */
function obterListaEncomendas(req, res) {
  obterToken(function (token) {
    console.log(token);
    if (token) {
      let options = {
        method: 'GET',
        url: "https://my.jasminsoftware.com/api/253324/253324-0001/shipping/deliveries",
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

function obterProdutosFarmacia(req, res) {
  obterToken(function (token) {
    console.log(token);
    if (token) {
      let options = {
        method: 'GET',
        url: "https://my.jasminsoftware.com/api/253324/253324-0001/salesCore/salesItems",
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


module.exports = {
  obterToken: obterToken,
  obterArtigosInventario: obterArtigosInventario,
  obterListaEncomendas: obterListaEncomendas,
  obterProdutosFarmacia: obterProdutosFarmacia
};