import { Router } from "express"
import { ConttrollerCities } from "../Providers/pg/ConttrollerCities";

const routeCity = Router();
const conttrollersCities = new ConttrollerCities()

routeCity.get('/', conttrollersCities.index)
// routeCity.get('/cities/:id', conttrollersCities.select)
routeCity.get('/cities', conttrollersCities.select)
// routeCity.post('/cities', conttrollersCities.insert)

export { routeCity }