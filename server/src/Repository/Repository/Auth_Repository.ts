import { Auth_Model } from "../../Domain/Model/Auth_Model";
import { IAuth_Repository } from "../IRepository/IAuth_Repository";
import objDbConection from "../../dbConnection";

export class Auth_Repository implements IAuth_Repository<Auth_Model> {
    async Login(userName: string, hashPassword: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{};
        try {
            const mydb = objDbConection.GetDb();
            await mydb.collection("users").findOne<Auth_Model>({ "email": userName, "password": hashPassword }).then(res => user = <Auth_Model>res);
            return user;
        }
        catch (ex: unknown) {
            console.error(`error in login is:  ${ex}`);
            return <Auth_Model>{};
        }
    }

    async Registration(profile: Auth_Model): Promise<boolean> {
        try {
            let result: boolean = false;
            const mydb = objDbConection.GetDb();
            let users: Auth_Model[] = await mydb.collection("users").find<Auth_Model>({ "role": "admin" }).toArray();

            if (users.length == 0) {
                await mydb.collection("users").insertOne(profile).then(res => result = res.acknowledged);
            }
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in registration is:  ${ex}`);
            return false;
        }
    }

    async GetProfile(email: string): Promise<Auth_Model> {
        let result: Auth_Model = <Auth_Model>{};
        try {
            const mydb = objDbConection.GetDb();
            await mydb.collection("users").findOne<Auth_Model>({ "email": email }).then(res => result = <Auth_Model>res);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get profile: ${ex}`);
            return result
        }
    }

    async ChangePassword(email: string, hashNewPass: string): Promise<boolean> {
        let result: boolean = false;
        try {
            const mydb = objDbConection.GetDb();
            await mydb.collection("users").updateOne({ "email": email }, { $set: { "password": hashNewPass } }).then(res => result = res.acknowledged);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in change password: ${ex}`);
            return result
        }
    }

    async EditProfile(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        try {
            const mydb = objDbConection.GetDb();
            await mydb.collection("users").updateOne({ "email": profile.email }, { $set: { "firstName": profile.firstName, "lastName": profile.lastName, "email": profile.email } }).then(res => result = res.acknowledged);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in change password: ${ex}`);
            return result
        }
    }
}