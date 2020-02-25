<template>
  <v-img
    :src="currentSrc"
    :lazy-src="lazySrc"
    v-bind="$attrs"
    class="VImage"
    :class="{_shadeBackground: !transparent ,_dark: $vuetify.theme.dark}"
    v-on="$listeners"
    @error="onError"
  >
    <slot />
    <svg v-if="!currentSrc" viewBox="0 0 40 40">
      <foreignObject width="60%" height="60%" x="8" y="8">
        <v-icon color="grey">
          {{ noPictureIcon || 'add_a_photo' }}
        </v-icon>
      </foreignObject>
    </svg>
  </v-img>
</template>

<script>

import { VImg, VIcon } from 'vuetify/lib'

export default {
  components: {
    VImg,
    VIcon
  },
  props: {
    src: [String, Object],
    value: String,
    lazySrc: String,
    path: String,
    noImage: String,
    noPictureIcon: String,
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentSrc: null
    }
  },
  watch: {
    src: {
      immediate: true,
      handler (val) {
        this.currentSrc = val || this.value || ''
      }
    }
  },
  methods: {
    onError () {
      this.currentSrc = ''
    }
  }
}
</script>

<style lang="scss">
  .VImage {
    &._shadeBackground {
      background-color: rgba(0, 0, 0, 0.07);
      &._dark {
        background-color: rgba(255, 255, 255, 0.07);
      }
    }
  }
</style>
