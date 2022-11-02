var express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'storage/' });
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 },
]);
router.post('/form-save-db', cpUpload, function (req, res) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
  console.log(req.files);
});


module.exports = router;
