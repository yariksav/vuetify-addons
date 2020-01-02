<template>
  <v-radio-group v-model="selected" v-bind="$attrs">
    <template v-for="item in data">
      <v-radio
        :key="item.value"
        :label="item.text"
        :value="item.value"
        :disabled="item.disabled"
      />
      <p v-if="item.description"
        :style="item.value !== value && 'cursor: pointer; opacity: 0.6;'"
        :key="'description_' + item.value"
        @click="selected = item.value"
      >
        {{ item.description }}
      </p>
    </template>
  </v-radio-group>
</template>

<script>
import itemable from '../mixins/itemable'
import { VRadio, VRadioGroup } from 'vuetify/lib'

export default {
  name: 'VRadioList',
  mixins: [itemable],
  components: {
    VRadio,
    VRadioGroup
  },
  props: {
    value: [String, Number],
    itemDescription: {
      type: String
    },
  },
  data () {
    return {
      selected: this.value
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler () {
        this.$emit('input', this.selected)
      }
    }
  },
  computed: {
  },
  methods: {
    getOtherValues (item) {
      if (this.itemDescription) {
        return {
          ...item,
          description: this.getItemValue(item, this.itemDescription)
        }
      }
    }
  }
}
</script>
