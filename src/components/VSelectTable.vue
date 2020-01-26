<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="computedHeaders"
      :items="items"
      :item-key="itemValue"
      hide-default-footer
      show-select
      v-bind="$attrs"
    />
    <v-messages v-if="errorMessages" :value="[errorMessages]" color="error" />
  </div>
</template>

<script>
import { VDataTable, VMessages } from 'vuetify/lib'
export default {
  components: {
    VDataTable,
    VMessages
  },
  props: {
    headers: Array,
    label: String,
    items: Array,
    value: Array,
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    errorMessages: String
  },
  data () {
    return {
      selected: this.value ? this.value.map(val => this.items.find(item => item[this.itemValue] === val)) : []
    }
  },
  computed: {
    computedHeaders () {
      return this.headers || [{
        text: this.label,
        value: this.itemText
      }]
    }
  },
  watch: {
    selected (val) {
      this.$emit('input', val.map(item => item[this.itemValue]))
    }
  },
  created () {
    if (!this.selected && this.selectAll) {
      this.selected = this.items
    }
  }
}
</script>
