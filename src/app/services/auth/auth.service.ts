import { EventEmitter, Injectable } from '@angular/core';
import { AgencyData, DebugData, EOperatore, ETipoUtente, ILoginRequest, UserDataResponse } from '../backend/naar-api-client';
import { BackendService } from '../backend/backend.service';
import { User } from './user.class';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _userChanged: EventEmitter<void> = new EventEmitter<void>();
	public get userChanged(): Observable<void> {
		return this._userChanged.asObservable();
	}

	private _working: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public get working(): Observable<boolean> {
		return this._working.asObservable();
	}
	
	private _isLoggedIn = false;
	public get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}
	
	private _currentUser: User | null = null;
	public get currentUser(): User | null {
		return this._currentUser;
	}

	constructor (private backend: BackendService) { }

	public async init(): Promise<void> {
		if (await this.doCheck()) {
			console.log('Logged in as', this.currentUser.displayName);
		} else {
			console.log('Not logged in');
		}
	}

	public async login(username: string, password: string, crossLoginCode?: string): Promise<User | null> {

		this._working.next(true);

		const loginData: ILoginRequest = {
			username: username,
			password: password,
			crossLoginCode: crossLoginCode
		};
		const loginResponse: UserDataResponse = await this.backend.post<UserDataResponse>('auth/login', loginData);

		const user =  this.digestLoginResponse(loginResponse);
		
		this._working.next(false);
		return user;
	}
	
	public async doCheck(): Promise<boolean> {
		this._working.next(true);

        const url = 'auth/check';
        const checkResponse: UserDataResponse = await this.backend.post<UserDataResponse>(url, null);
		await this.digestLoginResponse(checkResponse);
		
		this._working.next(false);

		return this._isLoggedIn;
	}

	private async digestLoginResponse(loginResponse: UserDataResponse): Promise<User | null> { 
		if (loginResponse.code === 'LOGGEDIN') {
			this._isLoggedIn = true;
			this._currentUser = new User(
									loginResponse.id ?? 0, 
									loginResponse.ssoToken ?? "", 
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
			this._isLoggedIn = false;
			console.warn('Login failed');
			return null;
		}
	}
}
