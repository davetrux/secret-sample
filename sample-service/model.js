'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
	caseNumber: String,
	zipCode: String,
	requestLeniency: Boolean,
	firstName: String,
	lastName: String,
	issueDate: String
}, { collection: 'samplerequest' });

const requests = mongoose.model('samplerequest', requestSchema);

// make this available to our users in our Node applications
module.exports = requests;