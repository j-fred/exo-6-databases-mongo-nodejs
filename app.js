const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const port = 3009;

app.use("/static", express.static('static'));
var tab=[];

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  database.db("jfred").collection("personnages").find().toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    tab=result;
    database.close();
  });
});

/**
 * Route vers index.html 
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


/**
 * Route vers index.html 
 */
app.get('/find', function (req, res) {
  res.json(tab);
});




/**
 * Port d'écoute du serveur
 */
const listener = app.listen(port, function () {
    console.log('Serveur demarré sur le port ' + listener.address().port);
})