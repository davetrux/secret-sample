db.samplerequest.remove({});

db.samplerequest.insertOne({"caseNumber": "1234567890", "zipCode": "48439", "requestLeniency": true, "firstName": "Andy", "lastName": "Smith", "issueDate": "04/01/2018"});
        
db.samplerequest.insertOne({ "caseNumber": "987654320", "zipCode": "48185", "requestLeniency": false, "firstName": "Emily", "lastName": "Juarez", "issueDate": "04/07/2018" });