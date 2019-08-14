<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    @click="onClick"
  >
    <slot />
  </v-btn>
</template>

<script>
import { VBtn } from 'vuetify/lib'

export default {
  components: {
    VBtn
  },
  name: 'VBtnUpload',
  props: {
    multiple: Boolean,
    accept: {
      type: String,
      default: () => 'image/*'
    }
  },
  methods: {
    onClick () {
      const input = document.createElement('input')
      input.accept = this.accept
      if (this.multiple) {
        input.multiple = 'multiple'
      }
      input.setAttribute('type', 'file')
      input.addEventListener('change', this.onFilesSelected.bind(this))
      input.click()
    },
    onFilesSelected (files) {
      // console.log(files.target.files)
      this.file = files.target.files[0]
      if (this.file) {
        var reader = new FileReader()
        reader.onloadend = () => {
          const fileSrc = reader.result
          this.$emit('change', fileSrc)
        }
        reader.readAsDataURL(this.file)
      }
    }
  }
}
</script>
