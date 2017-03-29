'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const config = require('config');
const BoxSDKConfig = config.get('BoxSDKConfig');
const BoxOptions = config.get('BoxOptions');
const AppConfig = config.get('AppConfig');
let BoxService = require('../../box-service/boxClientService');


/**
 * Main files page
**/
module.exports.main = asyncFunc(function* (req, res, next) {
	let boxAppUserId = req.user.app_metadata[BoxOptions.boxPersona1AppUserIdFieldName];
	if (!boxAppUserId) {
		res.redirect('/home');
	}
	let fileId = req.params.id;
	let appUserClient = yield BoxService.getUserClient(boxAppUserId);
	let file = yield appUserClient.files.getAsync(fileId, null);
	let tokens = yield BoxService.generateUserToken(boxAppUserId);
	req.user.accessToken = tokens.accessToken;

	res.render('pages/box/file-detail', {
		file,
		user: req.user,
		domain: AppConfig.domain
	})
});

/**
 * Fetch thumbnail endpoint
**/
module.exports.thumbnail = asyncFunc(function* (req, res, next) {
	let boxAppUserId = req.user.app_metadata[BoxOptions.boxPersona1AppUserIdFieldName];
	if (!boxAppUserId) {
		res.redirect('/home');
	}
	let fileId = req.params.id;
	let appUserClient = yield BoxService.getUserClient(boxAppUserId);
	try {
		let data = yield appUserClient.files.getThumbnailAsync(fileId, { max_height: "32", max_width: "32" });
		if (data.file) {
			// We got the thumbnail file, so send the image bytes back
			res.send(data.file);
		} else if (data.location) {
			// We got a placeholder URL, so redirect the user there
			res.redirect(data.location);
		} else {
			// Something went wrong, so return a 500
			res.status(500).end();
		}
	} catch (e) {
		let status;
		if (e && e.response && e.response.body && e.response.body.status) {
			status = e.response.body.status;
		}
		res.status(status || 500).json(e);
	}
});

/**
 * Fetch file preview endpoint
**/
module.exports.preview = asyncFunc(function* (req, res, next) {
	let boxAppUserId = req.user.app_metadata[BoxOptions.boxPersona1AppUserIdFieldName];
	if (!boxAppUserId) {
		res.redirect('/home');
	}
	let fileId = req.params.id;
	let appUserClient = yield BoxService.getUserClient(boxAppUserId);
	try {
		let file = yield appUserClient.files.getAsync(fileId, { fields: 'expiring_embed_link' });
		res.render('pages/box/file-preview', {
			file
		});
	} catch (e) {
		res.redirect(`/files/${fileId}`);
	}
});
