db.request.remove({});

db.request.insertOne('{
	"caseNumber": "1234567890",
        "zipCode": "48439",
        "requestLeniency": false,
        "firstName": "Andy",
        "lastName": "Smith",
        "issueDate": "04/01/2018"
        }');
        
db.request.insertOne('{
	"caseNumber": "987654320",
        "zipCode": "48185",
        "requestLeniency": true,
        "firstName": "Emily",
        "lastName": "Juarez",
        "issueDate": "04/07/2018"
        }');