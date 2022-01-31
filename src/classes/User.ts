import {Roles} from "@/classes/Roles"
import { Entity } from "@/interfaces/Entity";

 export class User implements Entity{

    id: string; //mongoose string not number!
    username: string;
    role: Roles;
    deposit: number;
    permissions:string[];

    constructor(id='0', username: string, role =  {}, deposit = 0, permissions: string[] = []){
        id;
        username;
        role;
        deposit;
        permissions;
    }

}
