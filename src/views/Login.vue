<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4">
                <div class="login-panel bg-white text-left">
                    <div class="alert alert-primary" role="alert" :style="{opacity: isAlertShow ? 1 :0}">
                        Login successfuly. <small>Waiting for redirect</small>
                        <loading-component width="30"></loading-component>
                    </div>
                    <h1 class="display-3 font-weight-bold"> Login</h1>
                    <form action="">
                        <div class="form-group">
                            <label for="pseudo" class="input-label">Email</label>
                            <input type="pseudo" class="form-control" placeholder="Pseudo">
                        </div>
                        <div class="form-group">
                            <label for="password" class="input-label">Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" id='login' @click="login" v-if="!isLoggingIn">Login</button>
                            <button class="btn btn-primary w-25" @click="login" v-if="isLoggingIn"><loading-component width="30"></loading-component></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingComponent from '../components/LoadingComponent.vue'
export default {
    components:{
        LoadingComponent
    },
    data() {
        return {
            isLoggingIn : false,
            isAlertShow : false
        }
    },
    methods :{
        login(){
            this.isLoggingIn = true;

            setTimeout(() => {
               this.isLoggingIn =false
               this.isAlertShow = true
               setTimeout(() => this.redirect(), 1000);
            }, 1000);
        },
        redirect(){
            this.$router.push({name:'Home'})
        }
    }
}
</script>


<style lang="scss">

    .widget{
        margin: 0;
        height: unset;
    }
    .login-panel {
        padding: 200px 0;
        .alert{
            opacity: 0;
            position: absolute;
            top: 100px;
            width: 100%;

            &.alert-primary{
                background-color: #007BFF;
                color: #fff;
                border: none;
            }
            .widget{
                position: absolute;
                right: 5px;
                top: 0;
                margin: 10px;
            }
        }
    }

</style>