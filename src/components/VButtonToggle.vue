<template>
  <div>
    <p v-if="label">{{ label }}</p>
    <v-btn-toggle
      mandatory
      :value="selected"
      @change="onInput"
    >
      <v-btn v-for="(item, key) in data"
        :key="key"
        :color="item.color || getColor(item)"
        v-bind="item"
        :disabled="disabled"
      >
        <v-icon v-if="showIcon" :color="getIconColor(item)" class="pr-2">
          {{ getIcon(item) }}
        </v-icon>
        <span>{{ item.text }}</span>
      </v-btn>
    </v-btn-toggle>
    <!-- <p v-if="hint">{{ hint }}</p>
    <div class="v-text-field__details">
      <v-messages v-if="errorMessages" :value="[errorMessages]" color="error" />
    </div> -->
  </div>
</template>

<script>
import itemable from '../mixins/itemable'
import { VBtn, VBtnToggle, VIcon } from 'vuetify/lib'

export default {
  name: 'VButtonToggle',
  components: {
    VBtn,
    VBtnToggle,
    VIcon
  },
  mixins: [ itemable ],
  props: {
    color: String,
    label: String,
    // hint: String,
    // errorMessages: String,
    disabled: Boolean,
    showIcon: {
      type: Boolean,
      default: true
    },
    iconColor: {
      type: String,
      default: 'primary'
    },
    selectedIcon: {
      type: String,
      default: 'radio_button_checked'
    },
    unselectedIcon: {
      type: String,
      default: 'radio_button_unchecked'
    },
    value: String
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
    getSelected () {
      return this.selected && this.data.find(item => item.value === this.selected)
    }
  },
  methods: {
    getOtherValues (item) {
      return item
    },
    getIconColor (item) {
      return this.selected === item.value ? this.iconColor : ''
    },
    getColor (item) {
      return this.selected === item.value ? this.color : ''
    },
    getIcon (item) {
      return this.selected === item.value ? this.selectedIcon : this.unselectedIcon
    },
    onInput (value) {
      this.selected = value
      this.$emit('input', value)
    }
  }
}
</script>
