var express = require('express')
var app = express()
var multer = require('multer')
var cors = require('cors')

app.use(express.static(__dirname + '/public'));

console.log('using: ', __dirname + '/public')
app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

console.log('storage: ', storage)

var upload = multer({ storage }).single('file')

app.post('/upload', function (req, res) {
  console.log('req: ', req)
  console.log('res: ', res)
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)
  })
})

app.listen(8000, function() {
  console.log('Running on port 8000')
})
