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
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Utilisateurs</router-link>
          </li>
          <li class="nav-item active">
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
        <div class="col-lg-4">
          <div class="bg-white text-left">
            <h1 class="font-weight-bold">Promotions</h1>
            <form>
              <div class="form-group">
                <label for="name" class="input-label">Name</label>
                <input
                  type="texte"
                  class="form-control"
                  placeholder="Name"
                  v-model="name"
                />
              </div>

              <div class="form-group">
                <label for="description" class="input-label">Description</label>
                <textarea
                  name="description"
                  class="form-control"
                  cols="30"
                  rows="5"
                  placeholder="Description"
                  v-model="description"
                />
              </div>

              <div class="form-group">
                <label for="value" class="input-label">Montant</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Montant"
                  min="0"
                  v-model="value"
                />
              </div>

              <div class="form-group">
                <label for="imgLink" class="input-label">Image Link</label>
                <input
                  type="texte"
                  class="form-control"
                  placeholder="Image Link"
                  v-model="imglink"
                />
              </div>

              <div class="form-group">
                <label for="isUnique" class="input-label"
                  >Code a utilisation Unique</label
                >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="isUnique"
                    v-model="unique"
                    v-bind:value="true"
                  />
                  <label for="unique" class="form-check-label">Oui</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="isUnique"
                    v-model="unique"
                    v-bind:value="false"
                  />
                  <label for="notUnique" class="form-check-label">Non</label>
                </div>
              </div>

              <div class="form-group">
                <label for="date" class="input-label">Date d'expiration</label>
                <input type="date" class="form-control" v-model="date" />
              </div>

              <div class="form-group">
                <label for="category" class="input-label">Category</label>
                <select
                  name="category"
                  id="category-select"
                  class="form-control"
                  v-model="category"
                >
                  <option value="">--Choisissez une option (exemple)--</option>
                  <option value="pourcentage">Pourcentage (-20%)</option>
                  <option value="remise">Remise(-30€)</option>
                  <option value="affaire"> Affaire (3 pour le prix de 2)</option>
                  <option value="pack">Pack (2 pour 3€)</option>
                </select>
              </div>

              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click.stop.prevent="createCode"
                >
                  Valider Création
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Create",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      generate: false,
      name: null,
      description: null,
      unique: true,
      category: null,
      valueQrCode: null,
      imglink: null,
      value: null,
      config: {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    createCode() {
      if (
        !this.name ||
        !this.description ||
        !this.description ||
        !this.category ||
        !this.imglink ||
        !this.value
      ) {
        alert("Veuillez remplir tous les champs");
        return;
      }

      if (this.date == new Date().toISOString().substr(0, 10)) {
        if (
          !confirm(
            "Attention la date d'expiration est aujourd'hui.Voulez-vous continuer ?"
          )
        ) {
          return;
        }
      } else if (this.date <= new Date().toISOString().substr(0, 10)) {
        alert("La date d'expiration ne peut pas être avant la date du jour");
        return;
      }

      
      axios
        .post(
          "http://172.16.18.27:5000/codes",
          {
            name: this.name,
            description: this.description,
            is_unique: this.unique,
            category: this.category,
            expiration_date: this.date,
            image: this.imglink,
            value: this.value,
          },
          this.config
        )
        .then((res) => {
          localStorage.setItem("CodeName", res.data.name);
          localStorage.setItem("valueQrCode", res.data.identifiant_QRCode);
          this.$router.push({ path: "/save" });
        })
        .catch((error) => {
          
          alert(error.response.data)
          
        });
    },
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
  },
};
</script>

<style lang="scss"></style>
