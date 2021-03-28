<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">GoStyle</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/codes" class="nav-link"
              >Codes de Promotions</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/users" class="nav-link">Utilisateurs</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/create" class="nav-link">Création</router-link>
          </li>
        </ul>
        <button
          class="btn btn-outline-dark my-2 my-sm-0"
          type="button"
          @click="deconnection"
        >
          Déconnexion
        </button>
      </div>
    </nav>
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3">
          <div class="bg-white text-left">
            <h1 class="font-weight-bold">Utilisateurs</h1>
          </div>
        </div>
      </div>
    </section>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pseudo</th>
          <th scope="col">Mail</th>
          <th scope="col">Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <tD>{{ user.id }}</tD>
          <td>{{ user.pseudo }}</td>
          <td>{{ user.mail }}</td>
          <td>
            <input type="checkbox" name="isAdmin" v-model="users.roles" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
//import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: "ListUsers",
  components: {},
  data() {
    return {
      users: [],
      hashHeader: md5("GoStyle"),
      config: {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    deconnection() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
  async beforeMount() {
    if (!localStorage.getItem("token")) {
      alert("Veuillez vous connecter avant d'accèder au site.");
      this.$router.push({ name: "Login" });
      return;
    }
    try {
      await axios
        .get("http://127.0.0.1:5001/users", this.config)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
          alert("Erreur de chargement des données.");
        });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style>
tr {
  width: 100%;
}
</style>
