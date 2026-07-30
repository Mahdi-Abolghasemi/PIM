
export class Auth_Model {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: string;

    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.role = "";
    }
}

export class Auth_Result {
    public success: boolean;
    public userName: string;
    public token: string;

    constructor() {
        this.success = false;
        this.userName = "";
        this.token = "";
    }
}