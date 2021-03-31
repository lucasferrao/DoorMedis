const port = process.env.PORT || 8080;

//Configure the server
const express = require('express'); //express: routing
const app = express();
const cors = require("cors");
const expressValidator = require('express-validator');
app.use(expressValidator());
const expressSanitizer = require('express-sanitizer');
app.use(expressSanitizer());
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(cors({
  exposedHeaders: ['Location'],
}));

//Access static files
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

//App running on localhost:8080 || 127.0.0.1:8080
app.listen(port, function(err){
  if (!err) {
    console.log("DoorMedis is listening on port " + port + ".");
  } else {
    console.log(err);
  }
});

app.use(cookieParser());
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

//Export modules & incorporate loader.js file
module.exports = app;
require('./routes/main.route.js');