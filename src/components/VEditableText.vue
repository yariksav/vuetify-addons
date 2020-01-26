<template>
  <component
    v-if="edit"
    :is="component"
    ref="editor"
    rows="1"
    auto-grow
    v-bind="$attrs"
    v-on="$listeners"
  />
  <span v-else>
    {{ $attrs.value }}
  </span>
</template>

<script>
import { VTextField, VTextarea } from 'vuetify/lib'

export default {
  components: {
    VTextField,
    VTextarea
  },
  props: {
    edit: Boolean,
    component: {
      type: String,
      default: 'v-textarea'
    }
  },
  methods: {
    focus () {
      this.edited && this.$refs.editor.focus()
    }
  }
}
</script>
