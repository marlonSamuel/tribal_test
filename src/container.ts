import { asClass, createContainer } from "awilix";
import { TestService } from "./services/TestService";
import express from 'express';
import { scopePerRequest } from "awilix-express";
import { UserService } from "./services/UserService";
import { TribalService } from "./services/TribalService";

export default (app: express.Application)=>{
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        testService: asClass(TestService).scoped(),
        userService: asClass(UserService).scoped(),
        tribalService: asClass(TribalService).scoped()
    });

    app.use(scopePerRequest(container))
};