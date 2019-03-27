export default class user{
	constructor(obj){
		this.id = null;
		this.name = null;
		this.email = null;
		this.username = null;
		obj && Object.assign(this,obj)
	}

	showNameAndEmail(){
		return this.name+`(${this.email})`
	}
}