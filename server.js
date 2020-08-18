const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const morgan = require('morgan');
var winston = require('winston');

const bodyParser = require('body-parser');
const app = express()

// app.use(morgan('combined'))
app.use(cors(corsOptions))
app.use(helmet())
app.use(bodyParser.json())

var whitelist = ['http://example1.com', 'http://example2.com', 'https://russellbot.github.io/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/', (req, res) => {
  res.cookie('session', '1', { httpOnly: true })
  res.cookie('session', '1', { secure: true })
  res.set({
    'Content-Security-Policy': "script-src 'self' 'https.//apis.google.com'"
  })
  res.send('Hello World!')
});

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  // winston.log('info', userInput);
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))