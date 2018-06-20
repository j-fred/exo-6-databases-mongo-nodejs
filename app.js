const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const port = 3009;

app.use("/static", express.static('static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
var tab = [];

MongoClient.connect(url, function (err, database) {
  if (err) throw err;
  database.db("jfred").collection("personnages").find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    tab = result;
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
 * Route pour afficher les documents de la base de donnée
 */
app.get('/find', function (req, res) {
  res.json(tab);
});


/**
 * Route d'ajout d'un doc via le formulaire 
 */
app.post('/add', function (req, res) {
  const nom = req.body.nom;
  const genre = req.body.genre;
  MongoClient.connect(url, function (err, database) {
    var mydoc = {
      name: nom,
      genre: genre
    };
    database.db("jfred").collection("personnages").insertOne(mydoc, function (err, res) {
      if (err) throw err;
      console.log("1 document ajouté");
      database.close();
    });
    res.end("C'est bon");
  });
});


/**
 * Route vers index.html 
 */
app.get('/maj', function (req, res) {
  res.sendFile(__dirname + '/maj.html');
});

/**
 * Route maj d'un doc via le formulaire 
 */
// app.get('/personne/:id', function (req, res) {
//   const _id = req.params.id;
//   const nom = req.body.nom;
//   const genre = req.body.genre;
//   MongoClient.connect(url, function (err, database) {
//     if (err) throw err;
//     database.db("jfred").collection("personnages").find({}).toArray(function (err, result) {
//       if (err) throw err;
//       //console.log(result);
//       tab = result;
//       database.close();
//     });
//   });
//   res.end("doc màj");
// });



/**
 * Route maj d'un doc via le formulaire 
 */
app.post('/personne/:id', function (req, res) {
  const _id = req.params.id;
  const nom = req.body.nom;
  const genre = req.body.genre;
  MongoClient.connect(url, function (err, database) {
    console.log("_id", _id, " | nom", nom, " | genre", genre);
    if (err) throw err;
    var myquery = {
      _id: _id
    };
    var newvalues = {
      $set: {
        name: nom,
        genre: genre
      }
    };
    database.db("jfred").collection("personnages").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document maj");
      database.close();
    });
  });

  res.end("doc màj");
});
/**
 * Port d'écoute du serveur
 */
const listener = app.listen(port, function () {
  console.log('Serveur demarré sur le port ' + listener.address().port);
})