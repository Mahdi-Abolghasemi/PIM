import { Contact_Model } from "../../Domain/Model/Contact_Model";
import { SearchContact_Model } from "../../Domain/Model/SearchContact_Model";
import { IContact_Service } from "../IServices/IContact_Service";
import { IContact_Repository } from "../../Repository/IRepository/IContact_Repository";
import { Contact_Repository } from "../../Repository/Repository/Contact_Repository";

const objContact: IContact_Repository<Contact_Model, SearchContact_Model> = new Contact_Repository()

export class Contact_Service implements IContact_Service<Contact_Model, SearchContact_Model> {
    private contacts: Contact_Model[];
    constructor() {
        this.contacts = [];
    }
    async GetAll(): Promise<Contact_Model[]> {
        await objContact.GetAll().then(val => this.contacts = val);
        return this.contacts;
    }

    async Get(id: string): Promise<Contact_Model> {
        let result: Contact_Model = <Contact_Model>{};
        await objContact.Get(id).then(res => result = res);
        return result;
    }

    async Search(searchData: SearchContact_Model): Promise<Contact_Model[]> {
        await objContact.Search(searchData).then(val => this.contacts = val);
        return this.contacts;
    }

    async Add(contact: Contact_Model): Promise<boolean> {
        let result: boolean = false;
        await objContact.Add(contact).then(val => result = val);
        return result;
    }
    async Edit(contact: Contact_Model): Promise<boolean> {
        let result: boolean = false;
        await objContact.Edit(contact).then(val => result = val);
        return result;
    }
    async Remove(inputId: string): Promise<boolean> {
        let result: boolean = false;
        await objContact.Remove(inputId).then(val => result = val);
        return result;
    }
}