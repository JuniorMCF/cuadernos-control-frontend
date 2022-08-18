<template>
  <div>
    <v-container fluid class="pa-4 pa-md-12 ">
      <v-row>
        <v-col class="col-12 col-sm-8 col-md-8 col-lg-10">
          <p class="font-weight-bold text-h5 my-0">Tus estadísticas</p>
        </v-col>
        <v-col class="col-12 col-sm-4 col-md-4 col-lg-2">
          <v-select
            label="Año"
            :items="years"
            v-model="year"
            @change="changeYear"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-sm-6 col-md-3 col-lg-3 text-center">
          <v-card
            min-height="140"
            class="d-flex flex-column justify-space-between"
          >
            <v-card-text class="text-center text-subtitle font-weight-bold">
              RECAUDO EN PRODUCTOS MES ACTUAL
            </v-card-text>

            <v-container>
              <v-row>
                <v-col>
                  <span class="text-caption">DEL AÑO</span><br />
                  <span class="font-weight-bold grey--text text-subtitle-2">
                    {{ coin.symbol + " " + total_sales_actual_year }}</span
                  >
                </v-col>
                <v-col>
                  <span class="text-caption">DEL MES</span><br />
                  <span class="font-weight-bold primary--text text-subtitle-2">
                    {{ coin.symbol + " " + total_sales_actual_month }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-3 col-lg-3 text-center">
          <v-card
            min-height="140"
            class="d-flex flex-column justify-space-between"
          >
            <v-card-text class="text-center text-subtitle font-weight-bold">
              RECAUDO EN SERVICIOS MES ACTUAL
            </v-card-text>

            <v-container>
              <v-row>
                <v-col>
                  <span class="text-caption">DEL AÑO</span><br />
                  <span class="font-weight-bold grey--text text-subtitle-2">
                    {{ coin.symbol + " " + total_records_actual_year }}</span
                  >
                </v-col>
                <v-col>
                  <span class="text-caption">DEL MES</span><br />
                  <span class="font-weight-bold success--text text-subtitle-2">
                    {{ coin.symbol + " " + total_records_actual_month }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-3 col-lg-3 text-center">
          <v-card
            min-height="140"
            class="d-flex flex-column justify-space-between"
          >
            <v-card-text class="text-center text-subtitle font-weight-bold">
              TOTAL RECAUDO AMBOS
            </v-card-text>

            <v-container>
              <v-row>
                <v-col>
                  <span class="text-caption">DEL AÑO</span><br />
                  <span class="font-weight-bold grey--text text-subtitle-2">{{
                    coin.symbol + " " + getTotal
                  }}</span>
                </v-col>
                <v-col>
                  <span class="text-caption">DEL MES</span><br />
                  <span class="font-weight-bold black--text text-subtitle-2">
                    {{ coin.symbol + " " + getTotalMonth }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-3 col-lg-3 text-center">
          <v-card
            min-height="140"
            class="d-flex flex-column justify-space-between"
          >
            <v-card-text class="text-center text-subtitle font-weight-bold">
              TOTAL POR DEUDAS
            </v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <span class="text-caption">DEL AÑO</span><br />
                  <span class="font-weight-bold grey--text text-subtitle-2">{{
                    coin.symbol + " " + total_debt_year
                  }}</span>
                </v-col>
                <v-col>
                  <span class="text-caption">DEL MES</span><br />
                  <span class="font-weight-bold error--text text-subtitle-2">
                    {{ coin.symbol + " " + total_debt_month }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              VENTAS DIARIAS
            </v-card-text>
            <v-card-text>
              <GChart :type="type_wc" :data="data_wc" :options="options_wc" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              VENTAS POR MES
            </v-card-text>
            <v-card-text>
              <GChart :type="type_ac" :data="data_ac" :options="options_ac" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              PRODUCTOS MÁS VENDIDOS
            </v-card-text>
            <v-card-text>
              <GChart :type="type_pc" :data="data_pc" :options="options_pc" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              PRODUCTOS QUE MÁS RECAUDAN
            </v-card-text>
            <v-card-text>
              <GChart
                :type="type_pmc"
                :data="data_pmc"
                :options="options_pmc"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              SERVICIOS MÁS VENDIDOS
            </v-card-text>
            <v-card-text>
              <GChart :type="type_sc" :data="data_sc" :options="options_sc" />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              SERVICIOS QUE MÁS RECAUDAN
            </v-card-text>
            <v-card-text>
              <GChart
                :type="type_smc"
                :data="data_smc"
                :options="options_smc"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="justify-center">
        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              BOLETAS, FACTURAS Y COMPROB. EMITIDAS
            </v-card-text>
            <v-card-text>
              <GChart :type="type_ic" :data="data_ic" :options="options_ic" />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
          <v-card>
            <v-card-text class="text-center text-subtitle font-weight-bold">
              CLIENTES MOROSOS
            </v-card-text>
            <v-card-text>
              <GChart :type="type_cc" :data="data_cc" :options="options_cc" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loading ref="loading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/global/Loading.vue";
import { GChart } from "vue-google-charts/legacy";
const color_1 = ["#673AB7", "#8BC34A"];
const color_2 = ["#8BC34A", "#673AB7"];
const color_3 = ["#4CAF50", "#E91E63", "#009688"];
const color_4 = [
  "#795548",
  "#FF5722",
  "#FF9800",
  "#FFC107",
  "#FFEB3B",
  "#CDDC39",
  "#8BC34A",
  "#4CAF50",
  "#009688",
  "#00BCD4",
  "#03A9F4",
  "#2196F3",
  "#3F51B5",
  "#673AB7",
  "#9C27B0",
  "#E91E63",
  "#F44336",
];
export default {
  name: "CirculosStatisticsIndex",

  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      },
      years: [],
      year: 2022,
      coin: {
        symbol: "S/.",
      },
      total_sales_actual_month: 0.0,
      total_sales_actual_year: 0.0,
      total_records_actual_month: 0.0,
      total_records_actual_year: 0.0,
      total_debt_month: 0.0,
      total_debt_year: 0.0,
      //wednesday
      type_wc: "ColumnChart",
      data_wc: [["Día", "Productos", "Servicios"]],
      options_wc: {
        colors: color_1,
        hAxis: {
          title: "Dias de la semana",
          titleTextStyle: { color: "#333" },
        },
        vAxis: { title: "Monto total", minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
      },
      //month
      type_ac: "AreaChart",
      data_ac: [["Año", "Productos", "Servicios"]],
      options_ac: {
        colors: color_1,
        hAxis: { title: "Meses del año", titleTextStyle: { color: "#333" } },
        vAxis: { title: "Monto total", minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
      },
      //top 10 productos por cantidad
      type_pc: "BarChart",
      data_pc: [["Producto", "Cantidad"],['', 0]],
      options_pc: {
        colors: color_1,
        title: "Top 10",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Total vendidos",
          minValue: 0,
        },
        vAxis: {
          title: "Producto",
        },
      },
      //top 10 productos por monto
      type_pmc: "BarChart",
      data_pmc: [["Producto", "Monto"],['', 0]],
      options_pmc: {
        colors: color_1,
        title: "Top 10",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Monto por producto",
          minValue: 0,
        },
        vAxis: {
          title: "Producto",
        },
      },

      //top 10 servicios por cantidad
      type_sc: "BarChart",
      data_sc: [["Servicio1", "Cantidad"],['', 0]],
      options_sc: {
        colors: color_2,
        title: "Top 10",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Total vendidos",
          minValue: 0,
        },
        vAxis: {
          title: "Servicio",
        },
      },
      //top 10 servicios por monto
      type_smc: "BarChart",
      data_smc: [["Servicio", "Monto"],['', 0]],
      options_smc: {
        colors: color_2,
        title: "Top 10",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Monto por servicio",
          minValue: 0,
        },
        vAxis: {
          title: "Servicio",
        },
      },

      //boletas y facturas emitidas
      type_ic: "PieChart",
      data_ic: [["Tipo Doc.", "Cantidad"],['No data', 0]],
      options_ic: {
        colors: color_3,
        title: "x Cantidad",
        pieHole: 0.4,
      },

      //clientes morosos
      type_cc: "PieChart",
      data_cc: [["Cliente", "Deuda"],['No data', 0]],
      options_cc: {
        colors: color_4,
        title: "Nombres y apellidos",
        pieHole: 0.0,
      },
    };
  },

  mounted() {
    const date = new Date();
    this.year = date.getFullYear();
    const year_init = 2022; // año en que se realizo el software
    for (let i = 0; i < 20; i++) {
      this.years.push(year_init + i);
    }
    this.getData();
  },

  methods: {
    getData() {
      this.$refs.loading.show();
      const data = new FormData();
      data.append("user_id", this.$store.getters["auth/getUserId"]);
      data.append("year", this.year);
      this.$axios
        .post("statistics", data, this.config)
        .then((res) => {
          if (res.data.success == true) {
            const {
              sales_current_month_total,
              sales_current_year_total,
              records_current_month_total,
              records_current_year_total,
              difference_month,
              difference_year,
              sales_weekly,
              records_weekly,
              sales_months,
              records_months,
              top_ten_sales_quantity,
              top_ten_record_quantity,
              top_ten_sales_amount,
              top_ten_records_amount,
              sales_invoices,
              records_invoices,
              top_ten_clients_sales,
              top_ten_clients_records,
            } = res.data.data;

            this.cleanData();

            this.total_sales_actual_month = sales_current_month_total;
            this.total_sales_actual_year = sales_current_year_total;
            this.total_records_actual_month = records_current_month_total;
            this.total_records_actual_year = records_current_year_total;
            this.total_debt_month = difference_month;
            this.total_debt_year = difference_year;

            const _group_sales_weekly = this.mappingDayOfWeek(sales_weekly);
            const _group_records_weekly = this.mappingDayOfWeek(records_weekly);
            this.getWeeklyChart(_group_sales_weekly, _group_records_weekly);

            const _group_sales_month = this.mappingMonth(sales_months);
            const _group_records_month = this.mappingMonth(records_months);
            this.getMonthChart(_group_sales_month, _group_records_month);

            if (top_ten_sales_quantity.length > 0) {
              this.getTopTenSales(top_ten_sales_quantity, this.data_pc);
            }
            if (top_ten_sales_quantity.length > 0) {
              this.getTopTenRecords(top_ten_record_quantity, this.data_sc);
            }

            if (top_ten_sales_amount.length > 0) {
              this.getTopTenSales(top_ten_sales_amount, this.data_pmc);
            }
            if (top_ten_sales_amount.length > 0) {
              this.getTopTenRecords(top_ten_records_amount, this.data_smc);
            }

            this.getInvoices(sales_invoices, records_invoices);
            this.getClients(top_ten_clients_sales, top_ten_clients_records);
          }
          this.$refs.loading.hide();
        })
        .catch((err) => {
          this.$refs.loading.hide();
          console.log(err);
        });
    },
    changeYear(year) {
      this.year = year;
      this.getData();
    },
    cleanData() {
      this.total_sales_actual_month = 0.0;
      this.total_sales_actual_year = 0.0;
      this.total_records_actual_month = 0.00;
      this.total_records_actual_year = 0.0;
      this.total_debt_month = 0.0;
      this.total_debt_year = 0.0;
      this.data_wc = [["Día", "Productos", "Servicios"]];
      this.data_ac = [["Año", "Productos", "Servicios"]];
      this.data_pc =  [["Producto", "Cantidad"],['', 0]]
      this.data_pmc = [["Producto", "Monto"],['', 0]];
      this.data_sc = [["Servicio1", "Cantidad"],['', 0]];
      this.data_smc = [["Servicio", "Monto"],['', 0]];
      this.data_ic = [["Tipo Doc.", "Cantidad"],['No data', 0]];
      this.data_cc = [["Cliente", "Deuda"],['No data', 0]];
    },
    getClients(sales, records) {
      let names = [];
      let totals = [];
      sales.forEach((s) => {
        names.push({ name: s.client_name });
        totals.push({ total: s.total });
      });
      records.forEach((s) => {
        names.push({ name: s.client_name });
        totals.push({ total: s.total });
      });

      this.groupByClients(names, totals);
    },
    getInvoices(sales, records) {
      let boleta = 0;
      let factura = 0;
      let comprobante = 0;
      sales.forEach((s) => {
        if (s.invoice == "Boleta") {
          boleta += s.total;
        }
        if (s.invoice == "Factura") {
          factura += s.total;
        }
        if (s.invoice == "Comprobante") {
          comprobante += s.total;
        }
      });
      records.forEach((s) => {
        if (s.invoice == "Boleta") {
          boleta += s.total;
        }
        if (s.invoice == "Factura") {
          factura += s.total;
        }
        if (s.invoice == "Comprobante") {
          comprobante += s.total;
        }
      });

      this.data_ic.push(["Boleta", boleta]);
      this.data_ic.push(["Factura", factura]);
      this.data_ic.push(["Comprobante", comprobante]);
    },
    getTopTenSales(collection, data_chart) {
      collection.forEach((c) => {
        let data = [c.product_name, parseFloat(c.total)];
        data_chart.push(data);
      });
    },
    getTopTenRecords(collection, data_chart) {
      collection.forEach((c) => {
        let data = [c.service_name, parseFloat(c.total)];
        data_chart.push(data);
      });
    },
    getMonthChart(sales, records) {
      const ene = this.groupByMonthAndSumTotalQuantity(sales, records, "Enero");
      const feb = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Febrero"
      );
      const mar = this.groupByMonthAndSumTotalQuantity(sales, records, "Marzo");
      const abr = this.groupByMonthAndSumTotalQuantity(sales, records, "Abril");
      const may = this.groupByMonthAndSumTotalQuantity(sales, records, "Mayo");
      const jun = this.groupByMonthAndSumTotalQuantity(sales, records, "Junio");
      const jul = this.groupByMonthAndSumTotalQuantity(sales, records, "Julio");
      const ago = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Agosto"
      );
      const sep = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Septiembre"
      );
      const oct = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Octubre"
      );
      const nov = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Noviembre"
      );
      const dic = this.groupByMonthAndSumTotalQuantity(
        sales,
        records,
        "Diciembre"
      );

      this.data_ac.push(ene);
      this.data_ac.push(feb);
      this.data_ac.push(mar);
      this.data_ac.push(abr);
      this.data_ac.push(may);
      this.data_ac.push(jun);
      this.data_ac.push(jul);
      this.data_ac.push(ago);
      this.data_ac.push(sep);
      this.data_ac.push(oct);
      this.data_ac.push(nov);
      this.data_ac.push(dic);
    },
    getWeeklyChart(sales, records) {
      const monday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Lunes"
      );
      const tuesday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Martes"
      );
      const wednesday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Miércoles"
      );
      const thursday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Jueves"
      );
      const friday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Viernes"
      );
      const saturday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Sábado"
      );
      const sunday = this.groupByDayAndSumTotalQuantity(
        sales,
        records,
        "Domingo"
      );

      this.data_wc.push(monday);
      this.data_wc.push(tuesday);
      this.data_wc.push(wednesday);
      this.data_wc.push(thursday);
      this.data_wc.push(friday);
      this.data_wc.push(saturday);
      this.data_wc.push(sunday);
    },
    groupByDayAndSumTotalQuantity(
      collection_sales,
      collection_records,
      dayOfWeek
    ) {
      let sum_sale = 0;
      let sum_record = 0;
      const collect_all = [dayOfWeek, 0, 0];
      collection_sales.forEach((sale) => {
        sale.forEach((day) => {
          //esta agrupado por dia
          if (day.day_week == dayOfWeek) {
            sum_sale += parseFloat(day.price_actual) * day.quantity;
          }
        });
      });
      collection_records.forEach((record) => {
        record.forEach((day) => {
          //esta agrupado por dia
          if (day.day_week == dayOfWeek) {
            sum_record += parseFloat(day.price_actual) * day.quantity;
          }
        });
      });
      collect_all[1] = sum_sale;
      collect_all[2] = sum_record;
      return collect_all;
    },
    groupByMonthAndSumTotalQuantity(
      collection_sales,
      collection_records,
      month
    ) {
      let sum_sale = 0;
      let sum_record = 0;
      const collect_all = [month, 0, 0];

      collection_sales.forEach((sale) => {
        sale.forEach((e) => {
          //esta agrupado por mes
          if (e.month == month) {
            sum_sale += parseFloat(e.price_actual) * e.quantity;
          }
        });
      });
      collection_records.forEach((record) => {
        record.forEach((e) => {
          //esta agrupado por mes
          if (e.month == month) {
            sum_record += parseFloat(e.price_actual) * e.quantity;
          }
        });
      });

      collect_all[1] = sum_sale;
      collect_all[2] = sum_record;

      return collect_all;
    },

    mappingDayOfWeek(collection) {
      const self = this;
      collection.map(function (data) {
        data.day_week = self.getDayOfWeek(data.updated_at);
        return data;
      });

      const grouped_weeky = this.groupBy(collection, "day_week");
      return grouped_weeky;
    },
    mappingMonth(collection) {
      const self = this;
      collection.map(function (data) {
        data.month = self.getMonth(data.updated_at);
        return data;
      });

      const grouped_weeky = this.groupBy(collection, "month");
      return grouped_weeky;
    },
    groupByClients(names, totals) {
      const new_data = [];

      for (let i = 0; i < names.length; i++) {
        const index = new_data.findIndex(
          (element) => element.key === names[i].name
        );

        if (index > -1) {
          new_data[index].value += parseFloat(totals[i].total);
        } else {
          new_data.push({
            key: names[i].name,
            value: parseFloat(totals[i].total),
          });
        }
      }

      new_data.forEach((e) => {
        this.data_cc.push([e.key, e.value]);
      });
    },

    groupBy(collection, property) {
      var i = 0,
        val,
        index,
        values = [],
        result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1) result[index].push(collection[i]);
        else {
          values.push(val);
          result.push([collection[i]]);
        }
      }
      return result;
    },
    getDayOfWeek(date_string) {
      const d = new Date(date_string);
      let day = d.getDay();

      if (day == 0) {
        return "Domingo";
      }
      if (day == 1) {
        return "Lunes";
      }
      if (day == 2) {
        return "Martes";
      }
      if (day == 3) {
        return "Miércoles";
      }
      if (day == 4) {
        return "Jueves";
      }
      if (day == 5) {
        return "Viernes";
      }
      if (day == 6) {
        return "Sábado";
      }
    },
    getMonth(date_string) {
      const d = new Date(date_string);
      let month = d.getMonth();

      if (month == 0) {
        return "Enero";
      }
      if (month == 1) {
        return "Febrero";
      }
      if (month == 2) {
        return "Marzo";
      }
      if (month == 3) {
        return "Abril";
      }
      if (month == 4) {
        return "Mayo";
      }
      if (month == 5) {
        return "Junio";
      }
      if (month == 6) {
        return "Julio";
      }
      if (month == 7) {
        return "Agosto";
      }
      if (month == 8) {
        return "Septiembre";
      }
      if (month == 9) {
        return "Octubre";
      }
      if (month == 10) {
        return "Noviembre";
      }
      if (month == 11) {
        return "Diciembre";
      }
    },
  },
  computed: {
    getTotal() {
      return parseFloat(
        parseFloat(this.total_records_actual_year) +
          parseFloat(this.total_sales_actual_year)
      ).toFixed(2);
    },
    getTotalMonth() {
      return parseFloat(
        parseFloat(this.total_records_actual_month) +
          parseFloat(this.total_sales_actual_month)
      ).toFixed(2);
    },
  },
  components: { GChart, Loading },
};
</script>

<style lang="scss" scoped></style>
