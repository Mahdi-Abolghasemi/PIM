import { Router } from "express";
const routers: Router = require("express").Router();
import Contact_Controller from "./Controllers/Contact_Controller";
import Auth_Controller from "./Controllers/Auth_Controller";


routers.use("/contact", Contact_Controller);
routers.use("/auth", Auth_Controller);


export default routers;
