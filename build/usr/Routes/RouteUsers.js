"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeUser = void 0;
const express_1 = require("express");
const ConttrollerUsers_1 = require("../Providers/pg/ConttrollerUsers");
const connect_1 = require("../connect");
connect_1.client.connect(); /** Somente no RouterUSers ?? */
const routeUser = (0, express_1.Router)();
exports.routeUser = routeUser;
const conttrollersUSers = new ConttrollerUsers_1.ConttrollersUSers();
routeUser.get('/', conttrollersUSers.index);
routeUser.get('/login/:username', conttrollersUSers.login);
routeUser.get('/users', conttrollersUSers.select);
routeUser.post('/users', conttrollersUSers.insert);
routeUser.post('/users', conttrollersUSers.update);
routeUser.post('/users', conttrollersUSers.delete);
