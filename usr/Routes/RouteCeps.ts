import { Router } from "express"
import { ConttrollerCeps } from "../Providers/pg/ConttrollerCeps";

const routeCep = Router();
const conttrollersCeps = new ConttrollerCeps()

routeCep.get('/', conttrollersCeps.index)
// routeCep.get('/ceps/:id', conttrollersCeps.select)
routeCep.get('/ceps', conttrollersCeps.select)
routeCep.post('/ceps', conttrollersCeps.insert)

export { routeCep }