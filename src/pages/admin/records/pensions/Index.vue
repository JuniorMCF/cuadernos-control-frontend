<template>
  <div>
    <v-container fluid class="pa-4 pa-md-12">
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">
            Ventas por servicios o pensiones
          </p>
        </v-col>
      </v-row>

      <v-card-text class="px-0 d-flex">
        <v-btn
          color="primary"
          class="rounded-0 text-normal caption"
          @click="addrecords()"
        >
          Agregar servicio
        </v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="selected.length > 0"
              class="ml-4"
              fab
              x-small
              @click.prevent="generateTicket()"
              color="success"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-ticket </v-icon>
            </v-btn>
          </template>
          <span class="text-caption">Generar boleta</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="selected.length > 0"
              class="ml-4"
              fab
              x-small
              @click.prevent="generateInvoice()"
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-receipt-text-check </v-icon>
            </v-btn>
          </template>
          <span class="text-caption">Generar factura</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="selected.length > 0"
              class="ml-4"
              fab
              x-small
              @click.prevent="generateComprobante()"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="black"> mdi-bookmark-check </v-icon>
            </v-btn>
          </template>
          <span class="text-caption">Generar comprobante</span>
        </v-tooltip>

        <v-spacer></v-spacer>
        <v-btn
          class="text-normal text-caption white--text"
          color="green darken-4"
          @click.prevent="generateExcel()"
          ><v-icon left>mdi-microsoft-excel</v-icon>Exportar a Excel</v-btn
        >
      </v-card-text>

      <v-card-text class="white px-0">
        <v-text-field
          v-model="search"
          class=""
          outlined
          dense
          append-icon="mdi-magnify"
          label="Buscar venta"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          show-select
          v-model="selected"
          :headers="headers"
          :items="records"
          :search="search"
          :sort-by="['updated_at']"
          sort-desc
          class="elevation-0"
        >
          <template v-slot:[`item.updated_at`]="{ item }">
            {{ formatDate(item.updated_at) }}
          </template>
          <template v-slot:[`item.price_actual`]="{ item }">
            {{ coin.symbol + " " + item.price_actual }}
          </template>

          <template v-slot:[`item.discount`]="{ item }">
            {{ coin.symbol + " " + item.discount }}
          </template>

          <template v-slot:[`item.total`]="{ item }">
            {{ coin.symbol + " " + total(item.price_actual * item.quantity) }}
          </template>
          <template v-slot:[`item.registered_amount`]="{ item }">
            <v-edit-dialog
              :return-value.sync="item.registered_amount"
              @save="saveAmount(item)"
              @cancel="cancelAmount"
              @open="openAmount"
              @close="closeAmount"
              large
              cancel-text="Cancelar"
              save-text="Guardar"
              class="text-caption"
            >
              {{ coin.symbol + " " + item.registered_amount }}
              <template v-slot:input>
                <v-text-field
                  dense
                  outlined
                  v-model="item.registered_amount"
                  label="Monto registrado"
                  single-line
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-edit-dialog
              :return-value.sync="item.status"
              @save="saveStatus(item)"
              @cancel="cancelStatus"
              @open="openStatus"
              @close="closeStatus"
              large
              cancel-text="Cancelar"
              save-text="Guardar"
              class="text-caption"
            >
              {{ item.status }}
              <template v-slot:input>
                <v-select
                  dense
                  outlined
                  v-model="item.status"
                  :items="['Pendiente', 'Con adelanto', 'Cancelado']"
                ></v-select>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-1"
                    small
                    @click.prevent="ticket(item)"
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                     v-if="item.invoice == null"
                  >
                    mdi-ticket
                  </v-icon>
                </template>
                <span class="text-caption">Boleta</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-1"
                    small
                    @click.prevent="invoice(item)"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                     v-if="item.invoice == null"
                  >
                    mdi-receipt-text-check
                  </v-icon>
                </template>
                <span class="text-caption">Factura</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="mr-1"
                    small
                    @click.prevent="comprobante(item)"
                    color="black"
                    v-bind="attrs"
                    v-on="on"
                    v-if="item.invoice == null"
                  >
                    mdi-bookmark-check
                  </v-icon>
                </template>
                <span class="text-caption">Comprobante</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="black white--text"
                    class="mr-1"
                    small
                    @click.prevent="generateCopy(item)"
                    v-bind="attrs"
                    v-on="on"
                    v-if="item.invoice != null"
                  >
                    mdi-content-copy
                  </v-icon>
                </template>
                <span class="text-caption">Generar copia</span>
              </v-tooltip>
              <v-spacer></v-spacer>

              <v-icon
                class="ml-2"
                small
                @click.prevent="del(item)"
                color="error"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-container>
    <DateExcel ref="date_excel"></DateExcel>
    <VentaRecordForm ref="venta_record_form"></VentaRecordForm>
    <Confirm ref="confirm"></Confirm>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import VentaRecordForm from "@/components/global/dialogs/VentaRecordForm.vue";
import Loading from "@/components/global/Loading.vue";
import Confirm from "@/components/global/dialogs/Confirm.vue";
import Vue from "vue";
import DateExcel from "@/components/global/dialogs/DateExcel.vue";

export default {
  name: "CirculosRecordsPensionIndex",
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      search: null,
      records: [],
      clients: [],
      services: [],
      enterprise: {},
      coin: {},
      headers: [
        /*{
          text: "ID",
          sortable: false,
          value: "sid",
          align: "left",
          width: "5%",
        },*/

        {
          text: "ID DOC.",
          value: "serie",
          align: "left",
          width: "5%",
        },
        {
          text: "DOC",
          sortable: false,
          value: "invoice",
          align: "left",
          width: "5%",
        },
        {
          text: "Cliente",
          align: "left",
          value: "client_name",
        },
        {
          text: "Descripción",
          align: "left",
          value: "client_description",
        },
        { text: "DNI o RUC", value: "client_dni", align: "left", width: "10%" },
        {
          text: "Servicio",
          value: "product_name",
          align: "left",
          width: "10%",
        },
        { text: "Cantidad", value: "quantity", align: "left", width: "5%" },
        {
          text: "Precio registrado",
          value: "price_actual",
          align: "left",
          width: "10%",
        },
        //{ text: "IGV", value: "tax", align: "left" },
        //{ text: "% IGV", value: "tax_aplicated", align: "left" },
        { text: "Descuento", value: "discount", align: "left", width: "10%" },
        { text: "Total a pagar", value: "total", align: "left", width: "10%" },
        {
          text: "Adelantó",
          value: "registered_amount",
          align: "left",
          width: "10%",
        },

        { text: "Estado", value: "status", align: "left", width: "5%" },
        {
          text: "Fecha actualización",
          value: "updated_at",
          align: "",
        },
        { text: "Acciones", value: "actions", sortable: false, width: "10%" },
      ],
      selected: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$refs.loading.show();

      this.$axios
        .get("records/" + this.$store.getters["auth/getUserId"], this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.records = res.data.data.records;
            this.enterprise = res.data.data.enterprise;
            this.coin = res.data.data.coin;
            this.services = res.data.data.services;
            this.clients = res.data.data.clients;
          }
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    addrecords() {
      const user_id = this.$store.getters["auth/getUserId"];
      this.$refs.venta_record_form
        .open(
          "Registrar venta de servicio",
          "record/add",
          user_id,
          this.clients,
          this.services,
          this.coin.symbol
        )
        .then((res) => {
          if (res.data.success == true) {
            Vue.$toast.success("Se registro la venta con exito!");
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save(item) {
      console.log(item);
    },
    total(total) {
      return total.toFixed(2);
    },
    saveAmount(item) {
      this.$refs.loading.show();
      const data = new FormData();

      data.append("id", item.id);
      data.append("registered_amount", item.registered_amount);

      this.$axios
        .post("record/edit", data, this.config)
        .then((res) => {
          if (res.data.success === true) {
            Vue.$toast.success("Venta actualizada");
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
    saveStatus(item) {
      this.$refs.loading.show();
      const data = new FormData();

      data.append("id", item.id);
      data.append("status", item.status);

      this.$axios
        .post("record/edit", data, this.config)
        .then((res) => {
          if (res.data.success === true) {
            Vue.$toast.success("Venta actualizada");
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
    invoice(item) {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar factura electrónica",
          "¿Seguro que quiere generar una factura para la fila seleccionada?"
        )
        .then((res) => {
          if (res) {
            const list = [item.id];
            self.generateDocument(list, "invoice");
          }
        });
    },
    ticket(item) {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar boleta electrónica",
          "¿Seguro que quiere generar una boleta para la fila seleccionada?"
        )
        .then((res) => {
          if (res) {
            const list = [item.id];
            self.generateDocument(list, "ticket");
          }
        });
    },
    comprobante(item) {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar comprobante electrónico",
          "¿Seguro que quiere generar un comprobante para la fila seleccionada?"
        )
        .then((res) => {
          if (res) {
            const list = [item.id];
            self.generateDocument(list, "comprobante");
          }
        });
    },
    generateTicket() {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar boleta electrónica",
          "¿Seguro que quiere generar una boleta para las filas seleccionadas?"
        )
        .then((res) => {
          if (res) {
            const list = [];
            self.selected.forEach(function (item) {
              list.push(item.id);
            });
            self.generateDocument(list, "ticket");
          }
        });
    },
    generateInvoice() {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar factura electrónica",
          "¿Seguro que quiere generar una factura para las filas seleccionadas?"
        )
        .then((res) => {
          if (res) {
            const list = [];
            self.selected.forEach(function (item) {
              list.push(item.id);
            });
            self.generateDocument(list, "invoice");
          }
        });
    },
    generateComprobante() {
      const self = this;
      this.$refs.confirm
        .open(
          "Generar comprobante electrónico",
          "¿Seguro que quiere generar un comprobante para las filas seleccionadas?"
        )
        .then((res) => {
          if (res) {
            const list = [];
            self.selected.forEach(function (item) {
              list.push(item.id);
            });
            self.generateDocument(list, "comprobante");
          }
        });
    },
    generateDocument(list_ids, type) {
      this.$refs.loading.show();
      const data = new FormData();
      data.append("list_ids", JSON.stringify(list_ids));
      data.append("type", type);
      data.append("user_id", this.$store.getters["auth/getUserId"]);
      data.append("concept", "service");
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "arraybuffer",
      };

      this.$axios
        .post("generate/invoice/ticket", data, config)
        .then((res) => {
          let blob = new Blob([res.data], {
            type: "application/pdf",
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          const date = new Date();
          const d_string = date.toLocaleDateString("en-ES");
          const [date_string] = d_string.split("T");

          link.download = date_string + ".pdf";
          link.click();
          this.$refs.loading.hide();

          this.selected = [];
          this.getData();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err)
          if (err.code == "ERR_BAD_REQUEST") {
            if (err.response.status == 422) {
              const elements = err.errors;
              const errors = [];
              for (let element in elements) {
                if (elements[element] != null && elements[element] != undefined) {
                  errors.push(elements[element][0]);
                }
              }

              Vue.$toast.error("" + errors.join("<br>"), {});
              }
          }
        });
    },
    generateCopy(item) {
      this.$refs.loading.show();
      const data = new FormData();
      data.append("id", item.id);
      data.append("user_id", this.$store.getters["auth/getUserId"]);
      data.append("concept", "service");
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
          "X-Requested-With": "XMLHttpRequest",
        },
        responseType: "arraybuffer",
      };

      this.$axios
        .post("generate/copy/invoice/ticket", data, config)
        .then((res) => {
          let blob = new Blob([res.data], {
            type: "application/pdf",
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          const date = new Date();
          const d_string = date.toLocaleDateString("en-ES");
          const [date_string] = d_string.split("T");

          link.download = date_string + ".pdf";
          link.click();
          this.$refs.loading.hide();

          this.selected = [];
          this.getData();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    },
    del(item) {
      this.$refs.confirm
        .open(
          "Atención!",
          `¿Está seguro que quiere eliminar esta fila de su registro de ventas?`
        )
        .then((res) => {
          if (res) {
            const data = new FormData();
            data.append("id", item.id);
            this.$axios
              .post("record/delete", data, this.config)
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
    generateExcel() {
      this.$refs.date_excel
        .open("Elija un rango de fechas", this.records, "services")
        .then((res) => {
          if (res) {
            console.log("excel download");
          }
        });
    },

    openAmount() {},
    closeAmount() {},
    cancelAmount() {},

    openStatus() {},
    closeStatus() {},
    cancelStatus() {},
  },
  components: { VentaRecordForm, Loading, Confirm, DateExcel },
};
</script>

<style lang="scss">
th {
  vertical-align: top;
  padding: 10px 10px !important;
}
</style>
