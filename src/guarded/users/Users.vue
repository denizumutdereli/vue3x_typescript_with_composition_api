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
            <tr v-for="user in userList" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.deposit }}</td>
                <td>
                    <div class="btn-group mr-2">
                        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="update(user.id)">Edit</a>
                        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>

                    </div>

                </td>
            </tr>
        </tbody>
    </table>
</div>
<!-- Demo purpose, not too much users...
<nav>
    <ul class="pagination">
        <li class="page-item">
            <a href="javascript:void(0)" class="page-link" @click="previous">Previous</a>
        </li>

        <li class="page-item">
            <a href="javascript:void(0)" class="page-link" @click="next" :disabled="disabled">Next</a>
        </li>
    </ul>
</nav>-->
</template>

<script lang="ts">
import {  ref,  onMounted} from "vue";
import axios from "axios";
import { Entity } from '@/interfaces/Entity';

export default {
    name: "Users",

    setup() {
        //no control yet. will check all later
        const userList = ref([]);
        const page = ref(1);
        const disabled = ref(false);

        const updating = async () => {
            console.log('here')

            setInterval(load, 5000);

        }

        const load = async () => {

            await axios
                //.get(`/api/user?page=${page.value}`) -> I will care about later..
                .get(`/api/user`)
                .then((response) => {
                    console.log(response.data.data);
                    userList.value = response.data.data;
                })
                .catch((e) => console.log(e));
           
            //setInterval(load, 5000);
        };

        onMounted(load);

        const previous = async () => {
            page.value--;
            await load();
        };

        const next = async () => {
            page.value++;
            load();
        };

        const del = async (id: string | number) => { //mongoose quick fix for ids

            console.log(id)
            if (confirm('Please confirm')) {
                console.log(userList.value);
                await axios.delete(`api/user/delete/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        //no control yet - in case user deleted without a problem
                        userList.value = userList.value.filter( (u : Entity )=> u.id != id ) //->interface overlay
                    })
                    .catch((e) => console.log(e));
            }
        };

        const update = async (id: number) => {
            // if(confirm('Please confirm')) {
            //     await axios.delete(`api/user/update/${id}`)
            //     .then((response) => { 
            //         console.log(response.data);
            //         //no control yet - in case user deleted without a problem
            //         //userList.value = userList.value.filter( u => u._id != id )
            //         })
            //     .catch((e) => console.log(e));
            // }
        };
        return {
            userList,
            previous,
            next,
            disabled,
            del,
            update
        };
    },
};
</script>

<style scoped>
</style>
