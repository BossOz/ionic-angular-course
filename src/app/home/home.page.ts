import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	public text = "Hello World";

	constructor() { }

	public onChangeText(event: any) {
		this.text = "Changed!";
	}

}
