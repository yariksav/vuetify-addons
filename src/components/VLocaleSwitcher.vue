<template>
  <v-menu v-if="availableLocales" offset-y>
    <template #activator="{ on }">
      <v-btn class="mr-1" text fab small v-on="on">
        {{ $i18n.locale }}
      </v-btn>
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
import { VBtn, VMenu, VList, VListItem, VListItemTitle } from 'vuetify/lib'

export default {
  components: {
    VBtn,
    VMenu,
    VList,
    VListItem,
    VListItemTitle
  },
  props: {
    reload: Boolean
  },
  computed: {
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
