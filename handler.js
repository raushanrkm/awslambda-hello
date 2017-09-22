'use strict';
var AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();

var tablename= "UserDetail";

var params = {
    TableName:tablename,
    Item:{
        "accountnumber": 123,
        "name": "raushan",
        "info":{
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

module.exports.hello = (event, context, callback) => {

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});

docClient.get({TableName:tablename,
                Key:{"accountnumber": 123,
                      "name": "raushan"
                      }
                }, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});




 var data= JSON.parse(event.body);







   const response = {
    statusCode: 200,
    "Content-Type": 'application/json',
     body: JSON.stringify({
     message: 'this response back',
     input: data,
  }),
      // body:event.body
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
