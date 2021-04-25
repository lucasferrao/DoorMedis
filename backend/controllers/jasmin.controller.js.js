const request = require('request');
var token_jasmin;
global.fetch = require("node-fetch");

function getTokenJasmin() {
    var url = 'https://identity.primaverabss.com/core/connect/token';
    var headers = {
        "Accept": "application/json"
    };

    var form = {
        "client_id": "",
        "client_secret": "",
        "grant_type": "client_credentials",
        "scope": "application",
    };

    return new Promise(function (resolve, reject, request) {
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


module.exports = {
    getTokenJasmin: getTokenJasmin
};