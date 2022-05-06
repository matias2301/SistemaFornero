import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JSONLoaderHelper {

    constructor() { }

    async get(folder: string, jsonName: string = null) {
        if (jsonName === null) {
            jsonName = folder;
        }

        return new Promise(async (resolve, reject) => {
            try {
                const rawJSON = await fetch(`assets/json/${folder}/${jsonName}.json`) as any;
                resolve(await rawJSON.json());
            } catch (e) {
                reject(e);
            }
        });
    }
}