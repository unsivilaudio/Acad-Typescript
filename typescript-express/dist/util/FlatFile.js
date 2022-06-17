"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class FlatFile {
    constructor(name, filename) {
        this.name = name;
        this.filename = filename;
        this.path = path_1.default.join(process.cwd(), 'data', this.filename);
    }
    getStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileData = yield promises_1.default.readFile(this.path, 'utf-8');
                const data = JSON.parse(fileData);
                this.logInfo('Successfully retrieved data.');
                return data;
            }
            catch (err) {
                this.logError(err.message);
            }
        });
    }
    setStorage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringifiedData = JSON.stringify(data, null, 2);
            try {
                yield promises_1.default.writeFile(this.path, stringifiedData, 'utf-8');
                this.logInfo('Successfully saved data.');
            }
            catch (err) {
                this.logError(err.message);
            }
        });
    }
    appendStorage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileData = yield this.getStorage();
                if (Array.isArray(fileData)) {
                    fileData.push(data);
                }
                else {
                    fileData = Object.assign(fileData, data);
                }
                yield this.setStorage(fileData);
            }
            catch (err) {
                this.logError(err.message);
            }
        });
    }
    logError(msg) {
        console.error(`[FlatFile][${this.name}][ERROR]:`, msg);
    }
    logInfo(msg) {
        console.error(`[FlatFile][${this.name}][INFO]:`, msg);
    }
}
exports.FlatFile = FlatFile;
