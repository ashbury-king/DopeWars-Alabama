import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.deepPurple,
            },
        },
    },
})
