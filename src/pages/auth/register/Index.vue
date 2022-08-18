<template>
  <div>
    <particles-bg
      type="cobweb"
      color="#3F51B5"
      num="100"
      :bg="false"
      style="z-index: 0; height: calc(100vh - 25px)"
    />
    <v-container fluid class="content-wrap">
      <v-card
        class="px-5 py-10 px-md-8 px-lg-10 rounded-0 card-custom elevation-5"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
        "
      >
        <p class="text-h5 font-weight-bold text-center my-0 py-4">Registrate</p>
        <v-card-text class="px-2">
          <v-text-field
            class="my-5 py-2"
            dense
            outlined
            rounded
            prepend-inner-icon="mdi-account"
            background-color="grey lighten-3"
            hide-details
            label="Nombres"
            placeholder="firstname and lastname"
            type="text"
            required
            v-model="name"
          ></v-text-field>
          <v-text-field
            class="my-5 py-2"
            dense
            outlined
            rounded
            prepend-inner-icon="mdi-email"
            background-color="grey lighten-3"
            hide-details
            label="E-mail"
            placeholder="@enterprice.com"
            type="email"
            required
            v-model="email"
          ></v-text-field>
          <v-text-field
            class="my-4 py-2"
            dense
            outlined
            rounded
            prepend-inner-icon="mdi-lock"
            background-color="grey lighten-3"
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
            class="my-4 py-2"
            dense
            outlined
            rounded
            prepend-inner-icon="mdi-lock-check"
            background-color="grey lighten-3"
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
            :loading="load"
            >Registrar
          </v-btn>
        </v-card-actions>
        <div class="pa-4 ma-0">
          <a
            class="float-right text-normal text-caption rounded-0 font-weight-bold secondary--text"
            @click.prevent="goToLogin()"
            >Login</a
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
      this.load = true;
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
            Vue.$toast.success("Bienvenido, " + res.data.data.user.name, {});
            const payload = {
              token: res.data.data.token,
              user: res.data.data.user,
            };
            this.$store.dispatch("auth/setUser", payload).then((res) => {
              if (res) {
                setTimeout(this.goToProfile(), 1000);
              }
            });
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
    goToProfile() {
      this.$router.push({ name: "profile" });
    },
  },
};
</script>

<style scoped>
.card-custom {
 max-width: 400px;
}
</style>
