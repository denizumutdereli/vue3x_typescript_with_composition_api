import { Entity } from "@/interfaces/Entity";
import { Roles } from "@/interfaces/Roles";

export interface UserInferace {
    id: Entity;
    username: string;
    role: Roles;
    deposit: number;
    permissions: string[];

}