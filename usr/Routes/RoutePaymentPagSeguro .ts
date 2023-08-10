import { Router } from "express"
import { ConttrollersPaymentPagSeguro } from "../Providers/pg/ConttrollerPaymentPagSeguro";

const routePaymentPagSeguro = Router();
const conttrollersPaymentPagSeguro = new ConttrollersPaymentPagSeguro()

routePaymentPagSeguro.post('/pix', conttrollersPaymentPagSeguro.insertPix)
routePaymentPagSeguro.post('/boleto', conttrollersPaymentPagSeguro.insertBoleto)
routePaymentPagSeguro.post('/card', conttrollersPaymentPagSeguro.insertCard)
routePaymentPagSeguro.get('/publickey', conttrollersPaymentPagSeguro.publicKeyPagSeguro)

export { routePaymentPagSeguro }