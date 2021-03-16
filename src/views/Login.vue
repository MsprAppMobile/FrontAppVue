<template>
    <section class="container">
        <div class="row justify-content-center">
            <div class="col-lg-4">
                <div class="login-panel bg-white text-left">
                    <div class="alert alert-primary" role="alert">
                        Login successfuly. <small>Waiting for redirect</small>
                    </div>
                    <h1 class="display-3 font-weight-bold"> Login</h1>
                    <form action="">
                        <div class="form-group">
                            <label for="pseudo" class="input-label">Email</label>
                            <input type="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="input-label">Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="login">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    
}
</script>

<style>

    .login-panel {
        padding: 200px 0;
    }

</style>