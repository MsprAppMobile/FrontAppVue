<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div class="login-panel bg-white text-left">
          <div
            class="alert alert-primary"
            role="alert"
            :style="{ opacity: isAlertShow ? 1 : 0 }"
          >
            Login successfuly. <small>Waiting for redirect</small>
            <loading-component width="30"></loading-component>
          </div>
          <h1 class="display-3 font-weight-bold">Login</h1>
          <form action="">
            <div class="form-group">
              <label for="pseudo" class="input-label">Pseudo</label>
              <input
                type="text"
                class="form-control"
                placeholder="Pseudo"
                v-model="pseudo"
              />
            </div>
            <div class="form-group">
              <label for="password" class="input-label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group d-flex justify-content-center">
              <button
                class="btn btn-primary w-25"
                id="login"
                @click.stop.prevent="login()"
                v-if="!isLoggingIn"
              >
                Login
              </button>
              <button
                class="btn btn-primary w-25"
                @click="login()"
                v-if="isLoggingIn"
              >
                <loading-component width="30"></loading-component>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoadingComponent from "../components/LoadingComponent.vue";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  components: {
    LoadingComponent,
  },
  data() {
    return {
      isLoggingIn: false,
      isAlertShow: false,
      pseudo: null,
      password: null,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Codes" });
    },
    login() {
      this.errors = [];
      if (!this.pseudo) {
        this.errors.push("Pseudo manquant.");
        alert("Pseudo manquant.");
      } 
      else if (!this.checkPseudo(this.pseudo)) {
        this.errors.push("Identifiant ou mot de passe incorrect.");
        alert("Identifiant ou mot de passe incorrect.");
      }
      if (!this.password) {
        this.errors.push("Mot de passe manquant.");
        alert("Mot de passe manquant.");
      }

      if (this.errors.length) {
        console.log(this.errors);
        return true;
      }
      this.isLoggingIn = true;
      this.isAlertShow = true;
      axios
        .post("http://127.0.0.1:5001/login", {
          pseudo: this.pseudo,
          password: this.password,
        })
        .then((response) => {
          let token = response.data;
          let tokenDecode = VueJwtDecode.decode(token);
          if (tokenDecode["role"] != "admin") {
            alert("Vous n'avez pas les autorisations nécessaire pour accéder au site.");
            this.isLoggingIn = false;
            this.isAlertShow = false;
          } else {
            localStorage.setItem("token", token);
            this.redirect();
          }
        })
        .catch((error) => {
          alert("Identifiant ou mot de passe incorrect");
          console.log(error);
          this.isLoggingIn = false;
          this.isAlertShow = false;
        });
    },
    checkPseudo(pseudo) {
      let regex = /^(\w+)$/;
      return regex.test(pseudo);
    },
  },
};
</script>

<style lang="scss">
.widget {
  margin: 0;
  height: unset;
}
.login-panel {
  padding: 200px 0;
  .alert {
    opacity: 0;
    position: absolute;
    top: 100px;
    width: 100%;

    &.alert-primary {
      background-color: #007bff;
      color: #fff;
      border: none;
    }
    .widget {
      position: absolute;
      right: 5px;
      top: 0;
      margin: 10px;
    }
  }
}
</style>
