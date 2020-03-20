<template>
  <v-chip
    v-bind="$attrs"
    :color="color"
    :text-color="computeTextColor"
    v-on="$listeners"
  >
    <slot/>
  </v-chip>
</template>

<script>
import {
  VChip
} from 'vuetify/lib'

export default {
  components: {
    VChip
  },
  props: {
    color: String,
    threshold: {
      type: Number,
      default: 128
    }
  },
  computed: {
    computeTextColor () {
      if (!this.color) {
        return
      }
      const c = this.color.substring(1) // strip #
      const rgb = parseInt(c, 16) // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xFF // extract red
      const g = (rgb >> 8) & 0xFF // extract green
      const b = (rgb >> 0) & 0xFF // extract blue

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
      return luma < this.threshold ? '#FFF' : '#000'
    }
  }
}
</script>