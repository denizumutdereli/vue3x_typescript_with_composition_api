import { Entity } from "@/interfaces/Entity";

export class Permissions implements Entity{
    id: number | string;
    name: string; //->user roles dependecy -check node-dev-api

    constructor(id = 0, name = '') {
        this.id = id;
        this.name = name;
    }
}