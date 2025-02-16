export type DataType = {
    firstName : string,
    lastName : string,
    location : string,
    church : string,
    phone : string,
    participateDays : boolean[],
    volonteer : string,
    children : false | [
        boolean, string, string
    ]
}