<template>
  <v-list-item
    v-bind="$attrs"
    v-on="$listeners"
    class="VNavLsitItem"
    :link="!!href"
    :to="href"
    :class="active ? 'v-list-item--active' : ''"
  >
    <v-list-item-icon v-if="icon" link class="mr-4">
      <v-icon class="icon-left" v-text="icon" />
    </v-list-item-icon>
    <v-list-item-title>
      {{ text }}
    </v-list-item-title>
    <v-list-item-action v-if="iconRight">
      <v-icon class="icon-right" v-text="iconRight" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {
  VIcon,
  VListItem,
  VListItemIcon,
  VListItemTitle,
  VListItemAction
} from 'vuetify/lib'

export default {
  name: 'VNavListItem',
  components: {
    VIcon,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemAction
  },
  props: {
    icon: [Boolean, String],
    href: String,
    iconRight: [Boolean, String],
    text: String,
    active: Boolean
  },
  data () {
    return {
      value: null
    }
  }
}
</script>

<style scoped>
  .VNavLsitItem .v-icon {
    max-width: 24px;
  }
</style>
