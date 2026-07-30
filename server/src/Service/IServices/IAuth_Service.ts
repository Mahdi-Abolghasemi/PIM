import { Request, Response, RequestHandler, NextFunction } from "express";

export interface IAuth_Service<T, U> {
    LogIn(userName: string, password: string): Promise<U>;
    Registration(profile: T): Promise<boolean>;
    GetProfile(email: string): Promise<T>;
    EditProfile(profile: T): Promise<boolean>;
    ChangePassword(email: string, oldPass: string, newPass: string): Promise<boolean>;
    // ForgotPassword(email: string): Promise<boolean>;
    AdminOnly(req: Request, res: Response, next: NextFunction): void;
}