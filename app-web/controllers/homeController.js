'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const config = require('config');
const Auth0Config = config.get('Auth0Config');
const BoxOptions = config.get('BoxOptions');

let Box = require('../../box-service/boxClientService');
let IdentityProvider = require('../../identity-service/identityProvider');
let IdentityProviderUtilities = require('../../identity-service/identityProviderUtilities');
let homeEnv = {
	AUTH0_CLIENT_ID: Auth0Config.clientId,
	AUTH0_DOMAIN: Auth0Config.domain,
	AUTH0_CALLBACK_URL: Auth0Config.callbackUrl || 'http://localhost:3000/callback'
};


/**
 * Render home page
**/
module.exports.main = (req, res, next) => {
	res.render('pages/home', { title: "Industry Portal", env: homeEnv });
}


/**
 * Logout, kill user session
**/
module.exports.logout = (req, res, next) => {
	req.logout();
	res.redirect('/home');
}

/**
 * Handle auth callback
**/
module.exports.callback = asyncFunc(function* (req, res, next) {
	let boxAppUserIdPersona1 = IdentityProviderUtilities.checkForExistingBoxAppUserId(req.user, BoxOptions.boxPersona1AppUserIdFieldName);
	let boxAppUserIdPersona2 = IdentityProviderUtilities.checkForExistingBoxAppUserId(req.user, BoxOptions.boxPersona2AppUserIdFieldName);
	let updatedProfile;

	if (!boxAppUserIdPersona1) {
		// create app user for first persona
		let appUser1 = yield Box.createAppUser(req.user.displayName + '_' + BoxOptions.persona1);
		updatedProfile = yield IdentityProvider.updateUserModel(req.user.id, appUser1.id, BoxOptions.boxPersona1AppUserIdFieldName);
		req.user.app_metadata = updatedProfile.app_metadata;
	}

	if(!boxAppUserIdPersona2) {
		// create app user for second persona
		let appUser2 = yield Box.createAppUser(req.user.displayName + '_' + BoxOptions.persona2);
		updatedProfile = yield IdentityProvider.updateUserModel(req.user.id, appUser2.id, BoxOptions.boxPersona2AppUserIdFieldName);
		req.user.app_metadata = updatedProfile.app_metadata;
	}

	res.redirect('/dashboard');
})
