import { authLogin_type, authResult_type } from "@/types/authorization/auth_type";
import { restDataSource } from "../restDataSource";
import Cookies, { Cookie } from "universal-cookie";

export class Auth_service {
    private objAuthRDS: restDataSource<authLogin_type, authResult_type>;
    private cookie: Cookie;

    constructor() {
        this.objAuthRDS = new restDataSource("auth");
        this.cookie = new Cookies();
    }

    async Login(loginData: authLogin_type): Promise<boolean> {
        let result: authResult_type = <authResult_type>{};
        await this.objAuthRDS.Login(loginData).then(res => result = res);

        if (result.success) {
            this.cookie.set("TOKEN", result.token, { path: "/" });
        }

        return result.success;
    }
}