<template>
  <v-checkbox
    v-if="editable"
    class="mt-0"
    :input-value="value"
    dense
    hide-details
    :color="colors[value]"
    v-bind="$attrs"
    @change="$emit('input', $event)"
  />
  <v-icon
    v-else-if="icons[value]"
    :small="small"
    :color="colors[value]"
  >
    {{ icons[value] }}
  </v-icon>
</template>

<script>
import { VCheckbox, VIcon } from 'vuetify/lib'
export default {
  components: {
    VCheckbox, VIcon 
  },
  props: {
    editable: Boolean,
    small: Boolean,
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
        true: 'green',
        false: 'grey'
      })
    }
  }
}
</script>
