'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	BoxSDKConfig: {
		boxClientId: "",
		boxClientSecret: "",
		boxEnterpriseId: "",
		boxPrivateKeyFileName: "private_key.pem",
		boxPrivateKeyPassword: "password",
		boxPrivateKey: (boxPrivateKeyFileName) => {
			return fs.readFileSync(path.resolve(boxPrivateKeyFileName));
		},
		boxPublicKeyId: "",
	},
	BoxOptions: {
		inMemoryStoreSize: "100",
		expiresAtFieldName: "expiresAt",
		boxPersona1AppUserIdFieldName: "box_persona1_id",
		boxPersona2AppUserIdFieldName: "box_persona2_id",
		persona1: "Persona 1",
		persona2: "Persona 2"
	},

	Auth0Config: {
		domain: "",
		clientId: "",
		clientSecret: "",
		callbackUrl: "http://localhost:3000/callback",
		sessionSecret: "securepassword",
		inMemoryStoreSize: "100"
	},

	RedisConfig: {
		port: "6379",
		address: "localhost",
		password: "securepassword"
	},

	AppConfig: {
		domain: "http://localhost:3000"
	}
}
