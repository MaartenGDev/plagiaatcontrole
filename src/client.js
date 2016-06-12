class Client{
	constructor(){
		this.module = document.querySelector('.module');
	}
	append(items,attribute = false){
		let list = document.createElement('ul');
		
		items.forEach(function(item){
			console.log(typeof attribute);
			let listItem = document.createElement('li');
			let itemValue = attribute != false ? item[attribute] : item;
			listItem.appendChild(document.createTextNode(itemValue));

			list.appendChild(listItem);
		});
		this.module.appendChild(list);
	}

}
export default Client;
