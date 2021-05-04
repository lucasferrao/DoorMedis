const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var jasmin_access_token;
var jasmin_refresh_token;
global.fetch = require("node-fetch");
const querystring = require('querystring');

function obterToken(cb) {
  request(
    {
      url: "https://identity.primaverabss.com/core/connect/token",
      method: "POST",
      auth: {
        user: "DOORMEDIS21",
        pass: "a99834c0-bc1b-4d06-94e4-acbc0c7309c0",
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
        console.log(json.access_token);
      } else {
        console.log("Could not obtain access token.");
        cb(false);
      }
    }
  );
}

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

function obterListaEncomendas(req, res) {
  obterToken(function (token) {
    console.log(token);
    if (token) {
      let options = {
        method: 'GET',
        url: "https://my.jasminsoftware.com/252922/252922-0001/shipping/deliveries",
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
        url: "https://my.jasminsoftware.com/252922/252922-0001/salesCore/salesItems",
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
  obterArtigosInventario: obterArtigosInventario,
  obterListaEncomendas: obterListaEncomendas,
  obterProdutosFarmacia: obterProdutosFarmacia
};