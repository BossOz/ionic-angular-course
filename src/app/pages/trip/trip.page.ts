import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-trip',
	templateUrl: './trip.page.html',
	styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

	constructor(private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(paramMap => {
			if (!paramMap.has('tripID')) {
				return;
			}

			const tripID = paramMap.get('tripID');
			
		});
	}

}
