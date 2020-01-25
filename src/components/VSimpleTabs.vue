<template>
  <v-tabs
    v-model="tab"
    v-bind="$attrs"
  >
    <v-tabs-slider />
    <v-tab
      v-for="(item, key) in tabs"
      :key="key"
      :href="item.href"
    >
      <v-icon v-if="item.icon">
        {{ item.icon }}
      </v-icon>
      <span v-if="item.text">
        {{ item.text }}
      </span>
    </v-tab>
    <v-tab-item
      v-for="(item, key) in tabs"
      :key="key"
    >
      <v-card
        flat
        tile
      >
        <slot :name="'item.' + key" />
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import {
  VTabs,
  VTabsSlider,
  VTab,
  VIcon,
  VTabsItems,
  VTabItem,
  VCard
} from 'vuetify/lib'

export default {
  components: {
    VTabs,
    VTabsSlider,
    VTab,
    VIcon,
    VTabsItems,
    VTabItem,
    VCard
  },
  props: {
    items: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    tabs () {
      const res = {}
      for (const key in this.items) {
        if (this.items[key].visible !== false) {
          res[key] = this.items[key]
        }
      }
      return res
    }
  },
  watch: {
    tab (val) {
      const key = Object.keys(this.tabs)[val]
      this.$emit('change', { key, ...this.items[key] })
    }
  }
}
</script>
