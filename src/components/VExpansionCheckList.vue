<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item ,index) in data" :key="index">
      <v-expansion-panel-header>
        <v-layout>
          {{ item.text }}
          <v-spacer/>
          {{ getSelectedOf(item.children).length }} / {{ item.children.length }}
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <span v-for="(child, key) in item.children" :key="key">
            <v-checkbox
              v-model="val"
              :value="child.value"
              :disabled="disabled"
              :label="child.texts ? child.texts.join(' - ') : child.text"
              hide-details
              class="mt-2"
            />
          </span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import itemable from '../mixins/itemable'

export default {
  name: 'VExpansionCheckList',
  mixins: [ itemable ],
  props: {
    value: Array,
    disabled: Boolean
  },
  data () {
    return {
      val: this.value || [],
      selected: {}
    }
  },
  watch: {
    val () {
      this.$emit('input', this.val)
    }
  },
  methods: {
    getOtherValues (item) {
      return {
        children: this.parseItems(item.children)
      }
    },
    getSelectedOf (items) {
      let values = items.map(item => item.value)
      let vals = this.val.filter(value => {
        return values.indexOf(value) >= 0
      })
      return vals
    },
    parseItems (items, res, parent) {
      res = res || []
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.parseItems(item.children, res, item)
        } else {
          item.value = this.getItemValue(item, this.itemValue)
          item.texts = [this.getItemValue(item, this.itemText)]
          if (parent) {
            item.texts.unshift(this.getItemValue(parent, this.itemText))
          }
          res.push(item)
        }
      })
      return res
    }
  }
}
</script>
