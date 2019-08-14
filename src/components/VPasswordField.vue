<template>
  <VTextField
    ref="input"
    v-bind="$attrs"
    :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
    :type="passwordVisibility ? 'text' : 'password'"
    v-on="$listeners"
    @click:append="() => (passwordVisibility = !passwordVisibility)"
  >
    <span slot="progress"><slot name="progress" /></span>
  </VTextField>
</template>

<script>
import { VTextField } from 'vuetify/lib'

export default {
  components: {
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
