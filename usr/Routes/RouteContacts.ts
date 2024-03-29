import { Router } from "express"
import { ConttrollersContacts } from "../Providers/pg/ConttrollerContacts";

const routeContact = Router();
const conttrollersContacts = new ConttrollersContacts()

routeContact.get('/', conttrollersContacts.index)
routeContact.get('/contacts/:user_id', conttrollersContacts.select)
routeContact.post('/contact', conttrollersContacts.insert)

export { routeContact }