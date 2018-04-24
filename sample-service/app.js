'use strict';

const express = require('express');
const app = express();
const data = require('./data');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', data);

app.get('/hello', function (req, res) {
	res.send('Bazinga!');
});

const server = app.listen(8181, function () {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port)
});

