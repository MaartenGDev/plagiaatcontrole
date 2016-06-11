import AjaxRequest from './ajaxRequest';

class Connection{
  
  connect(){

  }
  request(url){
	return new Promise(function(resolve,reject){
		// Todo: Handle default urls for onedrive
		
		var request = new AjaxRequest(url);
		request.then(function(data){
		 resolve(data);
		});

	});
  } 

}
export default Connection;
