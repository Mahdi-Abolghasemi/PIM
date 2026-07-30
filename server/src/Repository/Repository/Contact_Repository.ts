import { Contact_Model } from "../../Domain/Model/Contact_Model";
import { SearchContact_Model } from "../../Domain/Model/SearchContact_Model";
import { IContact_Repository } from "../IRepository/IContact_Repository";
import objDbConection from "../../dbConnection";


export class Contact_Repository implements IContact_Repository<Contact_Model, SearchContact_Model> {
    async GetAll(): Promise<Contact_Model[]> {
        const mydb = objDbConection.GetDb();
        let result: Contact_Model[] = await mydb.collection('contacts').find<Contact_Model>({}).toArray();
        return result;
    }

    async Get(id: string): Promise<Contact_Model> {
        let result: Contact_Model = <Contact_Model>{};
        try {
            const mydb = objDbConection.GetDb();
            await mydb.collection('contacts').findOne<Contact_Model>({ "id": id }).then(res => result = <Contact_Model>res);
            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get contact is: ${ex}`);
            return <Contact_Model>{}
        }
    }

    async Search(searchData: SearchContact_Model): Promise<Contact_Model[]> {
        let result: Contact_Model[] = [];
        const mydb = objDbConection.GetDb();
        if (searchData.name != "" || searchData.details != "") {
            if (searchData.name !== "") {
                result = await mydb.collection('contacts').aggregate().project<Contact_Model>({ fullname: { $concat: ["$firstName", " ", "$lastName"] }, "id": 1, "firstName": 1, "lastName": 1, "details": 1 }).match({ fullname: { $regex: searchData.name, $options: "i" } }).toArray();
            }

            if (searchData.details !== "") {
                result = await mydb.collection('contacts').find<Contact_Model>({ "details.value": { $regex: searchData.details, $options: "i" } }).toArray();
            }
        }
        else {
            result = await mydb.collection('contacts').find<Contact_Model>({}).toArray();
        }
        return result;
    }

    async Add(contact: Contact_Model): Promise<boolean> {
        const mydb = objDbConection.GetDb();
        let result: boolean = false;
        await mydb.collection('contacts').insertOne(contact).then(val => result = val.acknowledged);
        return result;
    }

    async Edit(contact: Contact_Model): Promise<boolean> {
        const mydb = objDbConection.GetDb();
        let result: boolean = false;
        await mydb.collection('contacts').updateOne({ "id": contact.id }, { $set: { "firstName": contact.firstName, "last_name": contact.lastName, "details": contact.details } }).then(val => result = val.acknowledged);
        return result;
    }

    async Remove(inputId: string): Promise<boolean> {
        const mydb = objDbConection.GetDb();
        let result: boolean = false;
        await mydb.collection('contacts').deleteOne({ "id": inputId }).then(val => result = val.acknowledged);
        return result;
    }
}