import { Router } from "express"
import { ConttrollerBrands } from "../Providers/pg/ConttrollerBrands";

const routeBrand = Router();
const conttrollersBrands = new ConttrollerBrands()

routeBrand.get('/', conttrollersBrands.index)
// routeBrand.get('/brands/:id', conttrollersBrands.select)
routeBrand.get('/brands', conttrollersBrands.select)
// routeBrand.post('/brands', conttrollersBrands.insert)

export { routeBrand }