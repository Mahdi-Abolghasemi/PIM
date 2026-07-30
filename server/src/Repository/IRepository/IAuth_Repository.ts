
export interface IAuth_Repository<T> {
    Login(userName: string, hashPassword: string): Promise<T>;
    Registration(profile: T): Promise<boolean>;
    GetProfile(email: string): Promise<T>;
    ChangePassword(email: string, hashNewPass: string): Promise<boolean>;
    EditProfile(profile: T): Promise<boolean>
}