/** Classe base di tutte le richieste API */
export class ApiRequest implements IApiRequest {
    /** ID univoco facoltativo della richiesta */
    uniqueID?: string | null;

    constructor(data?: IApiRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.uniqueID = _data["uniqueID"] !== undefined ? _data["uniqueID"] : <any>null;
        }
    }

    static fromJS(data: any): ApiRequest {
        data = typeof data === 'object' ? data : {};
        let result = new ApiRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["uniqueID"] = this.uniqueID !== undefined ? this.uniqueID : <any>null;
        return data;
    }
}

/** Classe base di tutte le richieste API */
export interface IApiRequest {
    /** ID univoco facoltativo della richiesta */
    uniqueID?: string | null;
}

/** Classe base astratta di tutte le risposte API */
export abstract class ApiResponse implements IApiResponse {
	/** Codice facoltativo che identifica il tipo di risposta */
	code?: string | null;
	/** ID univoco della richiesta alla quale viene fornita la risposta */
	requestID?: string | null;
	/** Timestamp UTC della risposta */
	timestamp?: number;
	/** ID univoco della risposta */
	uniqueID?: string;

	constructor(data?: IApiResponse) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(_data?: any) {
		if (_data) {
			this.code = _data["code"] !== undefined ? _data["code"] : <any>null;
			this.requestID = _data["requestID"] !== undefined ? _data["requestID"] : <any>null;
			this.timestamp = _data["timestamp"] !== undefined ? _data["timestamp"] : <any>null;
			this.uniqueID = _data["uniqueID"] !== undefined ? _data["uniqueID"] : <any>null;
		}
	}

	static fromJS(data: any): ApiResponse {
		data = typeof data === 'object' ? data : {};
		throw new Error("The abstract class 'ApiResponse' cannot be instantiated.");
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["code"] = this.code !== undefined ? this.code : <any>null;
		data["requestID"] = this.requestID !== undefined ? this.requestID : <any>null;
		data["timestamp"] = this.timestamp !== undefined ? this.timestamp : <any>null;
		data["uniqueID"] = this.uniqueID !== undefined ? this.uniqueID : <any>null;
		return data;
	}
}

/** Classe base astratta di tutte le risposte API */
export interface IApiResponse {
	/** Codice facoltativo che identifica il tipo di risposta */
	code?: string | null;
	/** ID univoco della richiesta alla quale viene fornita la risposta */
	requestID?: string | null;
	/** Timestamp UTC della risposta */
	timestamp?: number;
	/** ID univoco della risposta */
	uniqueID?: string;
}

/** Classe base delle risposte positive API */
export class OkApiResponse extends ApiResponse implements IOkApiResponse {
	/** Risultato dell'elaborazione. Vale sempre "OK"  */
	result?: EOkResponseType;

	constructor(data?: IOkApiResponse) {
		super(data);
	}

	override init(_data?: any) {
		super.init(_data);
		if (_data) {
			this.result = _data["result"] !== undefined ? _data["result"] : <any>null;
		}
	}

	static override fromJS(data: any): OkApiResponse {
		data = typeof data === 'object' ? data : {};
		let result = new OkApiResponse();
		result.init(data);
		return result;
	}

	override toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["result"] = this.result !== undefined ? this.result : <any>null;
		super.toJSON(data);
		return data;
	}
}

/** Classe base delle risposte positive API */
export interface IOkApiResponse extends IApiResponse {
	/** Risultato dell'elaborazione. Vale sempre "OK"  */
	result?: EOkResponseType;
}

export enum EErrorResponseType {
	ERROR = "ERROR",
}

export enum EOkResponseType {
	OK = "OK",
}

export interface IErrorResponse extends IApiResponse {
	/** Risultato dell'elaborazione. Vale sempre "ERROR"  */
	result?: EErrorResponseType;
	/** Descrizione testuale dell'errore */
	error?: string | null;
	/** Valori custom associati all'errore */
	values?: { [key: string]: any; } | null;
}

export class UserDataResponse extends OkApiResponse implements IUserDataResponse {
	/** ID in chiaro */
	id?: number;
	/** User email */
	email?: string | null;
	/** ID criptato per operazioni in SSO */
	ssoToken?: string;
	/** Nome */
	nome?: string | null;
	/** Cognome */
	cognome?: string | null;
	/** Tipo di utente */
	tipo?: ETipoUtente;
	/** Elenco complessivo dei suoi permessi */
	permessi?: string[];
	/** Can Book Flight -> diverso dai permessi!!! e su userinfo */
	canBookFlights?: boolean;
	/** Può prenotare? */
	canBook?: boolean;
	/** Opzioni del frontend */
	opzioniUI?: OpzioniUI;
	/** Dati dell'agenzia dell'utente, se ne ha una */
	agencyData?: AgencyData | null;
	/** Dati di debug con le impostazioni del server */
	debugData?: DebugData;
	operator?: EOperatore;
	mustChangePassword?: boolean;
	resetPasswordCode?: string | null;

	constructor(data?: IUserDataResponse) {
		super(data);
	}

	override init(_data?: any) {
		super.init(_data);
		if (_data) {
			this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
			this.email = _data["email"] !== undefined ? _data["email"] : <any>null;
			this.ssoToken = _data["ssoToken"] !== undefined ? _data["ssoToken"] : <any>null;
			this.nome = _data["nome"] !== undefined ? _data["nome"] : <any>null;
			this.cognome = _data["cognome"] !== undefined ? _data["cognome"] : <any>null;
			this.tipo = _data["tipo"] !== undefined ? _data["tipo"] : <any>null;
			if (Array.isArray(_data["permessi"])) {
				this.permessi = [] as any;
				for (let item of _data["permessi"])
					this.permessi!.push(item);
			}
			else {
				this.permessi = <any>null;
			}
			this.canBookFlights = _data["canBookFlights"] !== undefined ? _data["canBookFlights"] : <any>null;
			this.canBook = _data["canBook"] !== undefined ? _data["canBook"] : <any>null;
			this.opzioniUI = _data["opzioniUI"] ? OpzioniUI.fromJS(_data["opzioniUI"]) : <any>null;
			this.agencyData = _data["agencyData"] ? AgencyData.fromJS(_data["agencyData"]) : <any>null;
			this.debugData = _data["debugData"] ? DebugData.fromJS(_data["debugData"]) : <any>null;
			this.operator = _data["operator"] !== undefined ? _data["operator"] : <any>null;
			this.mustChangePassword = _data["mustChangePassword"] !== undefined ? _data["mustChangePassword"] : <any>null;
			this.resetPasswordCode = _data["resetPasswordCode"] !== undefined ? _data["resetPasswordCode"] : <any>null;
		}
	}

	static override  fromJS(data: any): UserDataResponse {
		data = typeof data === 'object' ? data : {};
		let result = new UserDataResponse();
		result.init(data);
		return result;
	}

	override toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["id"] = this.id !== undefined ? this.id : <any>null;
		data["email"] = this.email !== undefined ? this.email : <any>null;
		data["ssoToken"] = this.ssoToken !== undefined ? this.ssoToken : <any>null;
		data["nome"] = this.nome !== undefined ? this.nome : <any>null;
		data["cognome"] = this.cognome !== undefined ? this.cognome : <any>null;
		data["tipo"] = this.tipo !== undefined ? this.tipo : <any>null;
		if (Array.isArray(this.permessi)) {
			data["permessi"] = [];
			for (let item of this.permessi)
				data["permessi"].push(item);
		}
		data["canBookFlights"] = this.canBookFlights !== undefined ? this.canBookFlights : <any>null;
		data["canBook"] = this.canBook !== undefined ? this.canBook : <any>null;
		data["opzioniUI"] = this.opzioniUI ? this.opzioniUI.toJSON() : <any>null;
		data["agencyData"] = this.agencyData ? this.agencyData.toJSON() : <any>null;
		data["debugData"] = this.debugData ? this.debugData.toJSON() : <any>null;
		data["operator"] = this.operator !== undefined ? this.operator : <any>null;
		data["mustChangePassword"] = this.mustChangePassword !== undefined ? this.mustChangePassword : <any>null;
		data["resetPasswordCode"] = this.resetPasswordCode !== undefined ? this.resetPasswordCode : <any>null;
		super.toJSON(data);
		return data;
	}
}

/** Dati dell'utente */
export interface IUserDataResponse extends IOkApiResponse {
	/** ID in chiaro */
	id?: number;
	/** User email */
	email?: string | null;
	/** ID criptato per operazioni in SSO */
	ssoToken?: string;
	/** Nome */
	nome?: string | null;
	/** Cognome */
	cognome?: string | null;
	/** Tipo di utente */
	tipo?: ETipoUtente;
	/** Elenco complessivo dei suoi permessi */
	permessi?: string[];
	/** Can Book Flight -> diverso dai permessi!!! e su userinfo */
	canBookFlights?: boolean;
	/** Può prenotare? */
	canBook?: boolean;
	/** Opzioni del frontend */
	opzioniUI?: OpzioniUI;
	/** Dati dell'agenzia dell'utente, se ne ha una */
	agencyData?: AgencyData | null;
	/** Dati di debug con le impostazioni del server */
	debugData?: DebugData;
	operator?: EOperatore;
	mustChangePassword?: boolean;
	resetPasswordCode?: string | null;
}

export enum ETipoUtente {
	Privato = "Privato",
	Agenzia = "Agenzia",
	Intranet = "Intranet",
	TestCertificazioni = "TestCertificazioni",
}

/** Classe con le opzioni di frontend dell'utene */
export class OpzioniUI implements IOpzioniUI {
	/** Nome del tema del sito (usato dal sito vecchio) */
	theme?: string | null;
	/** Nome del tema Nebular della intranet */
	intranetTheme?: string | null;
	/** Lingua preferita */
	lang?: string | null;
	presaVisionePrivacy?: string | null;

	constructor(data?: IOpzioniUI) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(_data?: any) {
		if (_data) {
			this.theme = _data["theme"] !== undefined ? _data["theme"] : <any>null;
			this.intranetTheme = _data["intranetTheme"] !== undefined ? _data["intranetTheme"] : <any>null;
			this.lang = _data["lang"] !== undefined ? _data["lang"] : <any>null;
			this.presaVisionePrivacy = _data["presaVisionePrivacy"] !== undefined ? _data["presaVisionePrivacy"] : <any>null;
		}
	}

	static fromJS(data: any): OpzioniUI {
		data = typeof data === 'object' ? data : {};
		let result = new OpzioniUI();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["theme"] = this.theme !== undefined ? this.theme : <any>null;
		data["intranetTheme"] = this.intranetTheme !== undefined ? this.intranetTheme : <any>null;
		data["lang"] = this.lang !== undefined ? this.lang : <any>null;
		data["presaVisionePrivacy"] = this.presaVisionePrivacy !== undefined ? this.presaVisionePrivacy : <any>null;
		return data;
	}
}

/** Classe con le opzioni di frontend dell'utene */
export interface IOpzioniUI {
	/** Nome del tema del sito (usato dal sito vecchio) */
	theme?: string | null;
	/** Nome del tema Nebular della intranet */
	intranetTheme?: string | null;
	/** Lingua preferita */
	lang?: string | null;
	presaVisionePrivacy?: string | null;
}

/** Dati dell'agenzia dell'utente */
export class AgencyData implements IAgencyData {
	/** ID del contatto agenzia */
	agencyID?: number;
	/** Nome visualizzato del contatto */
	agencyName?: string;
	/** Url del logo dell'agenzia, se ce l'ha */
	agencyLogoUrl?: string | null;

	constructor(data?: IAgencyData) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(_data?: any) {
		if (_data) {
			this.agencyID = _data["agencyID"] !== undefined ? _data["agencyID"] : <any>null;
			this.agencyName = _data["agencyName"] !== undefined ? _data["agencyName"] : <any>null;
			this.agencyLogoUrl = _data["agencyLogoUrl"] !== undefined ? _data["agencyLogoUrl"] : <any>null;
		}
	}

	static fromJS(data: any): AgencyData {
		data = typeof data === 'object' ? data : {};
		let result = new AgencyData();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["agencyID"] = this.agencyID !== undefined ? this.agencyID : <any>null;
		data["agencyName"] = this.agencyName !== undefined ? this.agencyName : <any>null;
		data["agencyLogoUrl"] = this.agencyLogoUrl !== undefined ? this.agencyLogoUrl : <any>null;
		return data;
	}
}

/** Dati dell'agenzia dell'utente */
export interface IAgencyData {
	/** ID del contatto agenzia */
	agencyID?: number;
	/** Nome visualizzato del contatto */
	agencyName?: string;
	/** Url del logo dell'agenzia, se ce l'ha */
	agencyLogoUrl?: string | null;
}

export class DebugData implements IDebugData {
	/** Se true il server è compilato in debug */
	isDebug?: boolean;
	/** IP/Nome del server del database Naar7 */
	naarDatabaseServer?: string | null;
	/** Nome del database Naar7 */
	naarDatabaseName?: string | null;
	/** IP/Nome del server del database NaarHH */
	hhDatabaseServer?: string | null;
	/** Nome del database NaarHH */
	hhDatabaseName?: string | null;
	/** IP/Nome del server del database NaarDocs */
	docsDatabaseServer?: string | null;
	/** Nome del database NaarDocs */
	docsDatabaseName?: string | null;
	/** Coda delle richieste al pricer */
	pricerQueueName?: string | null;
	/** Coda delle richiestea all'agent */
	agentQueueName?: string | null;

	constructor(data?: IDebugData) {
		if (data) {
			for (var property in data) {
				if (data.hasOwnProperty(property))
					(<any>this)[property] = (<any>data)[property];
			}
		}
	}

	init(_data?: any) {
		if (_data) {
			this.isDebug = _data["isDebug"] !== undefined ? _data["isDebug"] : <any>null;
			this.naarDatabaseServer = _data["naarDatabaseServer"] !== undefined ? _data["naarDatabaseServer"] : <any>null;
			this.naarDatabaseName = _data["naarDatabaseName"] !== undefined ? _data["naarDatabaseName"] : <any>null;
			this.hhDatabaseServer = _data["hhDatabaseServer"] !== undefined ? _data["hhDatabaseServer"] : <any>null;
			this.hhDatabaseName = _data["hhDatabaseName"] !== undefined ? _data["hhDatabaseName"] : <any>null;
			this.docsDatabaseServer = _data["docsDatabaseServer"] !== undefined ? _data["docsDatabaseServer"] : <any>null;
			this.docsDatabaseName = _data["docsDatabaseName"] !== undefined ? _data["docsDatabaseName"] : <any>null;
			this.pricerQueueName = _data["pricerQueueName"] !== undefined ? _data["pricerQueueName"] : <any>null;
			this.agentQueueName = _data["agentQueueName"] !== undefined ? _data["agentQueueName"] : <any>null;
		}
	}

	static fromJS(data: any): DebugData {
		data = typeof data === 'object' ? data : {};
		let result = new DebugData();
		result.init(data);
		return result;
	}

	toJSON(data?: any) {
		data = typeof data === 'object' ? data : {};
		data["isDebug"] = this.isDebug !== undefined ? this.isDebug : <any>null;
		data["naarDatabaseServer"] = this.naarDatabaseServer !== undefined ? this.naarDatabaseServer : <any>null;
		data["naarDatabaseName"] = this.naarDatabaseName !== undefined ? this.naarDatabaseName : <any>null;
		data["hhDatabaseServer"] = this.hhDatabaseServer !== undefined ? this.hhDatabaseServer : <any>null;
		data["hhDatabaseName"] = this.hhDatabaseName !== undefined ? this.hhDatabaseName : <any>null;
		data["docsDatabaseServer"] = this.docsDatabaseServer !== undefined ? this.docsDatabaseServer : <any>null;
		data["docsDatabaseName"] = this.docsDatabaseName !== undefined ? this.docsDatabaseName : <any>null;
		data["pricerQueueName"] = this.pricerQueueName !== undefined ? this.pricerQueueName : <any>null;
		data["agentQueueName"] = this.agentQueueName !== undefined ? this.agentQueueName : <any>null;
		return data;
	}
}

export interface IDebugData {
	/** Se true il server è compilato in debug */
	isDebug?: boolean;
	/** IP/Nome del server del database Naar7 */
	naarDatabaseServer?: string | null;
	/** Nome del database Naar7 */
	naarDatabaseName?: string | null;
	/** IP/Nome del server del database NaarHH */
	hhDatabaseServer?: string | null;
	/** Nome del database NaarHH */
	hhDatabaseName?: string | null;
	/** IP/Nome del server del database NaarDocs */
	docsDatabaseServer?: string | null;
	/** Nome del database NaarDocs */
	docsDatabaseName?: string | null;
	/** Coda delle richieste al pricer */
	pricerQueueName?: string | null;
	/** Coda delle richiestea all'agent */
	agentQueueName?: string | null;
}

export enum EOperatore {
	Indefinito = "Indefinito",
	Naar = "Naar",
	NaarFrance = "NaarFrance",
	NaarGermany = "NaarGermany",
	Aviomar = "Aviomar",
	NaarBenelux = "NaarBenelux",
}

/** Form di login */
export class LoginRequest extends ApiRequest implements ILoginRequest {
    /** Nome utente */
    username!: string;
    /** Password */
    password!: string;
    /** Eventuale codice di cross login per impersonare un altro utente */
    crossLoginCode?: string | null;

    constructor(data?: ILoginRequest) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.username = _data["username"] !== undefined ? _data["username"] : <any>null;
            this.password = _data["password"] !== undefined ? _data["password"] : <any>null;
            this.crossLoginCode = _data["crossLoginCode"] !== undefined ? _data["crossLoginCode"] : <any>null;
        }
    }

    static override fromJS(data: any): LoginRequest {
        data = typeof data === 'object' ? data : {};
        let result = new LoginRequest();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username !== undefined ? this.username : <any>null;
        data["password"] = this.password !== undefined ? this.password : <any>null;
        data["crossLoginCode"] = this.crossLoginCode !== undefined ? this.crossLoginCode : <any>null;
        super.toJSON(data);
        return data;
    }
}

/** Form di login */
export interface ILoginRequest extends IApiRequest {
    /** Nome utente */
    username: string;
    /** Password */
    password: string;
    /** Eventuale codice di cross login per impersonare un altro utente */
    crossLoginCode?: string | null;
}