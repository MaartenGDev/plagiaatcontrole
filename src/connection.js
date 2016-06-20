import AjaxRequest from './ajaxRequest';
import Config from './config';

class Connection{
  
  connect(){
    return Config.token;
  }
  request(url){
	return new Promise(function(resolve,reject){
		// Todo: Handle default urls for onedrive
		var request = new AjaxRequest(Config.api + url);
		request.then(function(data){
		 resolve(data);
		});

	});
  } 

}
export default Connection;
