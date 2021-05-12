import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import {shopService } from '../jasons/services/shopServices';
import {shopRouter } from '../jasons/routers/shoprouter';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    expressSession({
        secret: 'Tecky Academy teaches typescript',
        resave: true,
        saveUninitialized: true,
    })
);

const knexConfig = require("./knexfile");
// console.log(knexConfig);
// console.log(knexConfig['development']);
import Knex from "knex";
const knex = Knex(knexConfig['development']);

import {isLoggedInHtml} from './guards';

const shopsService= new  shopService(knex)
const shopsRouter= new shopRouter (shopsService)

const API_VERSION = '/api/v1';
app.use(`${API_VERSION}/shop`, shopsRouter.router());//************* */

// import {UserService} from "./services/UserService";
// import {UserRouter} from "./routers/UserRouter";
// const userService = new UserService(knex);
// const userRouter = new UserRouter(userService);

// import {StudentService} from "./services/StudentService";
// import {StudentRouter} from "./routers/StudentRouter";
// const studentService = new StudentService(knex);
// const studentRouter = new StudentRouter(studentService);


// app.use(`${API_VERSION}/users`, userRouter.router());
// app.use(`${API_VERSION}/students`, studentRouter.router());

app.use(express.static(path.join(__dirname, './public')));
app.use(isLoggedInHtml, express.static(path.join(__dirname, './private')));

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});
