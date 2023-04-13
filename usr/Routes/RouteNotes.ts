import { Router } from "express"
import { ConttrollersNotes } from '../Providers/pg/ConttrollerNotes';


const routeNote = Router();
const conttrollersNotes = new ConttrollersNotes()

routeNote.get('/', conttrollersNotes.index)
routeNote.get('/note/:num_nota', conttrollersNotes.select)

export { routeNote }