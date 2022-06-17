import fs from 'fs/promises';
import path from 'path';

export class FlatFile {
    private path: string;

    constructor(public name: string, private filename: string) {
        this.path = path.join(process.cwd(), 'data', this.filename);
    }

    async getStorage() {
        try {
            const fileData = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(fileData);
            this.logInfo('Successfully retrieved data.');
            return data;
        } catch (err: any) {
            this.logError(err.message);
        }
    }

    async setStorage(data: { [key: string]: any } | any[]) {
        const stringifiedData = JSON.stringify(data, null, 2);
        try {
            await fs.writeFile(this.path, stringifiedData, 'utf-8');
            this.logInfo('Successfully saved data.');
        } catch (err: any) {
            this.logError(err.message);
        }
    }

    async appendStorage(data: { [key: string]: any }) {
        try {
            let fileData = await this.getStorage();
            if (Array.isArray(fileData)) {
                fileData.push(data);
            } else {
                fileData = Object.assign(fileData, data);
            }

            await this.setStorage(fileData);
        } catch (err: any) {
            this.logError(err.message);
        }
    }

    logError(msg: string) {
        console.error(`[FlatFile][${this.name}][ERROR]:`, msg);
    }

    logInfo(msg: string) {
        console.error(`[FlatFile][${this.name}][INFO]:`, msg);
    }
}
