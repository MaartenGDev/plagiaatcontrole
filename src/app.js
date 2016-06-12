import Api from './api';
import Connection from './connection';
import AjaxRequest from './ajaxRequest';
import Client from './client';

var client = new Client();


var connection = new Connection();

var api = new Api(connection);

var folders = api.getFolders();

folders.then(function(data){
 client.append(data.value,'name');
});
