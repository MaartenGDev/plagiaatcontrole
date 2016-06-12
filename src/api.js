class Api{

	constructor(connection){
		this.connection = connection;
	}
	getFolders(){
		return this.connection.request('drive/root/children');
	}
	search(keyword){
		return this.connection.request('drive/root/view.search?q='+keyword);
	}

}
export default Api;
