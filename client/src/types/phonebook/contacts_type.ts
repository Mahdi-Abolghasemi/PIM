type contact_type = {
    id: number,
    firstName: string,
    lastName: string,
    details: contactDetails[]
}

type contactDetails = {
    id: number,
    contactId: number,
    contactType: string,
    value: string
}