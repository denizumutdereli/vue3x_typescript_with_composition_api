import {UserUpdateDTO } from "@/dto/UserUpdateDTO";

 export class User  {
    constructor(UserDTO : UserUpdateDTO) {
        const {id, username, role, deposit, permissions} = UserDTO;
        id;
        username;
        role;
        deposit;
        permissions;
    }
}
