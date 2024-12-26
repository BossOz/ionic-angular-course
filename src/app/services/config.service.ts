/*
 * = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * 
 * File: config.service.ts
 * Project: ionic-angular-course
 * Created Date: Th Dec 2024
 * Author: Oscar Manzelli
 * 
 * Last Modified: Thu Dec 26 2024
 * Modified By: Oscar Manzelli
 * 
 * Copyright (c) 2024 Naar Tour Operator spa
 * 
 * HISTORY:
 * Date    	By	Comments
 * --------	---	---------------------------------------------------------
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	public servicesEndpointRoot: string | undefined;

	constructor(private http: HttpClient) {	}

	public from(environment: any) {
		this.servicesEndpointRoot = environment.servicesEndpointRoot;
	}

	public async load(path: string): Promise<void> {
		const cfg = await this.http.get<any>(path).toPromise();
		this.servicesEndpointRoot = cfg.servicesEndpointRoot;
	}
}
