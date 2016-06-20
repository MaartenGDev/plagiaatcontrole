import Api from './api';
import Connection from './connection';
import AjaxRequest from './ajaxRequest';
import Client from './client';

var connection = new Connection();

var api = new Api(connection);

var client = new Client(api);

var content = 'Scrum is een flexibele manier om (s0ftware)producten te maken. Er wordt gewerkt in';

var percentage = api.getPercentage('87B8378140BF8085!116',content);

percentage.then(function(data){
	console.log(data);
});
