import { Router } from "express"
import { ConttrollersPersons } from '../Providers/pg/ConttrollerPersons';

const routePerson = Router();
const conttrollersPersons = new ConttrollersPersons()

routePerson.get('/', conttrollersPersons.index)
routePerson.get('/persons', conttrollersPersons.select)
routePerson.get('/person/:user_id', conttrollersPersons.selectOneUser)
routePerson.post('/persons', conttrollersPersons.insert)
routePerson.put('/persons/:id', conttrollersPersons.update)
routePerson.delete('/persons/:id', conttrollersPersons.delete)

export { routePerson }