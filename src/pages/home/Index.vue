<template>
  <div>
    <particles-bg
      type="cobweb"
      color="#3F51B5"
      num="100"
      :bg="true"
      style="z-index: 0"
    />
    <v-container
      fluid
      class="content-wrap pa-0"
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      "
    >
      <v-row class="justify-center ma-0 pa-0">
        <v-col class="col-12">
          <v-img
            contain
            src="images/portada.png"
            class="mx-auto img-home"
          ></v-img>
        </v-col>

        <v-col class="col-12 text-center">
          <span class="text-secondary font-weight-bold text-h4"
            >Cuaderno de control</span
          >
        </v-col>
        <v-col class="col-12 text-center">
          <span class="text-secondary text-justify text-subtitle-1"
            >Gestiona tus ventas de productos y servicios prestados, genera
            comprobantes de pago electrónicos.<br />
            Visualiza tus datos mediante tableros de control en línea.<br />
            Para comenzar, solo regístrate e inicia sesión.
          </span>
        </v-col>
        <v-col class="col-12 text-center">
          <v-btn
            @click.prevent="goToLogin()"
            large
            color="primary"
            class="col-4 col-md-2 mr-2 text-normal font-weight-bold rounded-xl elevation-0"
            >Login</v-btn
          >
          <v-btn
            @click.prevent="goToRegister()"
            large
            outlined
            color="primary"
            class="col-4 col-md-2 ml-2 text-normal font-weight-bold rounded-xl elevation-0"
            >Registro</v-btn
          >
        </v-col>
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
    this.$store.dispatch("app/changeTitlePage", "App");
    document.title = this.$store.state.app.title_page;
  },

  methods: {
    getPath() {
      let path = window.location.pathname + window.location.search;

      this.$store.dispatch("app/setPath", path);
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.content-wrap {
  max-width: 800px !important;
}
.img-home {
  height: 300px;
}
@media screen and (max-width: 600px) {
  .img-home {
    height: 250px;
  }
}
</style>
