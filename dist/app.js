"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function Api() {
  _classCallCheck(this, Api);
};

var Connection = function () {
  function Connection() {
    _classCallCheck(this, Connection);
  }

  _createClass(Connection, [{
    key: "connect",
    value: function connect() {
      console.log('connecting');
    }
  }]);

  return Connection;
}();

console.log("hello world 11. it works!?");
console.log(new Connection());
var connection = new Connection();
connection.connect();
console.log(new Api());