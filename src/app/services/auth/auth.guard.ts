import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(private router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!this.authService.isLoggedIn) {

			// OM 13.12.2024: redirect to login page with return url without query params
			const urlTree = this.router.parseUrl(state.url);
			const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');

			this.router.navigate(['/login'], {
				queryParams: {
					returnUrl: urlWithoutParams
				}
			});
		}

		return this.authService.isLoggedIn;
	}	
}
