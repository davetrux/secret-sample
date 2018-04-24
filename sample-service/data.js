'use strict';

const express = require('express');
const router = express.Router();
const Requests = require('./data');

module.exports = router;

credstash.getSecret({name: 'sample-db-user'})
	.then(password => {
		const conn = 'mongodb://service:' + password + '@' + 'mongo:27017/sample';
		mongoose.connect(conn);
	}).catch(err => {
	throw err
	});

router.get('/', function(req, res) {

	Requests.find({})
		.then(records => {
			res.status(200).json(records)
		})
		.catch(error => {
			console.log(error);
			res.status(500)
		})
});