import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public loginForm = new FormGroup({
		username: new FormControl<string>('', [Validators.required]),
		password: new FormControl<string>('', [Validators.required]),
	});

	constructor(private router: Router, private authService: AuthService) { }

	ngOnInit() { 
		if (this.authService.isLoggedIn) {
			this.router.navigate(['/home']);
		}
	}

	public onLogin(event: any) {
		
		if (this.loginForm.invalid) return;

		// Call the AuthService to login
		const email = this.loginForm.controls.username.value ?? "";
		const password = this.loginForm.controls.password.value ?? "";
		const user = this.authService.login(email, password);
		if (user != null) {
			// User logged in, redirect to home page
			this.router.navigate(['/home']);
		}
	}
}
