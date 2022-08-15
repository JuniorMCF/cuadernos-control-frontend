<template>
  <div>
    <v-container fluid class="pa-12">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Tus productos</p>
        </v-col>
      </v-row>

      <v-card-text class="px-0">
        <v-btn
          color="primary"
          class="rounded-0 text-normal caption"
          @click.prevent="addProduct()"
        >
          Agregar producto
        </v-btn>
      </v-card-text>

      <v-card-text class="white px-0">
        <v-text-field
          v-model="search"
          class=""
          outlined
          dense
          append-icon="mdi-magnify"
          label="Buscar producto"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="products"
          :search="search"
          class="elevation-0"
        >
          <template v-slot:[`item.is_offer`]="{ item }">
            <span v-if="item.is_offer === 0"> No </span>
            <span v-else> Sí </span>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{ coin.symbol + " " + item.price }}
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
  name: "CirculosProductsCreateIndex",
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      search: null,
      products: [],
      enterprise: {},
      coin: {
        id: null,
        name: "",
        symbol: "",
      },
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
        //{ text: "Oferta", value: "is_offer", align: "left" },
        //{ text: "Precio oferta", value: "price_offer", align: "left" },
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
        .get("products/" + this.$store.getters["auth/getUserId"], this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.products = res.data.data.products;
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
    addProduct() {
      const user_id = this.$store.getters["auth/getUserId"];
      const product = [
        {
          type: "input",
          label: "Nombre del producto",
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
        .open("Nuevo producto", "product/add", product, user_id)
        .then((res) => {
          if (res.data.success) {
            Vue.$toast.success("Producto agregado!");
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
        name: "products_edit",
        params: {
          id: item.id,
        },
      });
    },
    del(item) {
      this.$refs.confirm
        .open(
          "Atención!",
          `¿Está seguro que quiere eliminar ${item.name} de sus productos?`
        )
        .then((res) => {
          if (res) {
            const data = new FormData();
            data.append("id", item.id);
            this.$axios
              .post("product/delete", data, this.config)
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
