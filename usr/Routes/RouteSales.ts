import { Router } from "express"
import { ConttrollersSales } from "../Providers/pg/ConttrollerSales";

const routeSale = Router();
const conttrollersSales = new ConttrollersSales()

routeSale.get('/', conttrollersSales.index)
routeSale.get('/sales', conttrollersSales.select)
routeSale.post('/sales', conttrollersSales.insert)

export { routeSale }