import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { IAuth_Service } from "../Service/IServices/IAuth_Service";
import { Auth_Service } from "../Service/Services/Auth_Service";
import { Auth_Model, Auth_Result } from "../Domain/Model/Auth_Model";

const objAuth: IAuth_Service<Auth_Model, Auth_Result> = new Auth_Service();

routers.post("/logIn", logIn);
routers.post("/registration", registration);
routers.get("/getProfile", objAuth.AdminOnly, getProfile);
routers.put("/editProfile", objAuth.AdminOnly, editProfile);
routers.put("/changePassword", objAuth.AdminOnly, changePassword);
// routers.get("/forgotPassword", get);

//*************************************************** */

async function logIn(req: Request, res: Response): Promise<void> {
    let result: Auth_Result = <Auth_Result>{};
    await objAuth.LogIn(req.body.userName, req.body.password).then(res => result = res);
    res.status(result.success ? 200 : 401).send(result);
}

async function registration(req: Request, res: Response): Promise<void> {
    let result: boolean = false;
    await objAuth.Registration(req.body).then(res => result = res);
    res.status(result ? 200 : 500).send(result);
}

function getProfile(req: Request, res: Response): void {
    objAuth.GetProfile(req.body.email).then(val => res.send(val));
}

async function changePassword(req: Request, res: Response): Promise<void> {
    let result: boolean = false;
    await objAuth.ChangePassword(req.body.email, req.body.oldPass, req.body.newPass).then(val => result = val);
    res.status(result ? 200 : 401).send(result);
}

async function editProfile(req: Request, res: Response): Promise<void> {
    let result: boolean = false;
    await objAuth.EditProfile(req.body).then(val => result = val);
    res.status(result ? 200 : 401).send(result);
}

export default routers;