"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routePaymentPagSeguro = void 0;
const express_1 = require("express");
const ConttrollerPaymentPagSeguro_1 = require("../Providers/pg/ConttrollerPaymentPagSeguro");
const routePaymentPagSeguro = (0, express_1.Router)();
exports.routePaymentPagSeguro = routePaymentPagSeguro;
const conttrollersPix = new ConttrollerPaymentPagSeguro_1.ConttrollersPaymentPagSeguro();
routePaymentPagSeguro.get('/pix', conttrollersPix.selectPix);
routePaymentPagSeguro.post('/pix', conttrollersPix.insertPix);
routePaymentPagSeguro.get('/boleto', conttrollersPix.selectBoleto);