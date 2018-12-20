<template>
  <div>
    <v-label v-if="label"
      :focused="errorMessages"
      :color="errorMessages && 'error'"
    >
      {{ label }}
    </v-label>
    <v-list class="pa-0 v-checklist">
      <div v-for="(group, index) in groups" :key="index" class="ml-2">
        <div v-if="!!group" class="caption v-checkbox--group-caption">
          {{ group }}
          <v-divider/>
        </div>
        <div>
          <v-checkbox
            v-for="item in data"
            v-if="group === item.group || (!group && !item.group)"
            :key="item.value"
            v-model="checkValue"
            :label="item.text"
            :disabled="disabled"
            :value="item.value"
            hide-details
          />
        </div>
      </div>
    </v-list>
  <v-messages :value="errorMessages && [errorMessages]" color="error"/>
  </div>
</template>

<script>
import itemable from '../mixins/itemable'

export default {
  name: 'VCheckList',
  mixins: [ itemable ],
  props: {
    label: String,
    value: Array,
    itemGroup: [ String, Function ],
    disabled: Boolean,
    errorMessages: String
  },
  data () {
    return {
      checkValue: this.value || []
    }
  },
  computed: {
    groups () {
      const groups = new Set((this.data).map(d => d.group))
      if (!Object.keys(groups).length) {
        return { default: '' }
      }
      return groups
    },
  },
  watch: {
    checkValue () {
      this.$emit('input', this.checkValue)
    }
  },
  methods: {
    getOtherValues (item) {
      if (this.itemGroup) {
        return {
          group: this.getItemValue(item, this.itemGroup)
        }
      }
    }
  }
}
</script>
<style>
 .v-checkbox--group-caption {
    text-align: right;
    color: #9e9e9e;
  }
  .v-checklist .v-input.v-input--checkbox {
    margin-top: 0;
  }
</style>
