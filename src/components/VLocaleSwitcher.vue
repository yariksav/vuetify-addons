<template>
  <v-menu v-if="availableLocales" offset-y>
    <template #activator="{ on }">
      <div v-on="on" role="button">
        <span v-if="!icon">
          {{ currentLocaleName }}
        </span>
        <v-icon :right="!icon">language</v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in availableLocales"
        :key="index"
        @click="changeLocale(item.code)"
      >
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { VBtn, VMenu, VIcon, VList, VListItem, VListItemTitle } from 'vuetify/lib'

export default {
  components: {
    VBtn,
    VMenu,
    VIcon,
    VList,
    VListItem,
    VListItemTitle
  },
  props: {
    reload: Boolean,
    icon: Boolean
  },
  computed: {
    currentLocaleName () {
      if (!this.$i18n) {
        return null
      }
      if (this.icon) {
        return this.$i18n.locale
      }
      const locale = this.$i18n.locales.find(i => i.code === this.$i18n.locale)
      return locale ? locale.name : this.$i18n.locale
    },
    availableLocales () {
      if (!this.$i18n) {
        return null
      }
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    changeLocale (code) {
      this.$i18n && this.$i18n.setLocaleCookie(code)
      if (this.reload) {
        window.location.reload()
      } else {
        this.$router.push(this.switchLocalePath(code))
      }
    }
  }
}
</script>
