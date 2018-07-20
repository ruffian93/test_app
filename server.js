var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var request = require('request');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
});

app.get('/api/select', (req, res) => {
  con.query("SELECT * FROM list", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/add', (req, res) => {
  if (!req.body.url || req.body.url.length < 10) {
    res.json({error:'url'});
  }

  var apiKey = 'acc_1b4771393dd623a',
    apiSecret = '50446715d824c1de586b51394b11ecf7';

  request.get("http://api.imagga.com/v1/tagging?url="+encodeURIComponent(req.body.url), function(err, httpResponse, body) {
    let json_body = JSON.parse(body);
    if (json_body.results && json_body.results.length) {
      con.query("INSERT INTO list SET ?", {json:JSON.stringify(json_body.results[0])}, (err, result) => {
        if (err) throw err;
        res.json({
          uid: result.insertId,
          value: json_body.results[0]
        });
      });
    }
    else {
      res.json({error:json_body});
    }
  })
  .auth(apiKey, apiSecret, true);
});

app.listen(1337);