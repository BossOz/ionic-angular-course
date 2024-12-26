import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage {

	public loginForm = new FormGroup({
		username: new FormControl<string>('', [Validators.required]),
		password: new FormControl<string>('', [Validators.required]),
	});

	constructor(private authService: AuthService) { }

	public onLogin(event: any) {
		
		if (this.loginForm.invalid) return;

		// Call the AuthService to login
		const email = this.loginForm.controls.username.value ?? "";
		const password = this.loginForm.controls.password.value ?? "";
		this.authService.login(email, password);
	}
}
