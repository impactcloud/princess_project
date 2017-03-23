'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
	BoxSDKConfig: {
		boxClientId: "n08swg9qzw9fiwx19dqfuf4slx7t1hgr",
		boxClientSecret: "jmyMMYunOXLFLtoPlKikgxrHjzxm1q9w",
		boxEnterpriseId: "616157",
		boxPrivateKeyFileName: "private_key.pem",
		boxPrivateKeyPassword: "demo1234",
		boxPrivateKey: (boxPrivateKeyFileName) => {
			return fs.readFileSync(path.resolve(boxPrivateKeyFileName));
		},
		boxPublicKeyId: "hf32rgeq",
	},
	BoxOptions: {
		inMemoryStoreSize: "100",
		expiresAtFieldName: "expiresAt",
		boxAppUserIdFieldName: "box_appuser_id"
	},

	Auth0Config: {
		domain: "mmitchell.auth0.com",
		clientId: "h2LT04wLosmEUekk1mK6AIy65kkxFBHV",
		clientSecret: "rMHcRnh9x6AtwdCkg1sn2Z94sU0P6QJazQTlSd7X47UOf-b1xNbhRZ84muqJFQAa",
		callbackUrl: "https://box-industries-skeleton/callback",
		sessionSecret: "securepassword",
		inMemoryStoreSize: "100"
	},

	RedisConfig: {
		port: "13755",
		address: "redis-13755.c13.us-east-1-3.ec2.cloud.redislabs.com",
		password: "securepassword"
	},

	AppConfig: {
		domain: "https://box-industries-skeleton"
	}
}
