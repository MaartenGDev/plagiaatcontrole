import Api from './api';
import Connection from './connection';
import AjaxRequest from './ajaxRequest';

var connection = new Connection();

var api = new Api(connection);

var folders = api.getFolders();

folders.then(function(data){
  console.log('done ' + data);
});
