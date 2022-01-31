import {Roles} from "@/classes/Roles"
import { Entity } from "@/interfaces/Entity";

 export class User implements Entity{

    id: string; //mongoose string not number!
    email: string;
    role: Roles;
    permissions:string[];

    constructor(id='0', email: string, role =  {}, permissions: string[] = []){
        id;
        email;
        role;
        permissions
    }

}
