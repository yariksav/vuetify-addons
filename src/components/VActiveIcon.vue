<template>
  <v-icon 
    v-bind="$attrs"
    :color="colors[value]">
    {{ icons[value] }}
  </v-icon>
</template>

<script>

import { VIcon } from 'vuetify/lib'
export default {
  components: {
    VIcon 
  },
  props: {
    value: [Boolean, Number, String],
    icons: {
      type: Object,
      default: () => ({
        true: 'radio_button_checked',
        false: 'radio_button_unchecked'
      })
    },
    colors: {
      type: Object,
      default: () => ({
        true: 'success',
        false: 'secondary'
      })
    }
  }
}
</script>
