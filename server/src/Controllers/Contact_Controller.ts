import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { Contact_Model } from "../Domain/Model/Contact_Model";
import { SearchContact_Model } from "../Domain/Model/SearchContact_Model";
import { IContact_Service } from "../Service/IServices/IContact_Service";
import { Contact_Service } from "../Service/Services/Contact_Service";
import { IAuth_Service } from "../Service/IServices/IAuth_Service";
import { Auth_Service } from "../Service/Services/Auth_Service";
import { Auth_Model, Auth_Result } from "../Domain/Model/Auth_Model";


const objContact: IContact_Service<Contact_Model, SearchContact_Model> = new Contact_Service()
const objAuth: IAuth_Service<Auth_Model, Auth_Result> = new Auth_Service();

routers.get("/getAll", objAuth.AdminOnly, getAll);
routers.post("/get/:id", objAuth.AdminOnly, get);
routers.post("/search", objAuth.AdminOnly, search);
routers.post("/add", objAuth.AdminOnly, add);
routers.put("/edit", objAuth.AdminOnly, edit);
routers.put("/remove/:id", objAuth.AdminOnly, remove);

//*************************************************** */

function getAll(req: Request, res: Response): void {
    objContact.GetAll().then(val => res.send(val));
}

function get(req: Request, res: Response): void {
    objContact.Get(req.params.id).then(val => res.send(val));
}

function search(req: Request, res: Response): void {
    objContact.Search(req.body).then(val => res.send(val));
}

function add(req: Request, res: Response): void {
    objContact.Add(req.body).then(val => res.send(val));
}

function edit(req: Request, res: Response): void {
    objContact.Edit(req.body).then(val => res.send(val));
}

function remove(req: Request, res: Response): void {
    objContact.Remove(req.params.id).then(val => res.send(val));
}

export default routers;