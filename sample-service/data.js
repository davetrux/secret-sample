'use strict';

const express = require('express');
const router = express.Router();
const Requests = require('./model');
const Credstash = require('nodecredstash');
const credstash = new Credstash({awsOpts: {region: 'us-east-1'}});
const mongoose = require('mongoose');

module.exports = router;

credstash.getSecret({name: 'sample-db-user'})
	.then(password => {
		const conn = 'mongodb://service:' + password + '@' + 'mongo:27017/sample';
		console.log(conn);
		mongoose.connect(conn);
		console.log('DB Connected')
	}).catch(err => {
		console.log(err);
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