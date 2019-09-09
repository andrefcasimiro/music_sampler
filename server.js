var express = require('express')
var app = express()
var multer = require('multer')
var cors = require('cors')
var path = require('path')
var proxy = require('http-proxy-middleware')

var whitelist = [
  'https://react-drum-machine-sampler.herokuapp.com/',
  'https://react-drum-machine-sampler.herokuapp.com',
  'https://andrefcasimiro.github.io',
  'https://andrefcasimiro.github.io/',
  'http://localhost:3000/',
  'http://localhost:3000',
]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use('/upload', proxy({
  target: 'https://react-drum-machine-sampler.herokuapp.com',
  changeOrigin: true,
}));

app.use('/upload', proxy({
  target: 'http://localhost:3000/',
  changeOrigin: true,
}));

app.use('*', proxy({
  target: 'https://react-drum-machine-sampler.herokuapp.com',
  changeOrigin: true,
}));


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

app.post('/upload', function (req, res) {
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
  console.log('Running on port 8000 :)')
})
