<template>
  <VTextField
    ref="input"
    :type="passwordVisibility ? 'text' : 'password'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="append">
      <v-icon
        role="button"
        @mousedown.native="passwordVisibility = true"
        @mouseup.native="passwordVisibility = false"
      >
        {{ passwordVisibility ? 'visibility' : 'visibility_off' }}
      </v-icon>
    </template>
    <span slot="progress"><slot name="progress" /></span>
  </VTextField>
</template>

<script>
import { VIcon, VTextField } from 'vuetify/lib'

export default {
  components: {
    VIcon,
    VTextField
  },
  name: 'VPasswordField',
  props: {
    value: String,
    switchVisibility: Boolean
  },
  data () {
    return {
      passwordVisibility: false
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>
