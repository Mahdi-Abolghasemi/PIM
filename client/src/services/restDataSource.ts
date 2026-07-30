import Axios from "axios";
import Cookies, { Cookie } from "universal-cookie";

export class restDataSource<T, U> {
    private url: string;
    private cookie: Cookie;
    private token: string;

    constructor(controllerName: string) {
        this.url = `${process.env.BACKEND_SERVER_ADDRESS}/${controllerName}`;
        this.cookie = new Cookies();
        this.token = this.cookie.get("TOKEN") !== "" ? this.cookie.get("TOKEN") : "";
    }

    async GetAll(): Promise<T[]> {
        let result: T[] = [];
        await this.SendRequest_Two("get", this.url + "/getall").then(res => result = res);
        return result;
    }

    async Search(_data: U): Promise<T[]> {
        let result: T[] = [];
        await this.SendRequest_Two("post", this.url + "/search", _data).then(res => result = res);
        return result;
    }

    async Get(id: string): Promise<T> {
        let result: T = <T>{};
        await Axios.request({
            method: "post", headers: !this.token ? {} : { Authorization: this.token }, url: this.url + `/get/${id}`
        }).then(res => result = res.data).catch((ex: unknown) => { console.error(`error is: ${ex}`) });
        return result;
    }

    async Add(_data: T): Promise<boolean> {
        let result: boolean = false;
        await this.SendRequest_One("post", this.url + "/add", _data).then(res => result = res);
        return result;
    }

    async Edit(_data: T): Promise<boolean> {
        let result: boolean = false;
        await this.SendRequest_One("put", this.url + "/edit", _data).then(res => result = res);
        return result;
    }

    async Delete(id: string): Promise<boolean> {
        let result: boolean = false;
        await this.SendRequest_One("put", this.url + `/remove/${id}`).then(res => result = res);
        return result;
    }

    async Login(_data: T): Promise<U> {
        let result: U = <U>{};
        await Axios.request({
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            url: this.url + "/login",
            data: _data
        }).then(res => result = res.data).catch((ex: unknown) => { console.error(`error is: ${ex}`) });

        return result;
    }

    async SendRequest_One(_method: string, _url: string, _data?: T): Promise<boolean> {
        let result: boolean = false;
        await Axios.request({
            method: _method,
            headers: !this.token ? {} : { Authorization: this.token },
            url: _url,
            data: _data
        }).then(res => result = res.data).catch((ex: unknown) => { console.error(`error is: ${ex}`) })

        return result;
    }

    async SendRequest_Two(_method: string, _url: string, _data?: T | U): Promise<T[]> {
        let result: T[] = [];
        await Axios.request({
            method: _method,
            headers: !this.token ? {} : { Authorization: this.token },
            url: _url,
            data: _data
        }).then(res => result = res.data).catch((ex: unknown) => { console.error(`error is: ${ex}`) })

        return result;
    }
}