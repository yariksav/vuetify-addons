<template>
  <v-combobox
    v-model="selected"
    :items="items"
    chips
    v-bind="$attrs"
    :return-object="false"
    :item-text="itemText"
    :item-value="itemValue"
    multiple
  >
    <template v-slot:selection="{ item, selected: selectedItem }">
      <v-chip
        :input-value="selectedItem"
        close
        class="chip--select-multi"
        @click:close="remove(item)"
      >
        <slot name="item" :item="computedItems[item]">
          {{ computedItems[item].name }}
        </slot>
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <slot name="item" :item="item">
        {{ item.name }}
      </slot>
    </template>
  </v-combobox>
</template>

<script>

import {
  VCombobox,
  VChip
} from 'vuetify/lib'

export default {
  components: {
    VCombobox,
    VChip
  },
  props: {
    items: Array,
    value: Array,
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'texvaluet'
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
    computedItems () {
      return (this.items || []).reduce((acc, item) => {
        acc[item[this.itemValue]] = item
        return acc
      }, {})
    },
    computedResult () {
      return this.selected
    }
  },
  watch: {
    selected (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    remove (item) {
      this.selected.splice(this.selected.indexOf(item), 1)
    }
  }
}
</script>
