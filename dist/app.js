class Api{

	constructor(connection){
		this.connection = connection;
	}

	getFolders(){
		let connection = this.connection;
		return connection.request('/');
	}

}

class AjaxRequest{
	constructor(url){
		
		let httpRequest = new XMLHttpRequest();
		
		return new Promise(function(resolve,reject){
		
			
			if (!httpRequest) {
			    return reject('Could not create ajax request');
			}
			
			httpRequest.onreadystatechange = function(){
	
		   	if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {   	
					resolve(httpRequest.responseText);
				}
			} 	
			
			};
			// Send Request
			httpRequest.open('GET', url);
			
			httpRequest.send();
	});
	}
}

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

var connection = new Connection();

var api = new Api(connection);

var folders = api.getFolders();

folders.then(function(data){
  console.log('done ' + data);
});