<template>
  <v-dialog
    opacity="0.3"
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
    persistent
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
        <form v-for="(element, index) in form" :key="index">
          <v-text-field
            class="py-2"
            v-if="element.type == 'input'"
            :prefix="element.prefix"
            :type="element.type_input"
            dense
            outlined
            v-model="element.model"
            :label="element.label"
            :hide-details="element.hint === '*obligatorio' ? false : true"
            :persistent-hint="element.hint === '*obligatorio' ? true : false"
            :hint="element.hint"
          />

          <v-select
            v-else-if="element.type == 'select'"
            :items="element.items"
            :item-text="element.text"
            :item-value="element.value"
            v-model="element.model"
            :label="element.label"
            dense
            outlined
          />
        </form>
      </v-card-text>
      <v-divider class="mt-2 ma-0"></v-divider>
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="body-2 font-weight-bold rounded-lg elevation-0 text-normal"
          large
          @click.prevent="sendForm"
          :loading="loading"
          >Enviar formulario</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CirculosForm",

  data() {
    return {
      title: "",
      images: null,
      dialog: false,
      resolve: null,
      reject: null,
      loading: false,
      options: {
        color: "primary",
        width: 600,
        zIndex: 200,
        noconfirm: false,
      },
      path: "",
      form: [],
      user_id: null,
    };
  },

  mounted() {},

  methods: {
    open(title, path, form, user_id, options) {
      this.dialog = true;
      this.title = title;
      this.path = path;
      this.form = form;
      this.user_id = user_id;
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
    sendForm() {
      this.loading = true;
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters["auth/getToken"],
        },
      };
      const data = new FormData();
      for (let i in this.form) {
        const { key, model } = this.form[i];
        data.append(key, model);
      }
      data.append("user_id", this.user_id);

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
  },
};
</script>

<style lang="scss">
.v-text-field__details {
  margin: 0 !important;
}
</style>
