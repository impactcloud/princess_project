// 'use strict';
// const Promise = require('bluebird');
// const asyncFunc = Promise.coroutine;
// const config = require('config');
// const Auth0Config = config.get('Auth0Config');
// const BoxOptions = config.get('BoxOptions');
// let AuthenticationClient = require('auth0').AuthenticationClient;
// let ManagementClient = require('auth0').ManagementClient;
// let IdentityTokenCache = require('./identityTokenCache');
// let IdentityProviderUtilities = require('./identityProviderUtilities');
//
// class IdentityProvider {
// 	constructor() {
// 		this.idCache = IdentityTokenCache;
// 		this.authenticationClient = new AuthenticationClient({
// 			domain: Auth0Config.domain,
// 			clientId: Auth0Config.clientId
// 		});
// 	}
//
// 	checkIdentityFromIdToken(idToken) {
// 		return this.authenticationClient.tokens.getInfo(idToken);
// 	}
//
// 	getUserManagementClient() {
// 		let self = this;
// 		return asyncFunc(function* () {
// 			return new ManagementClient({
// 				token: yield self.generateManagementToken(),
// 				domain: Auth0Config.domain
// 			});
// 		})();
// 	}
//
// 	updateUserModel(userId, boxAppUserId, auth0Field) {
// 		let self = this;
// 		return asyncFunc(function* () {
// 			let params = { id: userId };
// 			let metadata = {};
// 			metadata[auth0Field] = boxAppUserId
// 			let userManagementClient = yield self.getUserManagementClient();
// 			return yield userManagementClient.updateAppMetadata(params, metadata);
//
// 		})();
// 	}
//
// 	generateManagementToken() {
// 		let self = this;
// 		let key = this.idCache.cacheKeyPrefixDomainManagement;
// 		return asyncFunc(function* () {
// 			let idManagementToken = yield self.idCache.getIdentityManagementToken(key);
// 			if (idManagementToken && idManagementToken.expires_in && idManagementToken.expires_in > Date.now()) {
// 				return idManagementToken.access_token;
// 			} else {
// 				let newIdManagmentToken = yield IdentityProviderUtilities.retrieveManagementToken();
// 				self.idCache.setIdentityManagementToken(key, newIdManagmentToken, newIdManagmentToken.expires_in);
// 				return newIdManagmentToken.access_token;
// 			}
// 		})();
// 	}
// }
//
// module.exports = new IdentityProvider();
