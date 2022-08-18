<template>
  <header>
    <v-card
      id="container-header"
      class="elevation-5 header-open ma-0 pa-0 rounded-0"
    >
      <v-toolbar color="white" light class="elevation-0">
        <v-app-bar-nav-icon
          id="navbar_icon"
          color="black"
         
          @click="drawer=!drawer"
        ></v-app-bar-nav-icon>
        <!--<v-toolbar-title class="black--text">{{ actualPage }}</v-toolbar-title>-->
        <v-spacer></v-spacer>

        <v-menu bottom min-width="200px" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="grey lighten-1" size="48">
                <v-img
                  v-if="user.photo != null"
                  height="48"
                  width="48"
                  :src="getImagePath(user.photo)"
                ></v-img>
                <v-img v-else height="48" width="48" src="/images/profile.jpg">
                </v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center px-4">
                <v-avatar color="grey lighten-1">
                  <v-img
                    v-if="user.photo != null"
                    height="50"
                    width="50"
                    :src="getImagePath(user.photo)"
                  ></v-img>
                  <v-img
                    v-else
                    height="50"
                    width="50"
                    src="/images/profile.jpg"
                  >
                  </v-img>
                </v-avatar>
                <h3 class="py-2 black--text">{{ getUserName(user) }}</h3>
                <p class="text-caption black--text my-1 black--text">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <!--<v-btn block class="text-normal  caption" depressed  text>Editar perfil</v-btn>-->
                <!--<v-divider class="my-3"></v-divider>-->
                <v-btn
                  @click.prevent="logout()"
                  block
                  class="text-normal black--text caption"
                  depressed
                  text
                  >Cerrar sesión</v-btn
                >
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer disable-resize-watcher absolute left class="black px-3 py-3" v-model="drawer">
      <v-list dense class="py-0">
        <v-list-item-content class="black">
          <v-list-item-title class="title d-flex justify-center align-center">
            <v-card class="elevation-0 rounded-0" color="black" contain>
              <v-card-text class="pa-0">
                <v-icon right color="white">mdi-xml</v-icon>
                <span class="white--text font-weight-bold">Jr.dev</span>
              </v-card-text>
            </v-card>
          </v-list-item-title>
        </v-list-item-content>
      </v-list>

      <v-list dense>
        <v-list-group
          v-for="item in items_group"
          :key="item.title"
          active-class="grey darken-2 white--text"
          :value="active_tab === item.active ? true : false"
          :append-icon="item.subitems.length === 0 ? null : '$expand'"
          @click.prevent="goToRoute(item)"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="rounded-0 white--text">
              <v-list-item-title
                v-text="item.title"
                class="caption white--text"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            dense
            v-for="child in item.subitems"
            :key="child.title"
            @click.prevent="goToRoute(child)"
            :value="active_tab_child === child.active ? true : false"
            active-class="grey darken-2 white--text"
          >
            <v-list-item-content class="rounded-0">
              <v-list-item-title
                v-text="child.title"
                class="caption white--text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  name: "navbar-component",
  data: () => ({
    active: 0,
    drawer: window.innerWidth < 1263 ? false : true,
  }),
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);

    
  },
  methods: {
    goToRoute(element) {
      if (element.subitems.length == 0) {
        if (window.innerWidth < 1263) {
          this.drawer = false;
          //this.$store.dispatch("app/setDrawer", false);
        } else {
          this.drawer = true;
          //this.$store.dispatch("app/setDrawer", true);
        }

        /**action and change active */
        this.$router.push({ path: element.route }).catch(() => {});
        return;
      }

      this.$store.dispatch("app/setActiveTab", element);

      //console.log(element)
    },

    openClose() {
      let container_header = document.getElementById("container-header");
      let container_main = document.getElementById("container-main");
      //this.$store.getters["app/getDrawer"]
      if (this.drawer) {
        container_header.classList.remove("header-open");
        container_header.classList.add("header-close");

        container_main.classList.remove("main-open");
        container_main.classList.add("main-close");
      } else {
        container_header.classList.remove("header-close");
        container_header.classList.add("header-open");

        container_main.classList.remove("main-close");
        container_main.classList.add("main-open");
      }

      this.drawer = !this.drawer

      //this.$store.dispatch("app/setDrawer", !this.$store.getters["app/getDrawer"]);
    },
    getUserName(user) {
      return user.name;
    },
    onResize() {
      let container_header = document.getElementById("container-header");
      let container_main = document.getElementById("container-main");
      if (window.innerWidth < 1263) {
        container_header.classList.remove("header-open");
        container_header.classList.add("header-close");

        container_main.classList.remove("main-open");
        container_main.classList.add("main-close");
      } else {
        //this.$store.getters["app/getDrawer"]
        if (this.drawer) {
          container_header.classList.remove("header-close");
          container_header.classList.add("header-open");

          container_main.classList.remove("main-close");
          container_main.classList.add("main-open");
        } else {
          container_header.classList.remove("header-open");
          container_header.classList.add("header-close");

          container_main.classList.remove("main-open");
          container_main.classList.add("main-close");
        }
      }
    },
    logout() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      };

      this.$axios
        .post("logout", config)
        .then((res) => {
          console.log(res);

          this.$store.dispatch("auth/logout");

          this.$store.dispatch("app/setActiveTab", {
            route: "/admin/profile",
            active: "profile",
            title: "Profile",
            subitems: [],
            icon: "mdi-account",
          });

          this.$router.push({ path: "/login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getImagePath(url) {
      return this.$url_domain + url;
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user == null
        ? { name: "", photo: null, email: "" }
        : this.$store.state.auth.user;
    },
    items_group() {
      return this.$store.getters["app/getList"];
    },
    active_tab() {
      return this.$store.getters["app/getActiveTab"];
    },
    active_tab_child() {
      return this.$store.getters["app/getActiveTabChild"];
    },
    /*drawer: {
      get() {
        return this.$store.getters["app/getDrawer"];
      },
      set(val) {
        return val;
      },
    },*/
  },
};
</script>

<style>
.header-open {
  position: absolute;
  top: 0px;
  width: calc(100% - 256px);
  left: 256px;
  transition: all 0.18s ease-out;
  z-index: 0 !important;
}

.header-close {
  position: absolute;
  top: 0px;
  width: 100%;
  left: 0px;
  transition: all 0.1s ease-out;
}

.main-open {
  position: absolute;
  top: 64px;
  left: 256px;
  width: calc(100% - 256px);
  transition: all 0.18s ease-out;
}

.main-close {
  position: absolute;
  top: 64px;
  left: 0px;
  width: 100%;
  transition: all 0.1s ease-out;
}

.v-list-item__icon i {
  color: white !important;
}

/**route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(150px);
}

.route-enter-active {
  transition: ass 0.5s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}

.route-leave-active {
  transition: all 0.5s ease-in;
}
</style>
