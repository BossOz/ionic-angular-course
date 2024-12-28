import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { BackendService } from './services/backend/backend.service';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { environment } from 'src/environments/environment';

export function userFactory(config: ConfigService) {
	return () => config.from(environment);
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule
	],
	providers: [
		AuthService,
		BackendService,
		ConfigService,
		provideHttpClient(),
		{
			provide: RouteReuseStrategy,
			useClass: IonicRouteStrategy
		},
		{
			provide: APP_INITIALIZER,
			useFactory: userFactory,
			deps: [ConfigService],
			multi: true
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }

