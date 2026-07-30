export type contact_type = {
    id: string,
    firstName: string,
    lastName: string,
    details: contactDetails[]
}

export type contactDetails = {
    id: string,
    contactId: string,
    contactType: number,
    value: string
}