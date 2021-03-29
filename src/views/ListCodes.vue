<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">GoStyle</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/codes" class="nav-link">Codes de Promotions</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/users" class="nav-link">Utilisateurs</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/create" class="nav-link">Création</router-link>
                </li>
                </ul>
                <button class="btn btn-outline-dark my-2 my-sm-0" type="button" @click="deconnection()">Déconnexion</button>
            </div>
        </nav>
        <section class="container">
            <div class="row justify-content-center">
                <div class="col-lg-3">
                    <div class="bg-white text-left">
                        <h1 class="font-weight-bold">Promotions</h1>
                    </div>
                </div>
            </div>
        </section>
        
        <table class="table table-striped">
            <col style="width:10px">
            <col style="width:10px">
            <col style="width:10px">
            <thead>
                <tr>
                    <th scope="col" >#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Date d'expiration</th>
                    <th scope="col" style="10px">Lien Image</th>
                    <th scope="col">Description</th>
                    <th scope="col">Valeur</th>
                    <th scope="col">Identifiant QrCode</th>
                    <th scope="col">Usage Unique</th>
                    <th scope="col">Categorie</th>
                    <th scope="col">Suppression</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="code in codes" :key="code.id">
                <th scope="row">{{code.id}}</th>
                <td>{{code.name}}</td>
                <td>{{code.expiration_date}}</td>
                <td style="width=10px"> <a :href="code.image">Lien Image</a></td>
                <td>{{code.description}}</td>
                <td>{{code.value}}</td>
                <td><button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="generateQrCode(code.identifiant_QRCode)">Regénérer QRCode</button></td>
                <td>{{isUnique(code.is_unique)}}</td>
                <td>{{code.category}}</td>
                <td><button class="btn btn-outline-danger my-2 my-sm-0" type="button" @click="suppressionCode(code.id)">Suppression</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios'
//import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'ListCodes',
    components: {
        
    },
    data(){
        return {
            codes :[],
            config : {
                headers : {
                   "token":localStorage.getItem("token")
                }
            }
        }
    },
    methods:{
        isUnique(isunqiue){
            if(isunqiue==1){
                return "OUI";
            }
            return "NON";
        },
        suppressionCode(id){
            if(confirm("Vous vous apprétez à supprimer un code promotionel")){
                var index = null
                this.codes.forEach(code => {
                    if(code.id==id){
                        index = this.codes.indexOf(code);
                    }
                });
                axios.
                delete("http://172.16.18.27:5000/code/"+id,this.config)
                .then(
                    this.codes.splice(index,1)
                )
                .catch( error=>{
                    console.log(error)
                    alert("Erreur lors de la suppression.")
                })
            }
        },
        deconnection(){
            localStorage.clear()
            this.$router.push({path:"/"})
        },
        generateQrCode(qrcodeIdentifiant){
            localStorage.setItem("valueQrCode",qrcodeIdentifiant);
            this.$router.push({path:"/save"})
        }
    },
    async beforeMount(){
        if(!localStorage.getItem("token")){
            alert("Veuillez vous connecter avant d'accèder au site.")
            this.$router.push({name:'Login'})
            return
        }
        try{
            await axios.get('http://172.16.18.27:5000/codes',this.config)
            .then(res => {
                this.codes = res.data
            })
            .catch( error=>{
                console.log(error)
                alert("Erreur de chargement des données.")
            })
        }catch(e){
        console.log(e)
        } 
        
    }
}
</script>
<style>

tr {
    width: 100%;
}
</style>