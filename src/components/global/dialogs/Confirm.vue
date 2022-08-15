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
          @click="dialog = cancel()"
        >
          <v-icon class="rounded-circle"> mdi-close </v-icon>
        </v-btn>
      </v-card-text>
    <v-divider class="mb-2 ma-0"></v-divider>
      <v-card-text class="pa-4 px-10">
        <p>
          {{ message }}
        </p>
      </v-card-text>
      <v-divider class="mb-2 ma-0"></v-divider>

      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="body-2 font-weight-bold rounded-lg elevation-0 text-normal"
          large
          @click.prevent="agree()"
          >Ok</v-btn
        >
        <v-btn
          color="red"
          class="body-2 font-weight-bold rounded-lg elevation-0 text-normal white--text"
          large
          @click.prevent="cancel()"
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CirculosConfirm",

  data() {
    return {
      title: "",
      message: "",
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
    };
  },

  mounted() {},

  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
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
  },
};
</script>

<style lang="scss" scoped></style>
