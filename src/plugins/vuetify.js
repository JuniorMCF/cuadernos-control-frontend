import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        themes: {
          light: {
            primary: '#3F51B5',
            secondary: '#304FFE',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
