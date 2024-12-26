
export class ApiConfig {
	// token: string;
	//
	// constructor(token: string) {
	// 	this.token = token;
	// }
}

export class ApiClientBase {
	constructor(private config: ApiConfig) {

	}

	protected transformOptions(options: any): Promise<any> {
		options.withCredentials = true;
		// options.headers = options.headers.append('authorization', `Bearer ${this.config.token}`);
		return Promise.resolve(options);
	}
}
