/*eslint-disable */
<template>
<main class="form-signin">
    <form @submit.prevent="handleFormSubmit">
        <h1 class="h3 mb-3 fw-normal">Edit user</h1>

        <span class="text-danger" v-show="error">{{message}}</span>
        <hr />
        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com" required v-model="email" />
            <label for="floatingInput">Email address</label>
        </div>

        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" />
            <label for="floatingInput">Password</label>
        </div>

        <div class="form-floating">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Please confirm your password" required v-model="confirmPassword" />
            <label for="floatingInput">Password</label>
        </div>

        <div class="form-floating">

            <select class="form-control" id="roleId" v-model="roleId">
                <option value="0">Select Role</option>
                <option v-for="(role,index) in roles" :key="index" :value="role">{{role}}</option>
                <!--fixed for mongoose-->
            </select>
            <label for="floatingInput">User Role</label>
        </div>

        <br />

        <button class="w-100 btn btn-lg btn-primary" type="submit" :disabled="error">
            Register
        </button>
    </form>

</main>
</template>

<script lang="ts">
import { ref,  onMounted } from 'vue';
import axios from 'axios';
import {  useRouter,  useRoute } from 'vue-router'
import { UserUpdateDTO } from '@/dto/UserUpdateDTO';

export default {
    name: 'UserEdit',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup() {
        const error = ref(false);
        const message = ref('');
        const router = useRouter();
        const {
            params
        } = useRoute();
        const email = ref('');
        const roles = ref([]);
        const deposit = ref(0);
        const roleId = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        const showMessage = (e: string) => {
            error.value = true;
            message.value = e;
            setTimeout(   () => {   error.value = false  }, 4000 );
        }

        onMounted(async ():Promise<void>  => {
            await axios.get('api/user/roles')
                .then(response => {
                    let promise = response.data;
                    /* tslint:disable-next-line */
                    if (promise.status === false) {
                        showMessage(promise.error);

                    } else {
                        roles.value = promise.data;
                    }

                }).then(async ():Promise<void> => {
                    await axios.get(`api/user/detail/${params.id}`)
                        .then(response => {
                            let promise = response.data;
                            if(promise.status === false) {showMessage(promise.error)} else{
                                const user: UserUpdateDTO = promise.data[0];
                                email.value = user.username;
                                deposit.value = user.deposit ?? 0;
                                //I will back here for password changes...
                               
                                console.log(email.value)
                                }
                        }).catch((e) => console.log(e))
                })
                .catch((e) => console.log(e))
             

        });
        const handleFormSubmit = async ():Promise<void>  => { //no control yet. just fundamental funcs. will update!
            await axios.post('/user', {
                    username: email.value,
                    password: password.value,
                    role: roleId.value
                })
                .then(response => {
                    const promise = response.data;
                    /* tslint:disable-next-line */
                    if (promise.status === false) {
                         showMessage(promise.error);
                      } else {
                        router.push('/users')
                        }
                })
                .catch((e) => console.log(e))
        }

        return {
            error,
            message,
            showMessage,
            email,
            roleId,
            roles,
            deposit,
            password,
            confirmPassword,
            handleFormSubmit,
        }

    }
}
</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
