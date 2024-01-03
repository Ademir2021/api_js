import { Router } from "express"
import { ConttrollerSectors } from "../Providers/pg/ConttrollerSectors";

const routeSector = Router();
const conttrollerSectors = new ConttrollerSectors()

routeSector.get('/', conttrollerSectors.index)
// routeBrand.get('/brands/:id', conttrollersBrands.select)
routeSector.get('/sectors', conttrollerSectors.select)
// routeBrand.post('/brands', conttrollersBrands.insert)

export { routeSector }