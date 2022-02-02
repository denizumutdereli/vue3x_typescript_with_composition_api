import { Permissions } from "@/classes/Permission";
import { Entity } from "@/interfaces/Entity";

export class Roles implements Entity{
    id: number;
    name?: string;
    permissions?: Permissions[]

    constructor(id = 0, name = '', permissions: []) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}