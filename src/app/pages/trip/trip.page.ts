import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-trip',
	templateUrl: './trip.page.html',
	styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

	public tripID$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

	constructor(private router: Router, 
				private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(paramMap => {
			if (!paramMap.has('tripID')) {
				this.router.navigate(['/home']);
				return;
			}

			try {
				const tripID = Number.parseInt(paramMap.get('tripID'));
				this.tripID$.next(tripID);

			} catch (error) {
				console.error(error);
				this.router.navigate(['/home']);
				return;
			}

		});
	}

}
