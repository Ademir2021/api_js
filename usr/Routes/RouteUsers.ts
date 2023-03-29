import { Router } from "express"
import { ConttrollersUSers } from "../Providers/pg/ConttrollerUsers";

import { client } from "../connect"
client.connect() /** Somente no RouterUSers ?? */

const routeUser = Router();
const conttrollersUSers = new ConttrollersUSers()

routeUser.get('/', conttrollersUSers.index)
routeUser.get('/login/:username', conttrollersUSers.login)
routeUser.get('/users', conttrollersUSers.select)
routeUser.post('/users', conttrollersUSers.insert)
routeUser.post('/users', conttrollersUSers.update)
routeUser.post('/users', conttrollersUSers.delete)

 export { routeUser }