<template>
  <div>
    <v-container fluid class="content-wrap">
       <v-row class="justify-center ma-0 pa-0">
        
      </v-row>


      <v-row class="justify-center ma-0 pa-0">
        <v-col class="col-12">
          <v-img contain src="images/portada.png" width="500" class="mx-auto"></v-img>
        </v-col>
      </v-row>

      <v-row class="justify-center ma-0">
        <v-col class="col-12 text-center">
          <span class="text-secondary font-weight-bold text-h4">Cuaderno de control</span>
        </v-col>
        <v-col class="col-12 col-md-8 text-center">
          <span class="text-secondary text-justify text-subtitle-1">Gestiona tus pagos por ventas y servicios prestados, generación boletas y comprobantes de pago. Visualización de datos mediante tableros de control en línea.<br> Para comenzar, solo regístrate e inicia sesión.  </span>
        </v-col>
      </v-row>

      <v-row class="justify-center  pa-4 ma-0">
        <v-btn  @click.prevent="goToLogin()"  large color="primary" class="col-4 col-md-2 mr-2 text-normal font-weight-bold  rounded-xl elevation-0">Login</v-btn>
        <v-btn @click.prevent="goToRegister()"  large outlined color="primary" class="col-4 col-md-2 ml-2 text-normal  font-weight-bold rounded-xl elevation-0 ">Register</v-btn>
      </v-row>
    </v-container>


  </div>
</template>

<script>
export default {
  name: "home-component",

  data: () => ({}),
  mounted() {
    this.getPath();
    this.$store.dispatch(
      "app/changeTitlePage",
      "App"
    );
    document.title = this.$store.state.app.title_page;
  },

  methods: {
    getPath() {
      let path = window.location.pathname + window.location.search;

      this.$store.dispatch("app/setPath", path);
    },
    goToLogin() {
      this.$router.push("/login")
    },
    goToRegister() {
      this.$router.push("/register")
    }
  },
};
</script>

<style scoped>
.content-wrap{
  max-width: 1000px;
}
</style>
