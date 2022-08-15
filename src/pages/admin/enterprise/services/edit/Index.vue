<template>
  <div>
    <v-container fluid class="pa-12">
      <v-row>
        <v-col class="pa-0">
          <v-btn
            class="primary--text font-weight-bold text-normal"
            text
            @click.prevent="back()"
          >
            <v-icon dark> mdi-arrow-left </v-icon>

            Volver a servicios</v-btn
          ></v-col
        ></v-row
      >
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Editar servicio</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nombre del servicio"
            :value="service.name == null ? '' : service.name"
            v-model="service.name"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Descripción"
            :value="service.description == null ? '' : service.description"
            v-model="service.description"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Precio"
            :value="service.price == null ? 0 : service.price"
            v-model="service.price"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-select
            dense
            outlined
            :items="['Si', 'No']"
            v-model="is_offer"
            name="Oferta"
            :value="is_offer"
            label="¿Esta en oferta?"
            hide-details
          >
          </v-select>
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4" v-if="is_offer == 'Si'">
          <v-text-field
            dense
            outlined
            label="Precio de oferta"
            :value="service.price_offer == null ? 0 : service.price_offer"
            v-model="service.price_offer"
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12">
          <v-btn
            class="primary font-weight-bold text-normal"
            @click.prevent="save()"
            >Guardar cambios</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import Vue from "vue";

export default {
  name: "CirculosServicesEditIndex",
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },

      enterprise: {},
      coin: {
        id: null,
        name: "",
        symbol: "",
      },
      service: {},
      is_offer: "No",
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$refs.loading.show();

      const data = new FormData();
      data.append("user_id", this.$store.getters["auth/getUserId"]);
      data.append("id", this.$route.params.id);

      this.$axios
        .post("service/show", data, this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.service = res.data.data;

            this.is_offer = this.service.is_offer == true ? "Si" : "No";
          }
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },

    save() {
      this.$refs.loading.show();
      const data = new FormData();

      data.append("id", this.service.id);
      data.append("name", this.service.name == null ? '' : this.service.name);
      data.append("description", this.service.description == null ? '' : this.service.description);
      data.append("price", this.service.price == null ? 0 : this.service.price);
      data.append("is_offer", this.is_offer == "Si" ? 1 : 0);
      data.append("price_offer", this.service.price_offer == null ? 0 : this.service.price_offer);

      this.$axios
        .post("service/edit", data, this.config)
        .then((res) => {
          if (res.data.success === true) {
            Vue.$toast.success("Servicio actualizado");
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
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    back() {
      this.$router.push({
        name: "services",
      });
    },
  },
  components: { Loading },
};
</script>

<style lang="scss" scoped></style>
