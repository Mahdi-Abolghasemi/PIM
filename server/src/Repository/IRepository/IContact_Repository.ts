
export interface IContact_Repository<T, U> {
    GetAll(): Promise<T[]>;
    Get(id: string): Promise<T>;
    Search(searchData: U): Promise<T[]>;
    Add(contact: T): Promise<boolean>;
    Edit(contact: T): Promise<boolean>;
    Remove(id: string): Promise<boolean>;
}