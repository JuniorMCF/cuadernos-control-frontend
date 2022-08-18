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
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Rango de fechas"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker locale="es" v-model="dates" range></v-date-picker>
            </v-menu>
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
          @click.prevent="generateExcel()"
          :loading="loading"
          >Exportar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default {
  name: "CirculosVentaForm",

  data() {
    return {
      title: "",

      dialog: false,
      resolve: null,
      reject: null,
      loading: false,
      menu: false,
      data: null,
      options: {
        color: "primary",
        width: 600,
        zIndex: 200,
        noconfirm: false,
      },
      dates: [],
    };
  },

  mounted() {},

  methods: {
    open(title, data, type, options) {
      this.dialog = true;
      this.title = title;
      this.data = data;
      this.type = type;
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
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "updated_at") {
            const [date_string] = v[j].split("T");
            return date_string;
          } else {
            return v[j];
          }
        })
      );
    },
    generateExcel() {
      this.loading = true;
      if (this.data.length == 0) {
        Vue.$toast.warning("No hay datos en la tabla");
        this.loading = false;
        return;
      }
      if (this.dates.length == 2) {
        const [date_start_string] = this.dates[0].split("T");
        const [date_end_string] = this.dates[1].split("T");

        let date_start = new Date(date_start_string);
        let date_end = new Date(date_end_string);

        if (date_start > date_end) {
          date_start = new Date(date_end_string);
          date_end = new Date(date_start_string);
        }

        const filter_data = this.data.filter((item) => {
          const [data_updated_at_string] = item.updated_at.split("T");
          const data_updated_at = new Date(data_updated_at_string);

          return (
            data_updated_at.getTime() >= date_start.getTime() &&
            data_updated_at.getTime() <= date_end.getTime()
          );
        });
        let type_document = "prod";
        let t_header = [
          "Serie",
          "Documento",
          "Cliente",
          "DNI o RUC",
          "Producto",
          "Cantidad",
          "Precio registrado",
          "Descuento",
          "Adelantó",
          "Estado",
          "Fecha Actualización",
        ];
        let filter_val = [
          "serie",
          "invoice",
          "client_name",
          "client_dni",
          "product_name",
          "quantity",
          "price_actual",
          "tax_aplicated",
          "registered_amount",
          "status",
          "updated_at",
        ];
        if (this.type == "services") {
          t_header = [
            "Serie",
            "Documento",
            "Cliente",
            "DNI o RUC",
            "Servicio",
            "Cantidad",
            "Precio registrado",
            "Descuento",
            "Adelantó",
            "Estado",
            "Fecha Actualización",
          ];
          filter_val = [
            "serie",
            "invoice",
            "client_name",
            "client_dni",
            "service_name",
            "quantity",
            "price_actual",
            "tax_aplicated",
            "registered_amount",
            "status",
            "updated_at",
          ];
          type_document = "serv";
        }
        const self = this;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = t_header;
          const filterVal = filter_val;
          const list = filter_data;
          const data = self.formatJson(filterVal, list);
          const d = new Date();
          let title = type_document + "_" + d.toLocaleDateString("en-ES");

          excel.export_json_to_excel({
            header: tHeader, //Header Required
            data, //Specific data Required
            filename: title, //Optional
            autoWidth: true, //Optional
            bookType: "xlsx", //Optional
          });
          self.loading = false;
          self.resolve(true);
          self.dialog = false;
        });
      } else {
        Vue.$toast.info("Seleccione un rango de fechas para la exportación");
        this.loading = false;
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style lang="scss"></style>
