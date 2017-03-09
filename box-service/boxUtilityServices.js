'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
let autoPage = require('./util/autopage');
let recurseFolders = require('./util/recurse');

const BOX_MANAGERS = [
	"users",
	"files",
	"folders",
	"comments",
	"collaborations",
	"groups",
	"sharedItems",
	"metadata",
	"collections",
	"events",
	"search",
	"tasks",
	"trash",
	"enterprise",
	"legalHoldPolicies",
	"weblinks",
	"retentionPolicies",
	"devicePins",
	"webhooks"
]

class BoxUtilityServices {
	static promisifyClient(client) {
		_.each(BOX_MANAGERS, (manager) => {
			Promise.promisifyAll(client[manager]);
		});
		return client;
	}

	static autoPageWithOffsetAsync(client, manager, method, id, options) {
		let page = Promise.promisify(autoPage.autoPageWithOffset);
		return page(client, manager, method, id, options);
	}

	static autoPageWithMarkerAsync(client, manager, method, id, options) {
		let page = Promise.promisify(autoPage.autoPageWithMarker);
		return page(client, manager, method, id, options);
	}

	static autoPageWithStreamAsync(client, manager, method, id, options) {
		let page = Promise.promisify(autoPage.autoPageWithStream);
		return page(client, manager, method, id, options);
	}

	static getAllFilesAsync(client, id, options) {
		let recurse = Promise.promisify(recurseFolders.getAllFiles);
		return recurse(client, id, options);
	}

	static getFolderTreeAsync(client, id, options) {
		let recurse = Promise.promisify(recurseFolders.getFolderTree);
		return recurse(client, id, options);
	}
}

module.exports = BoxUtilityServices;