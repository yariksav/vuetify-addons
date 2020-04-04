<template>
  <v-btn-toggle
    class="VTabsToggle"
    :value="value"
    dense
    group
    mandatory
    @change="$emit('input', $event)"
  >
    <v-btn
      v-for="(item, key) in items"
      :key="key"
      text
      dense
      link
      :disabled="item.disabled"
      :color="item.color"
      class="ma-0 VTabsToggle_item"
      active-class="active"
      :value="item.value || key"
    >
      <v-icon v-if="item.icon" left>
        {{ item.icon }}
      </v-icon>
      {{ item.text }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import {
    VBtnToggle,
    VBtn,
    VIcon
} from 'vuetify/lib'

export default {
  components: {
    VBtnToggle,
    VBtn,
    VIcon
  },
  props: {
    value: [String, Number],
    items: {
      type: Object,
      required: true,
      default: () => ({})
    },
  }
}
</script>
<style>
  .VTabsToggle .VTabsToggle_item.active {
    border-bottom: 2px solid var(--v-primary-base);
  }
</style>