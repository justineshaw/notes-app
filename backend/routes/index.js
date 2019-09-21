var express = require('express');
var router = express.Router();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ notes: []})
  .write()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res, next) {
  let posts = db.get('posts').map('title').value();
  console.log(posts);
  res.send('API is working properly & ' + posts[0]);
});

module.exports = router;
