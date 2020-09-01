<template>
  <div>
    <v-text-field
      v-if="!editable"
      readonly
      v-bind="$attrs"
      append-icon="edit"
      :value="valText"
      :error-messages="errorMessages"
      @click:append="onEditClick"
    />
    <v-autocomplete
      v-else
      ref="autocomplte"
      v-model="val"
      :items="items"
      :loading="loading"
      :search-input.sync="search"
      hide-selected
      :item-text="itemText"
      :item-value="itemValue"
      :placeholder="placeholder"
      :error-messages="errors"
      v-bind="$attrs"
    >
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
      <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <div v-if="valueText" slot="append-outer" class="d-flex">
        <v-icon @click="onCancelClick">
          close
        </v-icon>
      </div>
    </v-autocomplete>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import {
  VAutocomplete,
  VTextField,
  VIcon
} from 'vuetify/lib'

export default {
  components: {
    VAutocomplete,
    VTextField,
    VIcon 
  },
  props: {
    connector: Object,
    value: [String, Number],
    valueText: String,
    route: String,
    placeholder: {
      type: String,
      default: 'Start typing to Search'
    },
    errorMessages: [String, Array],
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    onLoad: Function,
    onError: Function
  },
  data () {
    return {
      editable: !this.value && !this.valueText,
      items: [],
      oldVal: this.value,
      val: this.value,
      valText: this.valueText,
      loading: false,
      search: null,
      error: null
    }
  },
  computed: {
    errors () {
      return this.errorMessages || this.error
    }
  },
  watch: {
    search: 'debouncedLoadData',
    valueText (val) {
      this.valText = val
      this.editable = false
    },
    val (val) {
      if (val) {
        this.editable = false
        const item = this.items.find(i => i[this.itemValue] === val)
        if (item) {
          this.valText = item[this.itemText]
          this.$emit('input', val)
        }
      }
    }
  },
  methods: {
    onEditClick () {
      this.val = null
      this.editable = true
      setTimeout(() => {
        this.$refs.autocomplte.focus()
      }, 10)
    },
    onCancelClick () {
      this.val = this.oldVal
      this.editable = false
    },
    debouncedLoadData: debounce(function () {
      return this.load()
    }, 500),
    load () {
      if (!this.onLoad) {
        console.error('Function onLoad was not provided')
        return
      }
      this.error = null
      if (this.loading) {
        return
      }
      if (!this.search) {
        this.items = []
        return
      }
      this.loading = true
      this.onLoad({ connector: this.connector, search: this.search }).then(res => {
        this.items = res || []
      }).catch(e => {
        this.error = e.message
        this.onError ? this.onError(e) : console.error(e)
      })
      this.loading = false
    }
  }
}
</script>
