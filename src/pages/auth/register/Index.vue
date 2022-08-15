<template>
  <v-container fluid class="content-wrap">
    <v-row class="justify-center">
      <v-col class="col-12 col-md-8 col-lg-3">
        <v-card
          class="px-5 py-10 px-md-8 px-lg-10 rounded-lg card-custom mx-auto"
        >
          <p class="text-h5 font-weight-bold text-center my-0 py-4">
            Registrate
          </p>
          <v-card-text class="px-2">
            <v-text-field
              class="my-5"
              filled
              rounded
              prepend-inner-icon="mdi-account"
              background-color="grey lighten-2"
              hide-details
              label="Names"
              placeholder="firstname and lastname"
              type="text"
              required
              v-model="name"
            ></v-text-field>
            <v-text-field
              class="my-5"
              filled
              rounded
              prepend-inner-icon="mdi-email"
              background-color="grey lighten-2"
              hide-details
              label="E-mail"
              placeholder="@enterprice.com"
              type="email"
              required
              v-model="email"
            ></v-text-field>
            <v-text-field
              class="my-4"
              filled
              rounded
              prepend-inner-icon="mdi-lock"
              background-color="grey lighten-2"
              label="Password"
              placeholder="******"
              @click:append="show1 = !show1"
              hide-details
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              required
              v-model="password"
            ></v-text-field>
            <v-text-field
              class="my-4"
              filled
              rounded
              prepend-inner-icon="mdi-lock-check"
              background-color="grey lighten-2"
              label="Verify password"
              placeholder="******"
              @click:append="show2 = !show2"
              hide-details
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              required
              v-model="verify_password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="text-center pa-2">
            <v-btn
              block
              color="primary"
              large
              class="elevation-0 rounded-xl"
              @click.prevent="register()"
              >Registrar
            </v-btn>
          </v-card-actions>
          <div class="pa-4 ma-0">
            <a
              class="float-right text-normal text-caption rounded-0 font-weight-bold secondary--text"
              @click.prevent="goToLogin()"
              >Sign in</a
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "home-component",

  data: () => ({
    name: "",
    email: "",
    password: "",
    verify_password: "",
    show1: false,
    show2: false,
    load: false,
  }),
  mounted() {
    this.getPath();
    this.$store.dispatch("app/changeTitlePage", "Register");
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
    register() {
      this.load = false;
      const data = new FormData();

      data.append("name", this.name);
      data.append("email", this.email);
      data.append("password", this.password);
      data.append("password_confirmation", this.verify_password);

      this.$axios
        .post("/signup", data)
        .then((res) => {
          

          if (res.data.success === true) {
            /**save user info and redirect */
            Vue.$toast.success("Bienvenido, "+res.data.data.user,{})
            const payload = {
              token:res.data.data.token,
              user:res.data.data.user
            }
            this.$store.dispatch("auth/setUser",payload)
            this.$router.push({path:"/admin/profile"})

          } else {
            /**show errors */
            const elements = res.data.message;
           
            const errors = [];
            for (let element in elements) {
              if (elements[element] != null && elements[element] != undefined) {
                errors.push(elements[element][0]);
              }
            }

            Vue.$toast.error("" + errors.join("<br>"), {});
          }
          this.load = false;
        })
        .catch((err) => {
          this.load = false;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.card-custom {
  max-width: 500px;
}
</style>
