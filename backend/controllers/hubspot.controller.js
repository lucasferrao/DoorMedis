var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var hubspot_access_token;
var hubspot_refresh_token;
var request = require("request");

/*
var options = {
  method: 'GET',
  url: 'https://api.hubapi.com/oauth/v1/access-tokens/token',
  headers: { accept: 'application/json' }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

function obterTokenHubspot() {
  var url = 'https://api.hubapi.com/oauth/v1/token';
    var headers = {
      "Accept": "application/json"
    };

    var form = {
      "client_id": "976f1267-3d7f-410a-9d58-cfa936c727ad",
      "client_secret": "848349fa-0d47-43b2-9056-228c5f15a6b7",
      "redirect_uri": "https://www.hubspot.com/",
      "code": "2792a83e-38f2-45b3-8cec-b5fa64806400",
    };
    
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", url, false); // false for synchronous request
xmlHttp.send(null);
var jsonStructure = '[' + xmlHttp.responseText + ']';
var json = JSON.parse(jsonStructure);
hubspot_access_token = json[0]["access_token"];
hubspot_refresh_token = json[0]["refresh_token"];
console.log("hubspot_access_token: " + hubspot_access_token + " hubspot_refresh_token: " + hubspot_refresh_token);


// Build the auth URL
const authUrl =
  'https://app.hubspot.com/oauth/authorize' +
  '?client_id=${encodeURIComponent(976f1267-3d7f-410a-9d58-cfa936c727ad)}' +
  '&scope=${encodeURIComponent(SCOPES)}' +
  '&redirect_uri=${encodeURIComponent(REDIRECT_URI)}';

// Redirect the user
//return res.redirect(authUrl);

/*app.get('/oauth-callback', async (req, res) => {
  if (req.query.code) {
    // Handle the received code
  }
});
const formData = {
  grant_type: 'authorization_code',
  client_id: "976f1267-3d7f-410a-9d58-cfa936c727ad",
  client_secret: "848349fa-0d47-43b2-9056-228c5f15a6b7",
  redirect_uri: "https://www.hubspot.com/",
  code: "2792a83e-38f2-45b3-8cec-b5fa64806400" //req.query.code
};

request.post('https://api.hubapi.com/oauth/v1/token', { form: formData }, (err, data) => {
  // Handle the returned tokens
});

module.exports = {
    //obterTokenHubspot: obterTokenHubspot,
  }*/