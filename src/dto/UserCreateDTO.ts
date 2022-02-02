/*eslint-disable */ 
export class UserCreateDTO {
    username: string;
    password?: string;
    deposit?: number;
    role?: string; //not decided yet, I will back to here...
    permissions?: string[]
}