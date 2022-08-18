<template>
  <div>
    <v-container fluid class="pa-4 pa-md-12">
      <v-row>
        <v-col class="pa-0">
          <v-btn
            class="primary--text font-weight-bold text-normal"
            text
            @click.prevent="back()"
          >
            <v-icon dark> mdi-arrow-left </v-icon>

            Volver a tus clientes</v-btn
          ></v-col
        ></v-row
      >
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Editar cliente</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nombres"
            :value="client.first_name == null ? '' : client.first_name"
            v-model="client.first_name"
            hide-details
          />
        </v-col>
        <!--<v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Apellidos"
            :value="client.last_name == null ? '' : client.last_name"
            v-model="client.last_name"
            hide-details
          />
        </v-col>-->
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Descripción del cliente"
            :value="client.description == null ? '' : client.description"
            v-model="client.description"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="E-mail"
            :value="client.contact_email == null ? '' : client.contact_email"
            v-model="client.contact_email"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Celular 1"
            :value="
              client.phone_number_one == null ? '' : client.phone_number_one
            "
            v-model="client.phone_number_one"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Celular 2"
            :value="
              client.phone_number_two == null ? '' : client.phone_number_two
            "
            v-model="client.phone_number_two"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="DNI o RUC"
            :value="client.dni == null ? '' : client.dni"
            v-model="client.dni"
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
  name: "CirculosClientesEditIndex",
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
      client: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$refs.loading.show();

      const data = new FormData();
      data.append("user_id", this.$store.getters["auth/getUserId"]);
      data.append("id", this.$route.params.id);

      this.$axios
        .post("client/show", data, this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.client = res.data.data;
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

      data.append("id", this.client.id);
      data.append(
        "first_name",
        this.client.first_name == null ? "" : this.client.first_name
      );
      /*data.append(
        "last_name",
        this.client.last_name == null ? "" : this.client.last_name
      );*/
      data.append(
        "description",
        this.client.description == null ? "" : this.client.description
      );
      data.append(
        "contact_email",
        this.client.contact_email == null ? "" : this.client.contact_email
      );
      data.append(
        "phone_number_one",
        this.client.phone_number_one == null ? "" : this.client.phone_number_one
      );
      data.append(
        "phone_number_two",
        this.client.phone_number_two == null ? "" : this.client.phone_number_two
      );
      data.append("dni", this.client.dni == null ? "" : this.client.dni);

      this.$axios
        .post("client/edit", data, this.config)
        .then((res) => {
          if (res.data.success === true) {
            Vue.$toast.success("Cliente actualizado");
            this.getData();
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
        name: "clients",
      });
    },
  },
  components: { Loading },
};
</script>

<style lang="scss" scoped></style>
