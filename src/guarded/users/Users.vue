<template>
<div>list of users</div>
<h2>Section title</h2>
<div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">#ID</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Deposit</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user,index) in userList" :key=index>
                <td>{{user._id}}</td>
                <td>{{user.username}}</td>
                <td>{{user.role}}</td>
                <td>{{user.deposit}}</td>
                <td>DELET/UPDATE</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {
    ref,
    onMounted
} from "vue";
import axios from "axios";
export default {
    name: "Users",

    setup() { //no control yet. will check all later
        const userList = ref([]);

        onMounted(async () => {
            await axios.get("/api/user")
            .then( (response) => {  
                console.log(response.data.data) 
                userList.value = response.data.data;
            })
            .catch( (e)=>console.log(e) );

        });
        return {
            userList
        }
    },
};
</script>

<style scoped>
</style>
