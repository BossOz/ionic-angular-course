import { EventEmitter, Injectable } from '@angular/core';
import { ELingua } from './backend/naar-api-client';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	public servicesEndpointRoot: string | undefined;
	public website: number | undefined;
	
	constructor() {	}
	
	public from(environment: any) {
		this.servicesEndpointRoot = environment.servicesEndpointRoot;
		this.website = environment.website;
	}
	
	public languageChanged: EventEmitter<ELingua> = new EventEmitter<ELingua>();
	private _language : ELingua = ELingua.English;
	public get language() : ELingua {
		return this._language;
	}
	public set language(v : ELingua) {
		this._language = v;
		this.languageChanged.emit(v);
	}
	
}
