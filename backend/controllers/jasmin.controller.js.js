const request = require('request');
var token_jasmin;
global.fetch = require("node-fetch");

function getTokenJasmin() {
    var url = 'https://identity.primaverabss.com/core/connect/token';
    var headers = {
        "Accept": "application/json"
    };

    var form = {
        "client_id": "DoorMedis",
        "client_secret": "543a8ef4-bba9-46e8-84cb-6c14501b8496",
        "grant_type": "client_credentials",
        "scope": "application",
    };

    return new Promise(function (resolve, reject) {
        request.post({ url: url, form: form, headers: headers }, function
        (error, res, body) {
            var t = JSON.parse(body);
            token_jasmin = t.access_token;
            if (!error && res.statusCode == 200) {
                resolve(token_jasmin);
                //resp.send(JSON.parse(body))
            } else {
                reject(error);
            };
        });
    })
}

function login(cb) {
    request(
      {
        url: "https://identity.primaverabss.com/core/connect/token",
        method: "POST",
        auth: {
          user: "DoorMedis",
          pass: "543a8ef4-bba9-46e8-84cb-6c14501b8496",
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
        } else {
          console.log("Could not obtain acess token.");
          cb(false);
        }
      }
    );
  }
  
  //Artigos de inventário [ https://my.jasminsoftware.com/252583/252583-0001/#/materialscore/materialsItems/list?listname=MaterialsItems ]
  function getArtigosInventario(req, res) {
    login(function (token) {
      if (token) {
          let options = {
              method: 'GET',
              url: "https://my.jasminsoftware.com/252584/252584-0001/materialsCore/materialsItems",
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
    getTokenJasmin: getTokenJasmin,
    getArtigosInventario: getArtigosInventario  
};