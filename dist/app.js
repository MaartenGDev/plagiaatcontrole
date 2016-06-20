'use strict';

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
		key: 'openFolder',
		value: function openFolder(id) {
			return this.connection.request('drive/items/' + id + '/children');
		}
	}, {
		key: 'openFile',
		value: function openFile(id) {
			console.log('open bestand' + id);
		}
	}, {
		key: 'getPercentage',
		value: function getPercentage(id, content) {
			return this.connection.request('file/' + id + '/content/' + content);
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
	api: 'http://fast.dev/',
	token: 'EwBwAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAATK2UswVIpEISoOWcvh8MaZcwQLGlzO9gtlHxtdw3RobVWy6nPAwKX9APdwy/oYwfyPOVg1rgrwoyj91wWE4Ja2uR+aDIntwGV5yJIW2BQAD71ohBCJnptNxs06x+vDbTE+BMVQcot3GikSYDsGn/woezvv3eabbgaso6PV/NZsaJUfmHIXAUaDwMXDl1Sr2hZYx5kYycp/V9tXqtjyQL1IWKEQrci4fewbajndOoqq98fVf0OvXTKOLYajyclfE5iCBwjz7cDHwVK54hXHkk/eLkwYttnYQnwkcTn7OtWwR49GJ1MryfpYhFLoG/54J3fN/mU3pX+jjxPFzRhgq0xEDZgAACKzSQK5DN+wLQAEAKkXIEZk7Ts7XzDX4QI2vPaxdJs6PxjQHoNmO4JWKRcfYuha0crkgp8JEdE1tpIq1fgHNOv6I5qj0REBfy+p1VIjbYfV6MBsplTu0ZTQpmp5ktRAVGyW+7R3lZzCH9EYkzjqCLH+AMqa+WnHeaSM7CCYULnsZc3/9IwGlve+uL8KTRC6TYZPCt+CqU/q5VW87Add8030qkB8VI6+Xf3t/NNmA/c8Ez/ibyiLsPg0SNw3jHd2+xj9Ea2elaSlpaJamHjrmJjOWr+665hCEikxi2z2jnhSBw+tP2uEh+t2EQDsKCXNuG70uts3swWnJfWtwOwutDDJ2aqCO7IsGgMqf7XecfTWax6HmKkWTt4lqxm04GXl0YobjQdyrtCTtetr87h5Tz05Gpe/vSfBHNFHeZ2PFr12JpxDLxBXVveSeencB'
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
		// *Send Request
		httpRequest.open('GET', url);

		httpRequest.setRequestHeader("token", Config.token);
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
	function Client(api) {
		_classCallCheck(this, Client);

		this.api = api;
		this.module = document.querySelector('.module');
	}

	_createClass(Client, [{
		key: 'showFolder',
		value: function showFolder(id) {
			var _this = this;

			var items = this.api.openFolder(id);

			items.then(function (data) {
				return _this.appendList(data.value);
			});
		}
	}, {
		key: 'appendList',
		value: function appendList(items) {

			if (typeof this.lastParent != 'undefined') {
				items.unshift(this.lastParent);
				this.lastParent = items[1];
			}

			var list = document.createElement('ul');
			items.forEach(function (item) {
				var listItem = document.createElement('li');
				var link = document.createElement('a');

				link.href = '#';

				link.innerHTML = item['name'];
				// Check if it's a folder.
				if (item.hasOwnProperty('folder')) {
					link.setAttribute('onclick', 'client.showFolder(\'' + item.id + '\')');
				} else {
					link.setAttribute('onclick', 'client.openFile(2)');
				}

				listItem.appendChild(link);
				list.appendChild(listItem);
			});
			this.module.innerHTML = '';
			this.module.appendChild(list);
		}
	}]);

	return Client;
}();

var connection = new Connection();

var api = new Api(connection);

var client = new Client(api);

var content = 'Scrum is een flexibele manier om (s0ftware)producten te maken. Er wordt gewerkt in';

var percentage = api.getPercentage('87B8378140BF8085!116', content);

percentage.then(function (data) {
	console.log(data);
});