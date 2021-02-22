import { Address } from "./address"

export class Company{
    id:String
    name:String
    logo: String
    address: Address
    email:String
    description:String
    vehicleId:Array<String>
    driverId:Array<String>
}