
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);


import express from 'express';
import { TestService } from './services/TestService';
import { loadControllers } from 'awilix-express';
import loadContainer from './container'
import { sequelize } from './common/mysql.persistence';
import {expressjwt} from 'express-jwt'

const app: express.Application = express();

try {
    sequelize.authenticate().then(()=>{
        console.log("Database online")
    })
} catch (error) {
    console.log("Error de conección ", error)
}

//JSON SUPORT
app.use(express.json());

loadContainer(app);

if (process.env.jwt_secret) {
    /*app.use(expressjwt({
        secret: process.env.jwt_secret,
        algorithms: ['HS256']
    }).unless({ path: ['/', '/check','/users/login']}));*/
}

app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));

export {app};