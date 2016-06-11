class Api{

	constructor(connection){
		this.connection = connection;
	}

	getFolders(){
		let connection = this.connection;
		return connection.request('/');
	}

}
export default Api;
