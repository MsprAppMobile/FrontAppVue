<template>
  <div>
    <section class="container">
      <center>
        <div>
          <div>
            <div class="bg-white">
              <h1 class="font-weight-bold">Save QrCode</h1>
              <div class="">
                <vue-qrcode :value="valuQrCode" tag="img" width="300" />
              </div>
              <div class="">
                <button
                  class="btn btn-primary"
                  id="buttonsaveFile"
                  @click="saveFile"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </center>
    </section>
  </div>
</template>
<script>
import VueQrcode from "vue-qrcode";
import axios from "axios";

export default {
  name: "Save",
  components: {
    VueQrcode,
  },
  data() {
    return {
      valuQrCode: localStorage.getItem("valueQrCode"),
      config: {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    saveFile() {
      if (
        confirm(
          "Nous nous apprétons à sauvegarder ce qrCode dans le fichier QrCode_" +
            localStorage.getItem("CodeName") +
            ".png. Nous allons créer un dossier 'GoStyle' dans votre dossier Documents. Etes-vous d'accord ? "
        )
      ) {
        axios
          .get(
            "http://172.16.18.27:5000/saveQrCode/" + this.valuQrCode,
            this.config
          )
          .then((res) => {
            if (res.data == "OK") {
              localStorage.removeItem("valueQrCode");
              this.$router.push({ path: "/codes" });
            }
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        localStorage.removeItem("valueQrCode");
        this.$router.push({ path: "/codes" });
      }
    },
  },
  async beforeMount() {
    if (!localStorage.getItem("token")) {
      alert("Veuillez vous connecter avant d'accèder au site.");
      this.$router.push({ name: "Login" });
      return;
    }

    if (!localStorage.getItem("valueQrCode")) {
      alert("Veuillez créer un qrcode avant d'accèder au site.");
      this.$router.push({ path: "/codes" });
      return;
    }
  },
};
</script>
<style></style>
