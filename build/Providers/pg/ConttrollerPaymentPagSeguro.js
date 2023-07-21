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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConttrollersPaymentPagSeguro = void 0;
const fetch = require('node-fetch');
const authorization = '4D1D1C943B1B49468F2D0B00F5EE914E';
const urlPagseguro = 'https://sandbox.api.pagseguro.com/orders';
class ConttrollersPaymentPagSeguro {
    insertPix(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = request.body;
            let reqs = yield fetch(urlPagseguro, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify(sales)
            });
            let ress = yield reqs.json();
            response.json(ress);
            console.log(ress);
        });
    }
    ;
    insertBoleto(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = request.body;
            let reqs = yield fetch(urlPagseguro, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify(sales)
            });
            let ress = yield reqs.json();
            response.json(ress);
            console.log(ress);
        });
    }
    ;
    insertCard(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = request.body;
            let reqs = yield fetch(urlPagseguro, {
                method: 'POST',
                headers: {
                    'Authorization': authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sales)
            });
            let ress = yield reqs.json();
            response.json(ress);
            console.log(ress);
        });
    }
}
exports.ConttrollersPaymentPagSeguro = ConttrollersPaymentPagSeguro;
