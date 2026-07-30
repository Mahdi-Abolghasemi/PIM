import { restDataSource } from "../restDataSource";
import { contact_type } from "@/types/phonebook/contacts_type";
import { search_type } from "@/types/phonebook/search_type";


export class Contact_service {
    private objRestDataSource: restDataSource<contact_type, search_type>;
    private allData: contact_type[];
    constructor() {
        this.allData = [];
        this.objRestDataSource = new restDataSource("contact");
    }

    async GetAll(): Promise<contact_type[]> {
        await this.objRestDataSource.GetAll().then(res => this.allData = res);
        return this.allData;
    }

    async Search(searchData: search_type): Promise<contact_type[]> {
        await this.objRestDataSource.Search(searchData).then(res => this.allData = res);
        return this.allData;
    }

    async Get(id: string): Promise<contact_type> {
        let result: contact_type = <contact_type>{};
        await this.objRestDataSource.Get(id).then(res => result = res);
        return result;
    }

    async Add(data: contact_type): Promise<boolean> {
        let result: boolean = false;
        await this.objRestDataSource.Add(data).then(res => result = res);
        return result;
    }

    async Edit(data: contact_type): Promise<boolean> {
        let result: boolean = false;
        this.objRestDataSource.Edit(data).then(res => result = res);
        return result;
    }

    async Delete(id: string): Promise<boolean> {
        let result: boolean = false;
        this.objRestDataSource.Delete(id).then(res => result = res);
        return result;
    }
}