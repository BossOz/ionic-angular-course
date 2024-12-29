import { Component, OnInit } from '@angular/core';

import { TripService } from '../../services/trip/trip.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(public tripService: TripService,
				private authservice: AuthService,
				private router: Router
	) { }

	ngOnInit() { 
		this.tripService.getHomeTrips();
	}

	public doLogout() {
		this.authservice.logout();
		this.router.navigate(['/login']);
	}
}
