import { ObjectId } from "mongodb";

export class Contact_Model {
    //public _id: ObjectId;
    public id: string;
    public firstName: string;
    public lastName: string;
    public details: ContactDetails_Model[];

    constructor() {
        //this._id = new ObjectId("");
        this.id = "";
        this.firstName = "";
        this.lastName = "";
        this.details = [];
    }
}

class ContactDetails_Model {
    public id: string;
    public contactId: string;
    public contactType: number;
    public value: string;

    constructor() {
        this.id = "";
        this.contactId = "";
        this.contactType = 0;
        this.value = "";
    }
}