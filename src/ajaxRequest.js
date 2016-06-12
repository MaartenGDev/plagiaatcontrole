import Config from './config';

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
					resolve(JSON.parse(httpRequest.responseText));
				}
			} 	
			
			};
			// Send Request
			httpRequest.open('GET', url);
			
			httpRequest.setRequestHeader("Authorization","bearer "+ Config.token);
			httpRequest.send();
	});
	}
}
export default AjaxRequest;
