var express = require('express')
var app = express()
var multer = require('multer')
var path = require('path')
var cors = require('cors')

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'build/index.html'));
  })
}

console.log('using: ', __dirname + '/public')

var whitelist = [
  'https://react-drum-machine-sampler.herokuapp.com/', 
  'https://react-drum-machine-sampler.herokuapp.com', 
  'http://react-drum-machine-sampler.herokuapp.com/',
  'http://react-drum-machine-sampler.herokuapp.com',
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
  }
}

app.use(cors(corsOptions))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})


var upload = multer({ storage }).single('file')

app.post('/upload', cors(corsOptions), function (req, res) {
  console.log('uploading...')
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
