var express = require('express');
var router = express.Router();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fileName = process.env.NODE_ENV === "test" ? "test-db.json" : "db.json";
const adapter = new FileSync(fileName);
const db = low(adapter)

const { check, validationResult } = require('express-validator');

// Set some defaults (required if JSON file is empty)
db.defaults({ count: 0, notes: []})
  .write()

/* GET note by id. */
router.get('/:id', [
  check('id').isInt({ min: 1, max: db.get('count') }).withMessage("Error: The requested note doesn't exist."),
], function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  
  let note = db.get('notes').find({ id: parseInt(req.params.id) }).value();
  return res.status(200).json({ message: note });
});

/* GET all notes. */
router.get('/', function(req, res, next) {
  let notes = db.get('notes').value();
  res.send(notes);
  // res.json(notes);
});

/* POST a note. */
router.post('/', [
  check('message').not().isEmpty().withMessage('The note cannot be an empty string.')
] , function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({ errors: errors.array() })
    }

  let message = req.body.message 
  let count = db.get('count') + 1
  const newNote = db.get('notes')
    .push({ id: count, message: message })
    .write();
  db.update('count', n => n + 1)
    .write();

  return res.status(200).json({ message: "Success!" });
});

/* UPDATE notes. */
router.put('/', [
  check('message').not().isEmpty().withMessage('The note cannot be an empty string.'),
], function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() })
  }

  let id = parseInt(req.body.id)
  let message = req.body.message 
  db.get('notes')
    .find({ id: id })
    .assign({ message: message })
    .write();
  
  return res.status(200).json({ message: "Success!" });
});

module.exports = router;
