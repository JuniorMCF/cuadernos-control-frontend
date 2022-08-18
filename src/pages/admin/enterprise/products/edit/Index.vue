<template>
  <div>
    <v-container fluid class="pa-4 pa-md-12 ">
      <v-row>
        <v-col class="pa-0">
          <v-btn
            class="primary--text font-weight-bold text-normal"
            text
            @click.prevent="back()"
          >
            <v-icon dark> mdi-arrow-left </v-icon>

            Volver a productos</v-btn
          ></v-col
        ></v-row
      >
      <v-row>
        <v-col>
          <p class="font-weight-bold text-h5 my-0">Editar producto</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Nombre del producto"
            :value="product.name == null ? '' : product.name"
            v-model="product.name"
            hide-details
          />
        </v-col>
        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Descripción"
            :value="product.description == null ? '' : product.description"
            v-model="product.description"
            hide-details
          />
        </v-col>

        <v-col class="col-12 col-md-6 col-lg-4">
          <v-text-field
            dense
            outlined
            label="Precio"
            :value="product.price  == null ? 0 : product.price"
            v-model="product.price"
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
import Vue from "vue"

export default {
  name: "CirculosProductsEditIndex",
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
      product: {},
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
        .post("product/show", data, this.config)
        .then((res) => {
          if (res.data.success == true) {
            this.product = res.data.data;
         
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
        
        data.append("id", this.product.id)
        data.append("name", this.product.name == null ? '' :this.product.name )
        data.append("description", this.product.description == null ? '' :this.product.description)
        data.append("price", this.product.price == null ? 0 :this.product.price)

        this.$axios.post("product/edit",data,this.config).then((res)=>{
                
            if (res.data.success === true) {
                Vue.$toast.success("Producto actualizado")
                 this.getData()
            }else{
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
        }).catch((err)=>{
            this.$refs.loading.hide();
            console.log(err)
        })

    },
    back() {
      this.$router.push({
        name: "products",
      });
    },
  },
  components: { Loading },
};
</script>

<style lang="scss" scoped></style>
