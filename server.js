var express = require('express')
var app = express()
var multer = require('multer')
var cors = require('cors')
var path = require('path')

var whitelist = [
  'https://react-music-sampler.herokuapp.com/',
  'https://react-music-sampler.herokuapp.com',
  'http://localhost:3000/',
  'http://localhost:3000',
]

var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin: ', origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.options('*', cors()) // include before other routes
app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'public/')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

var upload = multer({ storage }).single('file')

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log('trying to upload....')
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)
  })
})

app.listen(8000, function() {
  console.log('Running on port 8000 :)')
})
