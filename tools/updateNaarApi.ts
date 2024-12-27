/*
 * = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
 * 
 * File: updateNaarApi.ts
 * Project: ionic-angular-course
 * Created Date: Fr Dec 2024
 * Author: Oscar Manzelli
 * 
 * Last Modified: Fri Dec 27 2024
 * Modified By: Oscar Manzelli
 * 
 * Copyright (c) 2024 Naar Tour Operator spa
 * 
 * HISTORY:
 * Date    	By	Comments
 * --------	---	---------------------------------------------------------
 */

import http from 'http';
import path from 'path';
import fs from 'fs';
import util from 'util';

const fsWriteFile = util.promisify(fs.writeFile);

// Preambolo da mettere in testa al file .ts che si ottiene con l'import necessario.
const importCode = `import {ApiClientBase, ApiConfig} from './api-client-base';
`;

const serverUrl = 'http://localhost:4201/';
const typescriptClientUrl = serverUrl + 'utility/typescript-client';

console.log('Chiamo ' + typescriptClientUrl);

const outputFile = path.join(__dirname, '..', 'src', 'app', 'services', 'backend', 'naar-api-client.ts');

const data = JSON.stringify(
	{
		url: serverUrl + 'swagger/1.0/swagger.json',
		clientClassName: 'NaarApi',
		typeScriptVersion: 5.4
	}
);

const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length
	}
};

let tsCode = importCode;
let totalData = 0;

const req: http.ClientRequest = http.request(typescriptClientUrl, options, (res: http.IncomingMessage) => {

	res.on('data', data => {
		// I dati si ricevono a blocchi di 64KB circa
		if (data instanceof Buffer) {
			tsCode += data.toString();
			totalData += data.length;
			console.log('Ricevuti ' + totalData + ' bytes');
		}
	});

	res.on('end', async () => {
		// Risposta completa, posso scrivere il nuovo file
		console.log('Scrivo ' + tsCode.length + ' bytes in ' + outputFile);
		await fsWriteFile(outputFile, tsCode);
	});
});

req.on('error', err => {
	console.error(err);
});

req.write(data);
req.end();



