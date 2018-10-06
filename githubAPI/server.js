const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('API is working!');
});
app.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: req.body.password
    }
    var encodedUser = new Buffer(`${user.username}:${user.password}`);
    encodedUser = encodedUser.toString('base64');
    var options = {
        url: 'https://api.github.com/user',
        headers: {
            'Authorization': 'Basic ' + encodedUser,
            'User-Agent': 'request'
        }
    };
    request(options, function (error, response, body) {
        if (error) {
            res.send({ error: true, error: error });
        } else {
            res.send({ error: false, statusCode: response.statusCode, response: response, body: body });
        }
    });
});


const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));