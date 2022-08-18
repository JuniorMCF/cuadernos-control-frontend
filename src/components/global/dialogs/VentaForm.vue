<template>
  <v-dialog
    opacity="0.3"
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
    persistent
    scrollable
  >
    <v-card class="rounded-lg">
      <v-card-text class="pa-5 d-flex">
        <v-toolbar-title class="text-truncate">
          <span class="title font-weight-bold black--text text-truncate">
            {{ title }}
          </span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          small
          fab
          text
          class="rounded-circle w-10"
          @click="dialog = !dialog"
        >
          <v-icon class="rounded-circle"> mdi-close </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider class="mb-2 ma-0"></v-divider>

      <v-card-text class="pa-4 px-10">
        <v-container fluid class="ma-0 pa-0">
          <v-row justify="center" class="my-0 py-0">
            <v-col cols="12" sm="6" md="8" class="my-0 py-0">
              <v-radio-group
                v-model="type_client"
                :row="true"
                @change="changeTypeClient"
              >
                <v-radio label="Cliente antiguo" value="cliente"></v-radio>
                <v-radio label="Nuevo cliente" value="externo"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-row v-if="type_client == 'cliente'">
            <v-col class="col-12 col-md-6">
              <v-autocomplete
                dense
                outlined
                :items="clients"
                v-model="client"
                name="first_name"
                item-text="first_name"
                label="Seleccione un cliente"
                v-on:change="changeClient"
                :filter="customFilter"
                hide-details
                return-object
              >
                <template slot="selection" slot-scope="{ item }">
                  <span class="text-truncate">
                    {{ item.first_name }}
                  </span>
                </template>
                <template slot="item" slot-scope="{ item }">
                  <div class="d-block">
                    <div class="pa-0 ma-0 text-caption">
                      {{ item.first_name }}
                    </div>
                    <div class="pa-0 ma-0 text-caption">{{ item.dni }}</div>
                  </div>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-text-field
                dense
                outlined
                label="DNI o RUC"
                :value="client.dni == null ? '' : client.dni"
                v-model="client.dni"
                hide-details
                disabled
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="col-12 col-md-6">
              <v-text-field
                dense
                outlined
                label="Cliente"
                :value="client.first_name == null ? '' : client.first_name"
                v-model="client.first_name"
                hide-details
              />
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-text-field
                dense
                outlined
                label="DNI o RUC"
                :value="client.dni == null ? '' : client.dni"
                v-model="client.dni"
                hide-details
              />
            </v-col>
            <v-col class="col-12">
              <v-text-field
                dense
                outlined
                label="Descripción del cliente"
                :value="client.description == null ? '' : client.description"
                v-model="client.description"
                hide-details
              />
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col class="col-12 col-md-6">
              <v-autocomplete
                dense
                outlined
                :items="products"
                v-model="product"
                v-on:change="changeProduct"
                name="name"
                item-text="name"
                label="Seleccione un producto"
                hide-details
                return-object
              >
                <template slot="selection" slot-scope="{ item }">
                  <span class="text-truncate">
                    {{ item.name }}
                  </span>
                </template>
                <template slot="item" slot-scope="{ item }">
                  <span class="text-truncate" v-if="item.is_offer == 0"> 
                    {{ item.name }}
                  </span>
                  <span class="text-truncate" v-else> 
                    {{ item.name }} <v-chip color="primary" class="text-caption" x-small>oferta</v-chip>
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col class="col-4 col-md-2">
              <span>Cantidad: </span>
            </v-col>
            <v-col class="col-8 col-md-4">
              <v-text-field
                readonly
                dense
                outlined
                hide-details
                v-model="quantity"
                :value="quantity"
                class="centered-input"
              >
                <v-icon slot="append" color="primary" @click.prevent="plus()">
                  mdi-plus
                </v-icon>
                <v-icon
                  slot="prepend-inner"
                  color="primary"
                  @click.prevent="minus()"
                >
                  mdi-minus
                </v-icon>
              </v-text-field>
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-select
                dense
                outlined
                :items="['Pendiente', 'Con adelanto', 'Cancelado']"
                v-model="state"
                name="name"
                :value="state"
                label="Estado de la venta"
                hide-details
              />
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-text-field
                :prefix="symbol"
                dense
                outlined
                label="Monto"
                :value="monto"
                v-model="monto"
                hide-details
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider class="mt-2 ma-0"></v-divider>
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="body-2 font-weight-bold rounded-lg elevation-0 text-normal"
          large
          @click.prevent="sendForm()"
          :loading="loading"
          >Enviar formulario</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CirculosVentaForm",

  data() {
    return {
      title: "",
      images: null,
      dialog: false,
      resolve: null,
      reject: null,
      loading: false,

      /**variables form */
      type_client: "cliente",

      options: {
        color: "primary",
        width: 600,
        zIndex: 200,
        noconfirm: false,
      },
      path: "",
      form: [],
      clients: [],
      products: [],
      user_id: null,
      client: {
        id: "",
        first_name: "",
        dni: "",
      },
      quantity: 1,
      monto: 0,
      product: {
        name: "",
      },
      symbol: "S/",
      state: "Cancelado", //cancelado, con adelanto
    };
  },

  mounted() {},

  methods: {
    open(title, path, user_id, clients, products, symbol, options) {
      this.dialog = true;
      this.title = title;
      this.path = path;
      this.user_id = user_id;
      this.clients = clients;
      this.products = products;
      this.symbol = symbol;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
    changeClient(client) {
      this.client = client;
    },
    changeTypeClient(type) {
      if (type == "externo") {
        this.client = { id: "", first_name: "", dni: "" };
      }
    },
    changeProduct(product) {
      this.product = product;
      console.log(this.product);
      if (this.product.price != null) {
        this.monto =
          this.product.is_offer == 1
            ? this.product.price_offer * this.quantity
            : this.product.price * this.quantity;
      }
    },
    plus() {
      console.log(this.product);
      this.quantity += 1;
      if (this.product.price != null) {
        this.monto =
          this.product.is_offer == 1
            ? this.product.price_offer * this.quantity
            : this.product.price * this.quantity;
      }
    },
    minus() {
      if (this.quantity > 1) {
        this.quantity -= 1;
        if (this.product.price != null) {
          this.monto =
            this.product.is_offer == 1
              ? this.product.price_offer * this.quantity
              : this.product.price * this.quantity;
        }
      }
    },

    sendForm() {
      this.loading = true;
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      };
      const data = new FormData();

      data.append("user_id", this.user_id);
      data.append("client_id", this.client.id);
      data.append("first_name", this.client.first_name);
      data.append("description", this.client.description);
      data.append("dni", this.client.dni);
      data.append("product_id", this.product.id);
      data.append("quantity", this.quantity);
      data.append("amount", this.monto);
      data.append("status", this.state);

      this.$axios
        .post(this.path, data, config)
        .then((res) => {
          this.resolve(res);

          this.loading = false;
          this.dialog = false;
        })
        .catch((err) => {
          this.resolve(err);
          this.loading = false;
          this.dialog = false;
          console.log(err);
        });
    },
    customFilter(item, queryText) {
      const textOne = item.first_name.toLowerCase();
      const textTwo = item.dni.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
};
</script>

<style lang="scss">
.centered-input input {
  text-align: center;
}
</style>
