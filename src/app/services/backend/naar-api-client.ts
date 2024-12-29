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

export enum ELingua {
    Italiano = "Italiano",
    English = "English",
    Francais = "Francais",
    Deutsch = "Deutsch",
    Dutch = "Dutch",
    Spanish = "Spanish",
    Portuguese = "Portuguese",
    Debug = "Debug",
}

export interface ILocalizedRequest extends IApiRequest {
    /** Lingua richiesta */
    lingua: ELingua;
}
export class LocalizedRequest extends ApiRequest implements ILocalizedRequest {
    /** Lingua richiesta */
    lingua!: ELingua;

    constructor(data?: ILocalizedRequest) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.lingua = _data["lingua"] !== undefined ? _data["lingua"] : <any>null;
        }
    }

    static override fromJS(data: any): LocalizedRequest {
        data = typeof data === 'object' ? data : {};
        let result = new LocalizedRequest();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["lingua"] = this.lingua !== undefined ? this.lingua : <any>null;
        super.toJSON(data);
        return data;
    }
}

export interface ISiteRequest extends ILocalizedRequest {
    siteID?: number;
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

export class SiteRequest extends LocalizedRequest implements ISiteRequest {
    siteID?: number;

    constructor(data?: ISiteRequest) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.siteID = _data["siteID"] !== undefined ? _data["siteID"] : <any>null;
        }
    }

    static override fromJS(data: any): SiteRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SiteRequest();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["siteID"] = this.siteID !== undefined ? this.siteID : <any>null;
        super.toJSON(data);
        return data;
    }
}

export interface ISearchOrdersRequest extends ISiteRequest {
    offertaID?: number | null;
    agenziaID?: number | null;
    impiegatoID?: number | null;
    soloUtente?: boolean;
    soloConfermate?: boolean;
    soloIncomplete?: boolean;
    soloAnnullate?: boolean;
    dataCreazione?: string | null;
    operatore?: EOperatore | null;
    partenzaDal?: string | null;
    partenzaAl?: string | null;
    confermaDal?: string | null;
    confermaAl?: string | null;
    descrizione?: string | null;
    nomePax?: string | null;
    servizioID?: number | null;
    partitaIva?: string | null;
}

export class SearchOrdersRequest extends SiteRequest implements ISearchOrdersRequest {
    offertaID?: number | null;
    agenziaID?: number | null;
    impiegatoID?: number | null;
    soloUtente?: boolean;
    soloConfermate?: boolean;
    soloIncomplete?: boolean;
    soloAnnullate?: boolean;
    dataCreazione?: string | null;
    operatore?: EOperatore | null;
    partenzaDal?: string | null;
    partenzaAl?: string | null;
    confermaDal?: string | null;
    confermaAl?: string | null;
    descrizione?: string | null;
    nomePax?: string | null;
    servizioID?: number | null;
    partitaIva?: string | null;

    constructor(data?: ISearchOrdersRequest) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.offertaID = _data["offertaID"] !== undefined ? _data["offertaID"] : <any>null;
            this.agenziaID = _data["agenziaID"] !== undefined ? _data["agenziaID"] : <any>null;
            this.impiegatoID = _data["impiegatoID"] !== undefined ? _data["impiegatoID"] : <any>null;
            this.soloUtente = _data["soloUtente"] !== undefined ? _data["soloUtente"] : <any>null;
            this.soloConfermate = _data["soloConfermate"] !== undefined ? _data["soloConfermate"] : <any>null;
            this.soloIncomplete = _data["soloIncomplete"] !== undefined ? _data["soloIncomplete"] : <any>null;
            this.soloAnnullate = _data["soloAnnullate"] !== undefined ? _data["soloAnnullate"] : <any>null;
            this.dataCreazione = _data["dataCreazione"] !== undefined ? _data["dataCreazione"] : <any>null;
            this.operatore = _data["operatore"] !== undefined ? _data["operatore"] : <any>null;
            this.partenzaDal = _data["partenzaDal"] !== undefined ? _data["partenzaDal"] : <any>null;
            this.partenzaAl = _data["partenzaAl"] !== undefined ? _data["partenzaAl"] : <any>null;
            this.confermaDal = _data["confermaDal"] !== undefined ? _data["confermaDal"] : <any>null;
            this.confermaAl = _data["confermaAl"] !== undefined ? _data["confermaAl"] : <any>null;
            this.descrizione = _data["descrizione"] !== undefined ? _data["descrizione"] : <any>null;
            this.nomePax = _data["nomePax"] !== undefined ? _data["nomePax"] : <any>null;
            this.servizioID = _data["servizioID"] !== undefined ? _data["servizioID"] : <any>null;
            this.partitaIva = _data["partitaIva"] !== undefined ? _data["partitaIva"] : <any>null;
        }
    }

    static override fromJS(data: any): SearchOrdersRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SearchOrdersRequest();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["offertaID"] = this.offertaID !== undefined ? this.offertaID : <any>null;
        data["agenziaID"] = this.agenziaID !== undefined ? this.agenziaID : <any>null;
        data["impiegatoID"] = this.impiegatoID !== undefined ? this.impiegatoID : <any>null;
        data["soloUtente"] = this.soloUtente !== undefined ? this.soloUtente : <any>null;
        data["soloConfermate"] = this.soloConfermate !== undefined ? this.soloConfermate : <any>null;
        data["soloIncomplete"] = this.soloIncomplete !== undefined ? this.soloIncomplete : <any>null;
        data["soloAnnullate"] = this.soloAnnullate !== undefined ? this.soloAnnullate : <any>null;
        data["dataCreazione"] = this.dataCreazione !== undefined ? this.dataCreazione : <any>null;
        data["operatore"] = this.operatore !== undefined ? this.operatore : <any>null;
        data["partenzaDal"] = this.partenzaDal !== undefined ? this.partenzaDal : <any>null;
        data["partenzaAl"] = this.partenzaAl !== undefined ? this.partenzaAl : <any>null;
        data["confermaDal"] = this.confermaDal !== undefined ? this.confermaDal : <any>null;
        data["confermaAl"] = this.confermaAl !== undefined ? this.confermaAl : <any>null;
        data["descrizione"] = this.descrizione !== undefined ? this.descrizione : <any>null;
        data["nomePax"] = this.nomePax !== undefined ? this.nomePax : <any>null;
        data["servizioID"] = this.servizioID !== undefined ? this.servizioID : <any>null;
        data["partitaIva"] = this.partitaIva !== undefined ? this.partitaIva : <any>null;
        super.toJSON(data);
        return data;
    }
}

export class SearchOrdersResponse extends OkApiResponse implements ISearchOrdersResponse {
    trips?: OrderListRow[];

    constructor(data?: ISearchOrdersResponse) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            if (Array.isArray(_data["trips"])) {
                this.trips = [] as any;
                for (let item of _data["trips"])
                    this.trips!.push(OrderListRow.fromJS(item));
            }
            else {
                this.trips = <any>null;
            }
        }
    }

    static override fromJS(data: any): SearchOrdersResponse {
        data = typeof data === 'object' ? data : {};
        let result = new SearchOrdersResponse();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.trips)) {
            data["trips"] = [];
            for (let item of this.trips)
                data["trips"].push(item.toJSON());
        }
        super.toJSON(data);
        return data;
    }
}

export interface ISearchOrdersResponse extends IOkApiResponse {
    trips?: OrderListRow[];
}

export class OrderListRow implements IOrderListRow {
    offertaID?: number;
    descrizione?: string | null;
    clienti?: string | null;
    destinazione?: string | null;
    creazione?: string;
    partenza?: string;
    conferma?: string | null;
    totale?: number;
    agenzia?: string | null;
    telefono?: string | null;
    email?: string | null;
    categoriaAgenzia?: string | null;
    impiegato?: string | null;
    utentePreventivo?: string | null;
    utenteConferma?: string | null;
    annullataTO?: boolean;
    annullataADV?: boolean;
    sales?: string | null;
    pagamento?: string | null;
    saldato?: number;
    compensato?: number;
    saldare?: number;
    duplicabileAgenzia?: boolean;
    coverUrl?: string | null;

    constructor(data?: IOrderListRow) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.offertaID = _data["offertaID"] !== undefined ? _data["offertaID"] : <any>null;
            this.descrizione = _data["descrizione"] !== undefined ? _data["descrizione"] : <any>null;
            this.clienti = _data["clienti"] !== undefined ? _data["clienti"] : <any>null;
            this.destinazione = _data["destinazione"] !== undefined ? _data["destinazione"] : <any>null;
            this.creazione = _data["creazione"] !== undefined ? _data["creazione"] : <any>null;
            this.partenza = _data["partenza"] !== undefined ? _data["partenza"] : <any>null;
            this.conferma = _data["conferma"] !== undefined ? _data["conferma"] : <any>null;
            this.totale = _data["totale"] !== undefined ? _data["totale"] : <any>null;
            this.agenzia = _data["agenzia"] !== undefined ? _data["agenzia"] : <any>null;
            this.telefono = _data["telefono"] !== undefined ? _data["telefono"] : <any>null;
            this.email = _data["email"] !== undefined ? _data["email"] : <any>null;
            this.categoriaAgenzia = _data["categoriaAgenzia"] !== undefined ? _data["categoriaAgenzia"] : <any>null;
            this.impiegato = _data["impiegato"] !== undefined ? _data["impiegato"] : <any>null;
            this.utentePreventivo = _data["utentePreventivo"] !== undefined ? _data["utentePreventivo"] : <any>null;
            this.utenteConferma = _data["utenteConferma"] !== undefined ? _data["utenteConferma"] : <any>null;
            this.annullataTO = _data["annullataTO"] !== undefined ? _data["annullataTO"] : <any>null;
            this.annullataADV = _data["annullataADV"] !== undefined ? _data["annullataADV"] : <any>null;
            this.sales = _data["sales"] !== undefined ? _data["sales"] : <any>null;
            this.pagamento = _data["pagamento"] !== undefined ? _data["pagamento"] : <any>null;
            this.saldato = _data["saldato"] !== undefined ? _data["saldato"] : <any>null;
            this.compensato = _data["compensato"] !== undefined ? _data["compensato"] : <any>null;
            this.saldare = _data["saldare"] !== undefined ? _data["saldare"] : <any>null;
            this.duplicabileAgenzia = _data["duplicabileAgenzia"] !== undefined ? _data["duplicabileAgenzia"] : <any>null;
            this.coverUrl = _data["coverUrl"] !== undefined ? _data["coverUrl"] : <any>null;
        }
    }

    static fromJS(data: any): OrderListRow {
        data = typeof data === 'object' ? data : {};
        let result = new OrderListRow();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["offertaID"] = this.offertaID !== undefined ? this.offertaID : <any>null;
        data["descrizione"] = this.descrizione !== undefined ? this.descrizione : <any>null;
        data["clienti"] = this.clienti !== undefined ? this.clienti : <any>null;
        data["destinazione"] = this.destinazione !== undefined ? this.destinazione : <any>null;
        data["creazione"] = this.creazione !== undefined ? this.creazione : <any>null;
        data["partenza"] = this.partenza !== undefined ? this.partenza : <any>null;
        data["conferma"] = this.conferma !== undefined ? this.conferma : <any>null;
        data["totale"] = this.totale !== undefined ? this.totale : <any>null;
        data["agenzia"] = this.agenzia !== undefined ? this.agenzia : <any>null;
        data["telefono"] = this.telefono !== undefined ? this.telefono : <any>null;
        data["email"] = this.email !== undefined ? this.email : <any>null;
        data["categoriaAgenzia"] = this.categoriaAgenzia !== undefined ? this.categoriaAgenzia : <any>null;
        data["impiegato"] = this.impiegato !== undefined ? this.impiegato : <any>null;
        data["utentePreventivo"] = this.utentePreventivo !== undefined ? this.utentePreventivo : <any>null;
        data["utenteConferma"] = this.utenteConferma !== undefined ? this.utenteConferma : <any>null;
        data["annullataTO"] = this.annullataTO !== undefined ? this.annullataTO : <any>null;
        data["annullataADV"] = this.annullataADV !== undefined ? this.annullataADV : <any>null;
        data["sales"] = this.sales !== undefined ? this.sales : <any>null;
        data["pagamento"] = this.pagamento !== undefined ? this.pagamento : <any>null;
        data["saldato"] = this.saldato !== undefined ? this.saldato : <any>null;
        data["compensato"] = this.compensato !== undefined ? this.compensato : <any>null;
        data["saldare"] = this.saldare !== undefined ? this.saldare : <any>null;
        data["duplicabileAgenzia"] = this.duplicabileAgenzia !== undefined ? this.duplicabileAgenzia : <any>null;
        data["coverUrl"] = this.coverUrl !== undefined ? this.coverUrl : <any>null;
        return data;
    }
}

export interface IOrderListRow {
    offertaID?: number;
    descrizione?: string | null;
    clienti?: string | null;
    destinazione?: string | null;
    creazione?: string;
    partenza?: string;
    conferma?: string | null;
    totale?: number;
    agenzia?: string | null;
    telefono?: string | null;
    email?: string | null;
    categoriaAgenzia?: string | null;
    impiegato?: string | null;
    utentePreventivo?: string | null;
    utenteConferma?: string | null;
    annullataTO?: boolean;
    annullataADV?: boolean;
    sales?: string | null;
    pagamento?: string | null;
    saldato?: number;
    compensato?: number;
    saldare?: number;
    duplicabileAgenzia?: boolean;
    coverUrl?: string | null;
}