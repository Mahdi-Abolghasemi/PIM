import { IAuth_Service } from "../IServices/IAuth_Service";
import { Auth_Model, Auth_Result } from "../../Domain/Model/Auth_Model";
import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import { IAuth_Repository } from "../../Repository/IRepository/IAuth_Repository";
import { Auth_Repository } from "../../Repository/Repository/Auth_Repository";
const { createHash } = require('crypto');

export class Auth_Service implements IAuth_Service<Auth_Model, Auth_Result> {
    private objAuth: IAuth_Repository<Auth_Model>;

    constructor() {
        this.objAuth = new Auth_Repository();
    }

    async LogIn(userName: string, password: string): Promise<Auth_Result> {
        let user: Auth_Model = <Auth_Model>{};
        let hashPassword: string = await createHash('sha256').update(password).digest('base64');
        await this.objAuth.Login(userName, hashPassword).then(res => user = res);
        let result: Auth_Result = <Auth_Result>{}

        if (user) {
            result.success = true;
            result.userName = user.email;
            let role = user.role;
            result.token = jwt.sign({ userName, role }, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
        }

        return result;
    }

    async Registration(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        let hashPassword: string = await createHash('sha256').update(profile.password).digest('base64');
        profile.password = hashPassword;
        await this.objAuth.Registration(profile).then(res => result = res);
        return result;
    }

    async GetProfile(email: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{};
        await this.objAuth.GetProfile(email).then(res => user = res);
        return user;
    }

    async ChangePassword(email: string, oldPass: string, newPass: string): Promise<boolean> {
        let user: Auth_Model = <Auth_Model>{};
        let result: boolean = false;
        await this.GetProfile(email).then(res => user = res);

        let hashOldPassword: string = await createHash('sha256').update(oldPass).digest('base64');

        if (user.password === hashOldPassword) {
            let hashNewPassword: string = await createHash('sha256').update(newPass).digest('base64');
            await this.objAuth.ChangePassword(email, hashNewPassword).then(res => result = res);
        }

        return result;
    }

    async EditProfile(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        await this.objAuth.EditProfile(profile).then(res => result = res);
        return result;
    }

    AdminOnly(req: Request, res: Response, next: NextFunction): void {
        let token: string | undefined = req.headers.authorization;

        if (!token) {
            res.status(401).send("Token missing.");
        }

        try {
            let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === "admin") {
                next();
            }
            else {
                res.status(403).send("Access denied");
            }
        }
        catch (ex: unknown) {
            res.status(403).send("Invalid or expired token");
        }
    }
}