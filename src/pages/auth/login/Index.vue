<template>
  <div>
    <particles-bg
      type="cobweb"
      color="#3F51B5"
      num="100"
      :bg="false"
      style="z-index:0;height: calc(100vh - 25px);"
    />
    <v-container fluid class="content-wrap">
      <v-card
        class="px-5 py-10 px-md-8 px-lg-10 rounded-0 card-custom"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
        "
      >
        <p class="text-h5 font-weight-bold text-center my-0 py-4">Login</p>
        <v-card-text class="pa-4 pb-0">
          <v-text-field
            dense
            outlined
            background-color="grey lighten-3"
            class="my-5 py-2"
            label="E-mail"
            rounded
            placeholder="@enterprice.com"
            type="email"
            required
            prepend-inner-icon="mdi-email"
            hide-details
            v-model="email"
          ></v-text-field>
          <v-text-field
            class="my-5 py-2"
            dense
            outlined
            rounded
            background-color="grey lighten-3"
            label="Password"
            placeholder="******"
            @click:append="show1 = !show1"
            hide-details
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            required
            prepend-inner-icon="mdi-lock"
            v-model="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="text-center pa-4">
          <v-btn
            block
            color="primary"
            large
            class="elevation-0 rounded-xl"
            :loading="load"
            @click.prevent="signIn()"
            >Ingresar</v-btn
          >
        </v-card-actions>
        <div class="px-4 text-center my-2">
          <span class="text-caption">¿No tienes una cuenta?</span>
          <a
            class="text-normal text-caption rounded-0 font-weight-bold secondary--text"
            text
            @click.prevent="goToRegister()"
          >
            Registrate</a
          >
        </div>
        <div class="text-center">
          <a
            text
            small
            class="text-normal text-caption rounded-0 font-weight-bold secondary--text"
            @click.prevent="goToHome()"
            >Volver al inicio</a
          >
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "home-component",

  data: () => ({
    email: null,
    password: null,
    show1: false,
    load: false,
  }),
  mounted() {
    this.getPath();
    this.$store.dispatch("app/changeTitlePage", "Login");
    document.title = this.$store.state.app.title_page;
  },

  methods: {
    getPath() {
      let path = window.location.pathname + window.location.search;

      this.$store.dispatch("app/setPath", path);
    },
    signIn() {
      this.load = true;
      const data = new FormData();
      data.append("email", this.email);
      data.append("password", this.password);
      this.$axios
        .post("signin", data)
        .then((res) => {
          if (res.data.success === true) {
            Vue.$toast.success("Bienvenido, " + res.data.data.user.name, {});

            const payload = {
              token: res.data.data.token,
              user: res.data.data.user,
            };
            this.$store.dispatch("auth/setUser", payload);
            this.$router.push({ path: "/admin/profile" });
          } else {
            Vue.$toast.error("" + res.data.message, {});
          }
          this.load = false;
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
        });
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card-custom {
  max-width: 400px;
}
</style>
