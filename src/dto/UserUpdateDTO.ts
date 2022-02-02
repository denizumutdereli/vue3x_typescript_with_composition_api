/*eslint-disable */ 
export class UserUpdateDTO {
    id: string | number | null;  //mongoose or uuid quick fix.
    username: string;
    password?: string;
    deposit?: number;
    role?: string; //not decided yet, I will back to here...
    permissions?: string[]
}