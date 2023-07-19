import { Router } from "express"
import { ConttrollersPaymentPagSeguro } from "../Providers/pg/ConttrollerPaymentPagSeguro";

const routePaymentPagSeguro = Router();
const conttrollersPix = new ConttrollersPaymentPagSeguro()

routePaymentPagSeguro .get('/pix', conttrollersPix.selectPix)
routePaymentPagSeguro .post('/pix', conttrollersPix.insertPix)
routePaymentPagSeguro .get('/boleto', conttrollersPix.selectBoleto)

export { routePaymentPagSeguro }