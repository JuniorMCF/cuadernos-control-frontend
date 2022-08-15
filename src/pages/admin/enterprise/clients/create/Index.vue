<template>
  <div>
    <v-container fluid class="pa-12">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Tus clientes</p>
        </v-col>
      </v-row>

      <v-card-text class="px-0">
        <v-btn
          color="primary"
          class="rounded-0 text-normal caption"
          @click="addClient()"
        >
          Agregar cliente
        </v-btn>
      </v-card-text>

      <v-card-text class="white px-0">
        <v-text-field
          v-model="search"
          class=""
          outlined
          dense
          append-icon="mdi-magnify"
          label="Buscar cliente"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="clients"
          :search="search"
          class="elevation-0"
        >
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
  name: "CirculosClientsCreateIndex",

  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      search: null,
      clients: [],
      headers: [
        {
          text: "Nombres",
          align: "start",
          sortable: false,
          value: "first_name",
        },
        { text: "Apellidos", value: "last_name", align: "left" },
        { text: "Email", value: "contact_email", align: "left" },
        { text: "Celular 1", value: "phone_number_one", align: "left" },
        { text: "Celular 2", value: "phone_number_two", align: "left" },
        { text: "DNI o RUC", value: "dni", align: "left" },

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
        .get("clients/" + this.$store.getters["auth/getUserId"], this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.clients = res.data.data.clients;
            this.enterprise = res.data.data.enterprise;
          }
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    addClient() {
      const user_id = this.$store.getters["auth/getUserId"];
      const client = [
        {
          type: "input",
          label: "Nombres",
          key: "first_name",
          model: "",

          type_input: "text",
          hint: "*obligatorio",
        },

        {
          type: "input",
          label: "Apellidos",
          key: "last_name",
          model: "",

          type_input: "text",
        },
        {
          type: "input",
          label: "DNI o RUC",
          key: "dni",
          model: "",
          type_input: "text",
          hint: "*obligatorio",
        },
        {
          type: "input",
          label: "E-mail",
          key: "contact_email",
          model: "",
          type_input: "text",
        },
        {
          type: "input",
          label: "Celular 1",
          key: "phone_number_one",
          model: "",
          type_input: "text",
        },
        {
          type: "input",
          label: "Celular 2",
          key: "phone_number_two",
          model: "",
          type_input: "text",
        },
      ];

      this.$refs.form
        .open("Nuevo cliente", "client/add", client, user_id)
        .then((res) => {
          if (res.data.success == true) {
            Vue.$toast.success("Cliente agregado!");
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
        name: "clients_edit",
        params: {
          id: item.id,
        },
      });
    },
    del(item) {
      this.$refs.confirm
        .open(
          "Atención!",
          `¿Está seguro que quiere eliminar ${item.first_name} de sus clientes?`
        )
        .then((res) => {
          if (res) {
            const data = new FormData();
            data.append("id", item.id);
            this.$axios
              .post("client/delete", data, this.config)
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
