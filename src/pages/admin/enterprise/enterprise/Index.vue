<template>
  <div>
    <v-container fluid class="pa-12">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">
            Configuración de tu negocio
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-select
            dense
            outlined
            :items="coins"
            v-model="coin"
            name="Moneda"
            item-value="id"
            :item-text="(item) => item.symbol + '  ' + item.name"
            label="Tu moneda"
            hide-details
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-subtitle-1 font-weight-bold"
          >Los siguientes datos se usarán en la facturación, por favor llene
          correctamente</v-col
        >
      </v-row>
      <v-row class="justify-start">
        <v-col class="col-12 text-start"
          ><span class="text-subtitle-2 font-weight-bold">
            Logotipo de la institución
          </span></v-col
        >
        <v-col class="col-12 col-md-6 col-lg-4 text-center">
          <v-img
            v-if="enterprise.logo != null"
            height="250"
            width="250"
            :src="getPathImage(enterprise.logo)"
            class="elevation-1 justify-center align-center mx-auto mx-md-0"
          >
            <v-hover v-slot="{ hover }">
              <v-btn
                class="transparent secondary--text custom-op"
                fab
                large
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click.prevent="openCamara()"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-hover>
          </v-img>
          <v-img
            v-else
            height="250"
            width="250"
            src="/images/profile.jpg"
            class="elevation-1 justify-center align-center mx-auto"
          >
            <v-hover v-slot="{ hover }">
              <v-btn
                class="transparent secondary--text custom-op"
                fab
                large
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click.prevent="openCamara()"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-hover>
          </v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nombre de la empresa"
            :value="enterprise.name == null ? '' : enterprise.name"
            v-model="enterprise.name"
            hide-details
          />
        </v-col>

        <!--<v-col class="col-12 col-md-6 col-lg-4">
          <v-select
            dense
            outlined
            :items="countrys"
            v-model="country"
            name="País"
            item-value="id"
            item-text="name"
            label="País"
            hide-details
          />
        </v-col>-->

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Dirección"
            :value="enterprise.address == null ? '' : enterprise.address"
            v-model="enterprise.address"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="RUC"
            :value="enterprise.ruc == null ? '' : enterprise.ruc"
            v-model="enterprise.ruc"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Departamento"
            :value="enterprise.dpto == null ? '' : enterprise.dpto"
            v-model="enterprise.dpto"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Provincia"
            :value="enterprise.province == null ? '' : enterprise.province"
            v-model="enterprise.province"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Distrito"
            :value="enterprise.district == null ? '' : enterprise.district"
            v-model="enterprise.district"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Telf. 1"
            :value="
              enterprise.phone_contact_one == null
                ? ''
                : enterprise.phone_contact_one
            "
            v-model="enterprise.phone_contact_one"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Telf. 2"
            :value="
              enterprise.phone_contact_two == null
                ? ''
                : enterprise.phone_contact_two
            "
            v-model="enterprise.phone_contact_two"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Email"
            :value="enterprise.email == null ? '' : enterprise.email"
            v-model="enterprise.email"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Banco"
            :value="enterprise.banco == null ? '' : enterprise.banco"
            v-model="enterprise.banco"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nro. Cuenta"
            :value="enterprise.nro_cta == null ? '' : enterprise.nro_cta"
            v-model="enterprise.nro_cta"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Propietario Nro. Cuenta"
            :value="enterprise.propietary == null ? '' : enterprise.propietary"
            v-model="enterprise.propietary"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-select
            dense
            outlined
            :items="colors"
            v-model="color"
            name="color"
            label="Color"
            hide-details
          >
          <template slot='selection' slot-scope='{ item }'>
                  <v-chip small v-bind:style="{ background: item }" class="white--text">{{item}}</v-chip>
          </template>
          <template slot='item' slot-scope='{ item }'>
                 <v-chip small v-bind:style="{ background: item }" class="white--text">{{item}}</v-chip>
          </template>
          
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <v-btn
            class="primary font-weight-bold text-normal"
            @click.prevent="save()"
            :loading="load"
            >Guardar cambios</v-btn
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
import Camera from "@/components/global/dialogs/Camera.vue";
import Vue from "vue";
export default {
  name: "CirculosIndex",
  data() {
    return {
      enterprise: {
        id: "",
        logo: "",
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        ruc: "",
        user_id: "",
        banco: "",
        email: "",
        nro_cta: "",
        phone_contact_one: "",
        phone_contact_two: "",
        propietary: "",
        color: "#ffffff",
        dpt: "",
        province: "",
        district: "",
      },
      country: null,
      coin: null,
      countrys: [],
      coins: [],
      color: null,
      colors: [
        "#F44336",
        "#E53935",
        "#EF9A9A",
        "#E91E63",
        "#D81B60",
        "#F48FB1",
        "#9C27B0",
        "#8E24AA",
        "#CE93D8",
        "#673AB7",
        "#5E35B1",
        "#B39DDB",
        "#3F51B5",
        "#4662A3",
        "#9FA8DA",
        "#2196F3",
        "#1E88E5",
        "#90CAF9",
        "#03A9F4",
        "#039BE5",
        "#81D4FA",
        "#00BCD4",
        "#00ACC1",
        "#80DEEA",
        "#009688",
        "#00897B",
        "#80CBC4",
        "#4CAF50",
        "#43A047",
        "#A5D6A7",
        "#8BC34A",
        "#7CB342",
        "#C5E1A5",
        "#CDDC39",
        "#C0CA33",
        "#E6EE9C",
        "#FFEB3B",
        "#FDD835",
        "#FFF59D",
        "#FFC107",
        "#FFB300",
        "#FFE082",
        "#FF9800",
        "#FB8C00",
        "#FFCC80",
        "#FF5722",
        "#F4511E",
        "#FFAB91",
        "#795548",
        "#6D4C41",
        "#BCAAA4",
        "#607D8B",
        "#78909C",
        "#B0BEC5",
        "#9E9E9E",
        "#757575",
        "#EEEEEE",
        "#000000",
        "#FFFFFF",
      ],
      item: null,
      load: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$refs.loading.show();

      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      };

      this.$axios
        .get("enterprise/" + this.$store.getters["auth/getUserId"], config)
        .then((res) => {
          if (res.data.success == true) {
            this.enterprise = res.data.data.enterprise;
            this.countrys = res.data.data.countrys;
            this.coins = res.data.data.coins;

            this.country = this.enterprise.country_id;
            this.coin = this.enterprise.coin_id;
            this.color = this.enterprise.color;

            //this.country = this.enterprise.countrys[0]
            //this.coin = this.enterprise.coins[0]
          }

          this.$refs.loading.hide();
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 401) {
              this.$store.commit("auth/logout");
              this.$router.push({ name: "login" });
            }
          }

          this.$refs.loading.hide();
        });
    },
    openCamara() {
      this.$refs.camera
        .open(
          "Logotipo de la institución",
          "enterprise/update/photo",
          this.enterprise.id
        )
        .then((res) => {
          if (res) {
            Vue.$toast.success("logotipo actualizado");
            this.getData();
          } else {
            Vue.$toast.error("No se pudo actualizar su logotipo");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    save() {
      this.load = true;
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      };

      const data = new FormData();

      data.append("id", this.enterprise.id);
      data.append("name", this.enterprise.name);
      data.append("address", this.enterprise.address);
      data.append("ruc", this.enterprise.ruc);
      data.append("country_id", this.country);
      data.append("banco", this.enterprise.banco);
      data.append("nro_cta", this.enterprise.nro_cta);
      data.append("propietary", this.enterprise.propietary);
      data.append("dpto", this.enterprise.dpto);
      data.append("province", this.enterprise.province);
      data.append("district", this.enterprise.district);
      data.append("phone_contact_one", this.enterprise.phone_contact_one);
      data.append("phone_contact_two", this.enterprise.phone_contact_two);
      data.append("email", this.enterprise.email);
      data.append("color", this.color);
      data.append("coin_id", this.coin);

      this.$axios
        .post("enterprise/save", data, config)
        .then((res) => {
          const { success, message } = res.data;

          if (success) {
            Vue.$toast.success(message);
          }
          this.load = false
        })
        .catch((err) => {
          this.load = false
          console.log(err);
        });
    },

    getPathImage(url) {
      return this.$url_domain + url;
    },
  },
  components: { Loading, Camera },
};
</script>

<style lang="scss" scoped></style>
