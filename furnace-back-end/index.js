const express = require('express');
const bodyParser = require('body-parser');
const express_app = express();
const http_server = require('http').Server(express_app);

express_app.use(bodyParser.json());
express_app.use(bodyParser.urlencoded({ extended: false }));
express_app.use(express.static("__dirname"));

require('dotenv').config();

console.log(process.env.USER_PW);

//const { setUpController } = require('./controller/setup-controller');


express_app.get('/', function (req, res) {

    res.send('Server works!');

});

require('./controller/entity')(express_app);

http_server.listen(process.env.PORT || 2929, function () {

    console.log('Server listening on localhost:' + (process.env.PORT || 2929) + ' port');
    console.log("---server started---");

})