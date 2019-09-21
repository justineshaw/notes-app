var express = require('express');
var router = express.Router();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if JSON file is empty)
db.defaults({ count: 0, notes: []})
  .write()

/* GET notes. */
router.get('/', function(req, res, next) {
  let notes = db.get('notes').value();
  res.send(notes);
});

/* POST notes. */
router.post('/', function (req, res, next) {
  let count = db.get('count') + 1
  db.get('notes')
    .push({ id: count, message: req.body.message })
    .write()
  db.update('count', n => n + 1)
    .write()
});

/* UPDATE notes. */
router.put('/', function (req, res, next) {
  db.get('notes')
    .find({ id: parseInt(req.body.id) })
    .assign({ message: req.body.message })
    .write()
});

module.exports = router;
