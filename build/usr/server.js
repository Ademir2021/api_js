"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RouteUsers_1 = require("./Routes/RouteUsers");
const RouteProducts_1 = require("./Routes/RouteProducts");
const RouteSales_1 = require("./Routes/RouteSales");
const RoutePersons_1 = require("./Routes/RoutePersons");
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express_1.default.json());
app.use(RouteUsers_1.routeUser);
app.use(RouteProducts_1.routeProduct);
app.use(RouteSales_1.routeSale);
app.use(RoutePersons_1.routePerson);
app.use((error, request, response, next) => {
    return response.json({
        status: "Error",
        message: error.message,
    });
});
app.listen(PORT, () => console.log("server is runing on", { PORT }));
