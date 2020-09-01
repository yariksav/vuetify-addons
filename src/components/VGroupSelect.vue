<template>
  <component
    :is="component"
    :items="computedData"
    :item-value="itemValue"
    :item-text="itemText"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </component>
</template>

<script>
import { VAutocomplete, VSelect } from 'vuetify/lib'

export default {
  props: {
    items: Array,
    groupsText: Object,
    searchable: Boolean,
    autoselect: Boolean,
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    itemGroup: {
      type: String,
      default: 'group'
    }
  },
  computed: {
    component () {
      return this.searchable ? VAutocomplete : VSelect
    },
    computedData () {
      if (!this.items) {
        return []
      }
      const res = {}
      this.items.forEach((i) => {
        if (!res[i[this.itemGroup]]) {
          res[i[this.itemGroup]] = []
        }
        res[i[this.itemGroup]].push(i)
      })
      return Object.keys(res).reduce((acc, key) => {
        const header = (this.groupsText && this.groupsText[key]) || key
        acc.length && acc.push({ divider: true })
        return [...acc, { header }, ...res[key]]
      }, [])
    }
  },
  watch: {
    items: {
      immediate: true,
      handler (val) {
        if (this.autoselect && val && val.length === 1) {
          this.$emit('input', val[0][this.itemValue])
        }
      }
    }
  }
}
</script>
