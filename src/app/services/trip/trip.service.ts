import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ConfigService } from '../config.service';
import { EOperatore, OrderListRow, SearchOrdersRequest, SearchOrdersResponse } from '../backend/naar-api-client';
import { BackendService } from '../backend/backend.service';

@Injectable({
	providedIn: 'root'
})
export class TripService {

	public loading$ = new BehaviorSubject<boolean>(false);

	constructor(private configService: ConfigService, 
				private backend: BackendService) { }

	public homeTrips$ = new BehaviorSubject<OrderListRow[]>([]);
	public getHomeTrips() {
		
		this.loading$.next(true);

		const request: SearchOrdersRequest = new SearchOrdersRequest({
			soloUtente: true,
			offertaID: null,
			operatore: EOperatore.Naar,
			soloConfermate: false,
			soloIncomplete: false,
			lingua: this.configService.language,
			siteID: this.configService.website
		});

		this.backend.post<SearchOrdersResponse>("orders/search", request)
		.then(response => { 
			this.homeTrips$.next(response.trips);
		})
		.catch(error => {
			console.error(error);
		})
		.finally(() => this.loading$.next(false) );
	}
}
