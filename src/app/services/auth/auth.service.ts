import { Injectable } from '@angular/core';
import { AgencyData, DebugData, EOperatore, ETipoUtente, ILoginRequest, UserDataResponse } from '../backend/naar-api-client';
import { BackendService } from '../backend/backend.service';
import { User } from './user.class';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _isLoggedIn = false;
	public get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}
	
	private _currentUser: User | null = null;
	public get currentUser(): User | null {
		return this._currentUser;
	}

	constructor (private backend: BackendService) { }

	public async login(username: string, password: string, crossLoginCode?: string): Promise<User | null> {

		const loginData: ILoginRequest = {
			username,
			password,
			crossLoginCode
		};
		const loginResponse: UserDataResponse = await this.backend.post<UserDataResponse>('auth/login', loginData);

		return this.digestLoginResponse(loginResponse);
	}
	
	private async digestLoginResponse(loginResponse: UserDataResponse): Promise<User | null> { 
		if (loginResponse.code === 'LOGGEDIN') {
			this._isLoggedIn = true;
			this._currentUser = new User(
									loginResponse.id, 
									loginResponse.ssoToken, 
									loginResponse.nome ?? "Unknown", 
									loginResponse.cognome ?? "", 
									loginResponse.tipo ?? ETipoUtente.Agenzia, 
									loginResponse.agencyData ?? new AgencyData(), 
									loginResponse.debugData ?? new DebugData(), 
									loginResponse.operator ?? EOperatore.Naar,
									loginResponse.email ?? "");
			
			console.log('Logged in as', this.currentUser?.displayName);
			return this.currentUser;
		} else {
			console.warn('Login failed');
			return null;
		}
	}
}
