export default {
  props: {
    items: {
      type: [ Array ],
      default: () => []
      // required: true
    },
    itemText: {
      type: [ String, Function ],
      default: 'text'
    },
    itemValue: {
      type: [ String, Function ],
      default: 'value'
    }
  },
  computed: {
    data () {
      return (this.items || []).map((item) => {
        return {
          ...this.getOtherValues(item),
          text: this.getItemValue(item, this.itemText),
          value: this.getItemValue(item, this.itemValue)
        }
      })
    }
  },
  methods: {
    getOtherValues (item) {
      return {}
    },
    getItemValue (item, key) {
      if (!item || !key) {
        return undefined
      }
      if (typeof key === 'function') {
        return key(item)
      } else if (typeof key === 'string') {
        return item[key]
      }
    }
  }
}
