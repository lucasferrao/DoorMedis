var request = require("request");

var options = {
  method: 'GET',
  url: 'https://api.hubapi.com/oauth/v1/access-tokens/token',
  headers: {accept: 'application/json'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});