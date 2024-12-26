/*
 * = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * 
 * File: user.class.ts
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

import { AgencyData, DebugData, EOperatore, ETipoUtente } from "../backend/naar-api-client";

export class User {

	private _displayName: string | undefined;
	public get displayName(): string {
		if (!this._displayName) {
			this._displayName = `${(this.firstName || '')} ${(this.lastName || '')}`;
		}
		return this._displayName;
	}

	constructor(
		public id: number,
		public ssoToken: string,
		public firstName: string,
		public lastName: string,
		public type: ETipoUtente,
		public agencyData: AgencyData,
		public debugData: DebugData,
		public operator: EOperatore,
		public email: string
	) {
	}
}
