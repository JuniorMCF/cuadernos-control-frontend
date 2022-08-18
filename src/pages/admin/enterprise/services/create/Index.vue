<template>
  <div>
    <v-container fluid class="pa-4 pa-md-12 ">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Tus servicios prestados</p>
        </v-col>
      </v-row>

      <v-card-text class="px-0">
        <v-btn
          color="primary"
          class="rounded-0 text-normal caption"
          @click="addService()"
        >
          Agregar servicio
        </v-btn>
      </v-card-text>

      <v-card-text class="white px-0">
        <v-text-field
          v-model="search"
          class=""
          outlined
          dense
          append-icon="mdi-magnify"
          label="Buscar servicio"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="services"
          :search="search"
          class="elevation-0"
        >
          <template v-slot:[`item.is_offer`]="{ item }">
            <span v-if="item.is_offer === 0">
              <v-chip class="success text-caption"> No </v-chip>
            </span>
            <span v-else>
              <v-chip class="error text-caption"> Sí </v-chip>
            </span>
          </template>

          <template v-slot:[`item.price_offer`]="{ item }">
            <span>
              {{ item.price_offer == 0 ? "---" : item.price_offer }}
            </span>
          </template>

          <template v-slot:[`item.price`]="{ item }">
            <span
              v-if="item.is_offer === 1"
              class="text-decoration-line-through"
            >
              {{ coin.symbol + " " + item.price }}
            </span>
            <span v-else>
              {{ coin.symbol + " " + item.price }}
            </span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click.prevent="edit(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click.prevent="del(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-container>

    <Form ref="form"></Form>
    <Confirm ref="confirm"></Confirm>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import Form from "@/components/global/dialogs/Form.vue";
import Vue from "vue";
import Confirm from "@/components/global/dialogs/Confirm.vue";
export default {
  name: "CirculosServicesCreateIndex",

  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      search: null,
      services: [],
      headers: [
        /*{
          text: "Foto",
          align: "start",
          sortable: false,
          value: "photo",
        },*/
        { text: "Nombre", value: "name", align: "left" },
        { text: "Descripción", value: "description", align: "left" },
        { text: "Precio", value: "price", align: "left" },
        { text: "Oferta", value: "is_offer", align: "left" },
        { text: "Precio oferta", value: "price_offer", align: "left" },

        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$refs.loading.show();

      this.$axios
        .get("services/" + this.$store.getters["auth/getUserId"], this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.services = res.data.data.services;
            this.enterprise = res.data.data.enterprise;
            this.coin = res.data.data.coin;
          }
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    addService() {
      const user_id = this.$store.getters["auth/getUserId"];
      const service = [
        {
          type: "input",
          label: "Nombre del servicio prestado",
          key: "name",
          model: "",

          type_input: "text",
          hint: "*obligatorio",
        },
        {
          type: "input",
          label: "Descripción",
          key: "description",
          model: "",
          type_input: "text",
        },
        {
          type: "input",
          label: "Precio",
          key: "price",
          model: 0,
          prefix: this.coin.symbol != null ? this.coin.symbol : "S/",
          type_input: "text",
          hint: "*obligatorio",
        },
      ];

      this.$refs.form
        .open("Nuevo servicio", "service/add", service, user_id)
        .then((res) => {
          if (res.data.success) {
            Vue.$toast.success("Servicio agregado!");
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
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(item) {
      this.$router.push({
        name: "services_edit",
        params: {
          id: item.id,
        },
      });
    },
    del(item) {
      this.$refs.confirm
        .open(
          "Atención!",
          `¿Está seguro que quiere eliminar ${item.name} de sus servicios?`
        )
        .then((res) => {
          if (res) {
            const data = new FormData();
            data.append("id", item.id);
            this.$axios
              .post("service/delete", data, this.config)
              .then((res) => {
                console.log(res);
                this.getData();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
  },
  components: { Loading, Form, Confirm },
};
</script>

<style lang="scss" scoped></style>
