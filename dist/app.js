'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
	function Api(connection) {
		_classCallCheck(this, Api);

		this.connection = connection;
	}

	_createClass(Api, [{
		key: 'getFolders',
		value: function getFolders() {
			return this.connection.request('drive/root/children');
		}
	}, {
		key: 'search',
		value: function search(keyword) {
			return this.connection.request('drive/root/view.search?q=' + keyword);
		}
	}]);

	return Api;
}();

var Config = {
	api: 'https://api.onedrive.com/v1.0/',
	token: 'EwBwAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAARJGk3n+7pSW4qJY3ksjQKigWnnc7A3/ywAtztkvW5K2lzjoYS4Tnwpohn9RGHJVBnV00/fUJ8wNJ8mHiULuszGUUYY9bwNU2j2WXF1vZqZJqOSCKAIg4RpSVo1plrEeo/eHQ413hN2Z4RpkXP+6oiTEg9qTPeh3eWjlrU/Lqj2BhVepH83LWEGA9jOGm94Ozy0qRqQImdOXhqLX7ZpJZamkyVmSaEq9ZzPDqrmIZ62TrwBXdcs2XDEl7SPGGnYS7ZvhkUj5pfWzJEmN2RK2EOeELtFt6Rd+d4hNa03M0jzwKjMR9M8kJcnoq+ZNBmLFG66aBcrQrW95/LIV8CmMbHcDZgAACAwX4hk85spHQAGoehYpIleeacHyEn+ITiy6oFhCSIeTNX1wGJ5zUr0rahNQiKUdFFY6YO7PiHe7rZ0m0Am+/LryOa/FTiqg/N9hLMRgBLOQ9e9oA8nSBzsvMG4obvqnGP7gP7GIi68lJfpWRc3Zt802+5JDMFg26yCn0FHIJBYPl4Uktkge13nKzc2rHwyfbaGTlQqPvH2o7bF+ls5l3riwdSJV/2An2atvwmOjbmHue/mjQs8uT4tslhSZk0ZgY3JI4WeSVfhOivWvmW0GaH/GPJ7akNr0XXKt9Dzx7N+MzhyQHZhEy91iuMWF8J3OSXlFPCfzGCTtmz4QTwf8JKNJ4pxISVpZ+Uxqi6xjUNestLiTpse47lHgfWfY2AuT3SylJnIKInIFo76v9gfiFhN4z3yQqtPT+zinfsTzdaIg8HYme2Rg8tyQjXcB'
};

var AjaxRequest = function AjaxRequest(url) {
	_classCallCheck(this, AjaxRequest);

	var httpRequest = new XMLHttpRequest();

	return new Promise(function (resolve, reject) {

		if (!httpRequest) {
			return reject('Could not create ajax request');
		}

		httpRequest.onreadystatechange = function () {

			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					resolve(JSON.parse(httpRequest.responseText));
				}
			}
		};
		// Send Request
		httpRequest.open('GET', url);

		httpRequest.setRequestHeader("Authorization", "bearer " + Config.token);
		httpRequest.send();
	});
};

var Connection = function () {
	function Connection() {
		_classCallCheck(this, Connection);
	}

	_createClass(Connection, [{
		key: 'connect',
		value: function connect() {
			return Config.token;
		}
	}, {
		key: 'request',
		value: function request(url) {
			return new Promise(function (resolve, reject) {
				// Todo: Handle default urls for onedrive
				var request = new AjaxRequest(Config.api + url);

				request.then(function (data) {
					resolve(data);
				});
			});
		}
	}]);

	return Connection;
}();

var Client = function () {
	function Client() {
		_classCallCheck(this, Client);

		this.module = document.querySelector('.module');
	}

	_createClass(Client, [{
		key: 'append',
		value: function append(items) {
			var attribute = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			var list = document.createElement('ul');

			items.forEach(function (item) {
				console.log(typeof attribute === 'undefined' ? 'undefined' : _typeof(attribute));
				var listItem = document.createElement('li');
				var itemValue = attribute != false ? item[attribute] : item;
				listItem.appendChild(document.createTextNode(itemValue));

				list.appendChild(listItem);
			});
			this.module.appendChild(list);
		}
	}]);

	return Client;
}();

var client = new Client();

var connection = new Connection();

var api = new Api(connection);

var folders = api.getFolders();

folders.then(function (data) {
	client.append(data.value, 'name');
});