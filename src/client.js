import Api from './api';

class Client{
	constructor(api){
		this.api = api;
		this.module = document.querySelector('.module');
	}
	showFolder(id){
		let items = this.api.openFolder(id);

		items.then((data) => this.appendList(data.value));
	}
	appendList(items){

		if(typeof this.lastParent != 'undefined'){
			items.unshift(this.lastParent);
			this.lastParent = items[1];
		}

		let list = document.createElement('ul');
		items.forEach(function(item){
			let listItem = document.createElement('li');
			let link = document.createElement('a');
			
			link.href = '#';

			link.innerHTML = item['name'];
			// Check if it's a folder.
			if(item.hasOwnProperty('folder')){
				link.setAttribute('onclick','client.showFolder(\'' + item.id + '\')');
			}else{
				link.setAttribute('onclick','client.openFile(2)');
			}
			
			listItem.appendChild(link);
			list.appendChild(listItem);
		});
		this.module.innerHTML = '';
		this.module.appendChild(list);
	}


}
export default Client;
