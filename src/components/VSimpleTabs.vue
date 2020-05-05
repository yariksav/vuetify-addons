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
      :title="hideLabels && item.text"
    >
      <v-icon
        v-if="item.icon"
        :left="Boolean(item.text && !hideLabels)"
        style="max-width: 24px"
        :color="item.color"
      >
        {{ item.icon }}
      </v-icon>
      <span v-if="item.text && !hideLabels">
        {{ item.text }}
      </span>
    </v-tab>
    <v-tab-item
      v-for="(item, key) in tabs"
      :key="key"
    >
      <v-sheet>
        <slot :name="key" />
      </v-sheet>
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
  VSheet
} from 'vuetify/lib'

export default {
  components: {
    VTabs,
    VTabsSlider,
    VTab,
    VIcon,
    VTabsItems,
    VTabItem,
    VSheet
  },
  props: {
    items: {
      type: Object,
      required: true,
      default: () => ({})
    },
    value: String,
    hideLabels: Boolean
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
    },
    tabsKeys () {
      return Object.keys(this.tabs)
    }
  },
  watch: {
    tab (val) {
      const key = this.tabsKeys[val]
      this.$emit('input', key)
    },
    value: {
      immediate: true,
      handler (val) {
        this.tab = val ? this.tabsKeys.indexOf(val) : this.tabsKeys[0]
      }
    } 
  }
}
</script>
