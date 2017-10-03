'use strict';
const config = require('config');
const HelloSignOptions = config.get('HelloSignOptions');
var hellosign = require('hellosign-sdk')({key: HelloSignOptions.key});

/**
* Render home page
**/
module.exports.main = (req, res, next) => {
  res.render('pages/home', {
  });
}

module.exports.embeddedSigning = (req, res, next) => {
  var response_url;
  var options = {
    test_mode : 1,
    clientId : HelloSignOptions.client_id,
    subject : HelloSignOptions.email_subject,
    message : HelloSignOptions.email_message,
    signers : [
      {
        email_address : HelloSignOptions.email_address,
        name : HelloSignOptions.user_name
      }
    ],
    file_url : ['https://app.box.com/s/thlku6i5xve5pkuv5l2hednurxs3po36']
  };

  hellosign.signatureRequest.createEmbedded(options)
  .then(function(response){
    var signatureId = response.signature_request.signatures[0].signature_id;
    response_url = hellosign.embedded.getSignUrl(signatureId);
    return hellosign.embedded.getSignUrl(signatureId);
  })
  .then(function(response){
    console.log('URL = ' + response.embedded.sign_url);
    response_url = response.embedded.sign_url;
  })
  .catch(function(err){
    //catch error'
    console.log('Err: ' + err);
  });
}


/**
* This function sends a request to sign to the user specifies in signers array
**/
module.exports.sentToSign = (req, res, next) => {
  console.log('Options: ' + HelloSignOptions.email_address);
  var options = {
    test_mode : 1,
    template_id : HelloSignOptions.template_id,
    title : HelloSignOptions.title,
    subject : HelloSignOptions.email_subject,
    message : HelloSignOptions.email_message,
    signers : [
      {
        email_address : HelloSignOptions.email_address,
        name : HelloSignOptions.user_name,
        role : HelloSignOptions.user_role
      }
    ]
  };

  hellosign.signatureRequest.sendWithTemplate(options)
  .then(function(response){
    //parse response
  })
  .catch(function(err){
    //catch error
    console.log('Err: ' + err);
  });

  res.render('pages/success', {
  });
}
