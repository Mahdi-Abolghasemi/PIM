import contact_data from "@/data/phonebook/data.json";

let allData: contact_type[];

export class Contact_service {
    constructor() {
        allData = contact_data;
    }

    GetAll(): contact_type[] {
        return allData;
    }

    Get(id: number): contact_type | null {
        if (id > 0) {
            let rowIndex: number = -1;
            allData.forEach((value, index) => { value.id === id ? rowIndex = index : "" })
            return allData[rowIndex]
        }
        else {
            return null;
        }

    }

    Add(data: contact_type): boolean {
        try {
            allData.concat(data)
            return true;
        }
        catch {
            return false;
        }
    }

    Edit(data: contact_type): boolean {
        try {
            allData = allData.map(i => i.id === data.id ? data : i)
            return true
        }
        catch {
            return false;
        }
    }

    Delete(id: number): boolean {
        try {
            allData.filter(i => i.id !== id);
            return true;
        }
        catch {
            return false;
        }
    }
}