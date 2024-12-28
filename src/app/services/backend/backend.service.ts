import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as uuid from "uuid";

import { IBackendCallOptions } from "./backend-call-options.interface";
import { ConfigService } from "../config.service";
import { lastValueFrom } from "rxjs";
import { IApiRequest, IErrorResponse } from "./naar-api-client";

export enum EBackendServiceRequestContentType { 
    ApplicationJson = "application/json",
    ApplicationFormUrlEncoded = "application/x-www-form-urlencoded",
    MultipartFormData = "multipart/form-data",
    TextPlain = "text/plain",
    TextHtml = "text/html"
}

export class NrServerError extends Error {
	constructor(
		public override message: string,
		public stacktrace: string,
		public code: any,
		public data: any
	) {
		super(message);
	}
}

@Injectable({
	providedIn: "root",
})
export class BackendService {

	constructor (private http: HttpClient, 
				 private config: ConfigService) { }

	public async post<T>(
		urlPart: string,
		data: IApiRequest,
		options?: IBackendCallOptions
	): Promise<T> {
		
		const uniqueId = uuid.v4();

		let url: string = this.config.servicesEndpointRoot + urlPart;
        url = url.includes("?") ? url + "&ts=" + uniqueId : url + "?ts=" + uniqueId;
        
		data = { ...data, uniqueID: uniqueId };

		try {
			const headers = new HttpHeaders({
                "Content-Type": EBackendServiceRequestContentType.ApplicationJson,
			});

			if (options?.hideProgressBar) {
				headers.append("ignoreProgressBar", "");
			}

			let response: any = await lastValueFrom(
												this.http
												.post<any>(url, data, {
													headers,
													withCredentials: true,
												})
											);

			if (response.result == "OK") {
				return response as T;
			} else {
				response = response as IErrorResponse;
				throw new NrServerError(
					response?.error ?? "Unknown error",
					"", /* response?.stacktrace ?? "", */
					response?.code,
					response?.values
				);
			}
		} catch (err: any) {
			console.error(err);
			const error = err?.error ? err.error : { error: err.statusText };
			throw new NrServerError(
				error.error,
				error.stacktrace,
				error.code,
				error.values
			);
		}
	}

    public get<T>(
        url: string,
        contentType: EBackendServiceRequestContentType = EBackendServiceRequestContentType.ApplicationJson
    ): Promise<T> {
        const headers = new HttpHeaders({
            "Content-Type": contentType,
        });
        return lastValueFrom(this.http
					.get<T>(url, {
						headers: headers
					})
				);
    }
}
