import express = require("express");
import { Express } from "express";
const bodyParser = require("body-parser");
const cors = require('cors')
import routers from "./routers";
import objDbConection from "./dbConnection";
require('dotenv').config();

async function start() {
    try {
        await objDbConection.Connection();

        var corsOptions = {
            origin: `${process.env.FRONTEND_ADDRESS}`,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: [
                "Content-Type",
                "Authorization",
            ]
        };

        const server: Express = express();
        server.use(cors(corsOptions));
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        //{api/controller_name/action_name}
        server.use("/api", routers);

        server.listen(process.env.SERVER_PORT, (): void => {
            console.log(
                `Server started on http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}; ` + `press Ctrl-C to trminate.`,
            );
        });
    }
    catch (ex: unknown) {
        console.error("Error in start server. ", ex);
    }
}

start();
