import { Router } from "express"
import { ConttrollersPaymentPagSeguro } from "../Providers/pg/ConttrollerPaymentPagSeguro";

const routePaymentPagSeguro = Router();
const conttrollersPix = new ConttrollersPaymentPagSeguro()

routePaymentPagSeguro .post('/pix', conttrollersPix.insertPix)
routePaymentPagSeguro .post('/boleto', conttrollersPix.insertBoleto)
routePaymentPagSeguro .post('/card', conttrollersPix.insertCard)

export { routePaymentPagSeguro }