class Api{

	constructor(connection){
		this.connection = connection;
	}
	getFolders(){
		return this.connection.request('drive/root/children');
	}
	openFolder(id){
		return this.connection.request('drive/items/' + id + '/children');
	}
	openFile(id){
		console.log('open bestand' + id);
	}
	getPercentage(id,content){
		return this.connection.request('file/' + id + '/content/' + content);	
	}
	search(keyword){
		return this.connection.request('drive/root/view.search?q='+keyword);
	}

}
export default Api;
