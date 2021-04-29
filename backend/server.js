const express = require('express');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

//load global libraries
const cors = require('cors');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

//iniciate application
var app = express();
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(expressValidator());
app.listen(port, function (err) {
    if (!err) {
        console.log('Your app is listening on ' + host + ' and port ' + port);
    } else { console.log(err); }
});

//force libraries use
app.use(cors());
app.use(cookieParser());

//force cookies use
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie('cookieName', randomNumber, {
            maxAge: 900000,
            httpOnly: true,
            secure: true
        });
        console.log('cookie created successfully');
    } else { // yes, cookie was already present
        console.log('cookie exists', cookie);
    }
    next(); // <-- important!
});

/*
// Build the auth URL
const authUrl =
  'https://app.hubspot.com/oauth/authorize' +
  '?client_id=${encodeURIComponent(CLIENT_ID)}' +
  '&scope=${encodeURIComponent(SCOPES)}' +
  '&redirect_uri=${encodeURIComponent(REDIRECT_URI)}';

// Redirect the user
app.get('/', (req, res) => {
    return res.redirect(authUrl);
})
*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-AllowMethods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//express-sessions code
module.exports = app;
require('./routes/main.route.js');