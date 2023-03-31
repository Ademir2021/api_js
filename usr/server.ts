import express, { NextFunction, Request, Response } from 'express';
import { routeUser } from './Routes/RouteUsers';
import { routeProduct } from './Routes/RouteProducts';
import { routeSale } from './Routes/RouteSales';
import { routePerson } from './Routes/RoutePersons';

const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

app.use(routeUser);
app.use(routeProduct);
app.use(routeSale);
app.use(routePerson);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        return response.json({
            status: "Error",
            message: error.message,
        })
    })

app.listen(PORT, () => console.log("server is runing on", { PORT }));


