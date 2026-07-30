import { Contact_Model } from "../../Domain/Model/Contact_Model";

export interface IContact_Service<T, U> {
    GetAll(): Promise<T[]>;
    Get(id: string): Promise<Contact_Model>;
    Search(searchData: U): Promise<T[]>;
    Add(contact: T): Promise<boolean>;
    Edit(contact: T): Promise<boolean>;
    Remove(id: string): Promise<boolean>;
}