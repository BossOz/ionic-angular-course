import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';
import { BehaviorSubject } from 'rxjs';
import { OrderListRow, SearchOrdersRequest, SearchOrdersResponse } from '../../services/backend/naar-api-client';
import { TripService } from '../../services/trip/trip.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(public tripService: TripService) { }

	ngOnInit() { 
		
		this.tripService.getHomeTrips();
			
	}
}
