<template>
  <div>
    <v-container fluid class="pa-12">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Perfil</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-avatar size="100">
            <v-img
              v-if="user.photo != null"
              height="100"
              width="100"
              :src="getImagePath(user.photo)"
            ></v-img>
            <v-img v-else height="100" width="100" src="/images/profile.jpg">
            </v-img>
            <v-hover v-slot="{ hover }">
              <v-btn
                class="transparent secondary--text custom-op"
                absolute
                fab
                large
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click.prevent="openCamera()"
                ><v-icon>mdi-camera</v-icon></v-btn
              >
            </v-hover>
          </v-avatar>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="E-mail"
            disabled
            :value="user.email"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nombres"
            :value="username"
            v-model="username"
            hide-details
          />
        </v-col>

        <!--<v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field dense outlined label="Teléfono" :value="user.phone" hide-details />
        </v-col>-->
      </v-row>
      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-btn
            class="primary text-normal"
            :loading="load_prof"
            @click.prevent="saveProfile()"
          >
            <v-icon left>mdi-content-save</v-icon> Guardar perfil
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col class="col-12 col-md-4 text-center">
          <a
            class="rounded-0 text-normal primary--text font-weight-bold"
            text
            @click.prevent="showChangePassword()"
            >{{ show }}</a
          >
        </v-col>
      </v-row>

      <v-row v-if="changePassword" class="justify-center">
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Contraseña actual"
            type="password"
            placeholder="***********"
            :value="password"
            v-model="password"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nueva contraseña"
            placeholder="***********"
            type="password"
            :value="new_password"
            v-model="new_password"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Confirmar nueva contrasena"
            placeholder="***********"
            type="password"
            :value="new_password_confirm"
            v-model="new_password_confirm"
            hide-details
          />
        </v-col>
        <v-col class="col-12 text-start">
          <v-btn
            class="primary font-weight-bold text-normal"
            :loading="load_pass"
            @click.prevent="onChangePassword()"
            >Cambiar contraseña</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <Camera ref="camera"></Camera>

    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import Vue from "vue";
import Camera from "@/components/global/dialogs/Camera.vue";

export default {
  name: "profile-admin",
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      show: "Mostrar cambiar contraseña",
      changePassword: false,
      password: null,
      new_password: null,
      new_password_confirm: null,
      username: null,
      load_prof: false,
      load_pass: false,
    };
  },

  mounted() {
    this.$store.dispatch("app/changeTitlePage", "Admin | Profile");
    document.title = this.$store.state.app.title_page;
    this.getData();

    this.username = this.$store.getters["auth/getUser"].name;
  },
  methods: {
    getData() {
      
      this.$refs.loading.show()

      this.$axios.get("profile/" + this.$store.getters["auth/getUserId"],this.config).then(res => {
          
          this.$store.dispatch("auth/setUserProfile",{
            user:res.data
          })
          this.$refs.loading.hide()
      }).catch(err => {
          console.log(err);
          this.$refs.loading.hide()
      });
      
    },
    showChangePassword() {
      if (this.show == "Mostrar cambiar contraseña") {
        this.changePassword = true;
        this.show = "Ocultar cambiar contraseña";
      } else {
        this.changePassword = false;
        this.show = "Mostrar cambiar contraseña";
      }
    },
    saveProfile() {
      this.load_prof = true;
      this.$refs.loading.show();
      const data = new FormData();
      data.append("name", this.username);
      data.append("id", this.$store.getters["auth/getUserId"]);
      this.$axios
        .post("update/profile", data, this.config)
        .then((res) => {
          if (res.data.success) {
            Vue.$toast.success("Perfil actualizado");
            this.getData()
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
          this.load_prof = false;
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.load_prof = false;
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    onChangePassword() {
      this.load_pass = true;
       this.$refs.loading.show();
      const data = new FormData();
      data.append("id", this.$store.getters["auth/getUserId"]);
      data.append("password", this.password);
      data.append("new_password", this.new_password);
      data.append("new_password_confirm", this.new_password_confirm);

      this.$axios
        .post("password/change", data, this.config)
        .then((res) => {
          if (res.data.success) {
            Vue.$toast.success("Contraseña actualizada");
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
          this.load_pass = false;
           this.$refs.loading.hide();
        })
        .catch((err) => {
          this.load_pass = false;
           this.$refs.loading.hide();
          console.log(err);
        });
    },
    changeImage() {
      console.log("change image");
    },
    openCamera() {
      this.$refs.camera.open("Foto de perfil", "profile/update/photo",this.$store.getters["auth/getUserId"]).then(res=>{
          if(res){
            this.getData()
          }
      });
    },
    getImagePath(url){
       return this.$url_domain + url;
    }
  },
  computed: {
    isHome() {
      return this.$store.state.app.isHome;
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    nameTransition() {
      return this.$store.state.app.pageTransition.name;
    },
    modeTransition() {
      return this.$store.state.app.pageTransition.mode;
    },
    durationTransition() {
      return this.$store.state.app.pageTransition.duration;
    },
    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
  components: { Loading, Camera },
};
</script>

<style scoped>
.custom-op {
  transition: opacity 0.4s ease-in-out;
}

.custom-op:not(.on-hover) {
  opacity: 0.1;
}
</style>
