<template>
  <v-navigation-drawer
    v-model="drawer"
    class="VSideBarMenu"
    app
    clipped
    :permanent.sync="mini"
    :mini-variant="mini"
    v-bind="$attrs"
  >
    <slot slot="prepend" name="prepend" />
    <slot name="append" slot="append" >
      <VNavListItem
        :icon="mini && icons.expand"
        :icon-right="!mini && icons.collapse"
        :text="labels && labels.collapse"
        @click="toggleMini"
      />
    </slot>
    <v-list class="VSideBarMenu_Body v-list-group">
      <v-list-item-group v-model="activeItem" mandatory>
      <v-window v-if="!mini" v-model="step">
        <v-window-item :value="1">
          <template v-for="(item, i) in items">
            <v-divider v-if="item.divider" :key="'divider-' + i"/>
            <VNavListItem
              v-else-if="getParam(item.visible, null, true)"
              :key="i"
              class="VSideBarMenu_AminateIconRight"
              :icon="item.icon"
              :icon-right="item.children && item.children.length && icons.next"
              :text="item.text"
              :children="item.children"
              :active="isActive(item)"
              :href="prepareLinkHref(item.href)"
              :button="Boolean(item.href)"
              @click="onItemClick(item)"
            />
          </template>
        </v-window-item>

        <v-window-item :value="2">
          <VNavListItem
            class="VSideBarMenu_AminateIconLeft"
            :icon="icons.back"
            :text="selectedItem.text"
            @click="step--"
          />
          <v-divider />
          <template v-for="(subItem, i) in selectedItem.children">
            <VNavListItem
              v-if="getParam(subItem.visible, null, true) && (subItem.text || subItem.icon)"
              :key="i"
              :icon="subItem.icon"
              :text="subItem.text"
              :href="prepareLinkHref(subItem.href)"
              :active="isActive(subItem)"
              @click="onItemClick(subItem)"
            />
          </template>
        </v-window-item>
      </v-window>

      <template v-else v-for="(item, i) in items">
        <v-divider v-if="item.divider" :key="'divider-' + i"/>
        <v-menu
          v-else-if="getParam(item.visible, null, true)"
          :key="i"
          open-on-hover
          close-on-click
          :close-delay="50"
          close-on-content-click
          offset-x
          :disabled="!item.children || !item.children.length"
        >
          <template v-slot:activator="{ on }">
            <VNavListItem
              :icon="item.icon"
              :active="isActive(item)"
              :href="prepareLinkHref(item.href)"
              @click="onItemClick(item)"
              v-on="on"
            />
          </template>
          <v-list>
            <div v-if="item.text" class="caption VSideBarMenu_Description">
              {{ item.text }}
            </div>
            <template v-for="(subItem, i) in item.children">
              <VNavListItem
                v-if="getParam(subItem.visible, null, true) && (subItem.text || subItem.icon)"
                :key="i"
                :icon="subItem.icon"
                :text="subItem.text"
                :active="isActive(subItem)"
                :href="prepareLinkHref(subItem.href)"
                @click="onItemClick(subItem)"
              />
            </template>
          </v-list>
        </v-menu>
      </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  VDivider,
  VWindow,
  VWindowItem,
  VIcon,
  VList,
  VMenu,
  VListItem,
  VListItemIcon,
  VListItemTitle,
  VListItemAction,
  VListItemGroup,
  VNavigationDrawer
} from 'vuetify/lib'
import VNavListItem from './VNavListItem.vue'

export default {
  components: {
    VDivider,
    VWindow,
    VWindowItem,
    VIcon,
    VList,
    VMenu,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemAction,
    VListItemGroup,
    VNavigationDrawer,
    VNavListItem
  },
  props: {
    items: Array,
    routeParams: Array,
    value: {
      type: Boolean,
      default: null
    },
    labels: {
      type: Object,
      default: () => ({
        back: 'Main menu',
        collapse: 'Collapse panel'
      })
    },
    icons: {
      type: Object,
      default: () => ({
        collapse: 'first_page',
        expand: 'last_page',
        back: 'chevron_left',
        next: 'chevron_right'
      })
    },
    useState: Boolean,
    miniVariant: Boolean,
    prepareHref: Function
  },
  data () {
    return {
      temporary: null,
      selectedItem: {},
      step: 1,
      drawer: this.value,
      mini: null,
      activeItem: null
    }
  },
  watch: {
    value (val) {
      this.drawer = val
    },
    drawer (val) {
      this.$emit('input', val)
    },
    miniVariant: {
      immediate: true,
      handler (val) {
        this.mini = val
      }
    }
  },
  created () {
    document.addEventListener('navigation-drawer', this.onNavigationDrawerChange)
    this.findActiveItem(this.items)
  },
  destroyed () {
    document.removeEventListener('navigation-drawer', this.onNavigationDrawerChange)
  },
  methods: {
    prepareLinkHref (href) {
      return this.prepareHref && href ? this.prepareHref(href) : (href || undefined)
    },
    isActive(item) {
      if (item.children) {
        return !!item.children.find(i => this.isActiveRoute(i.href))
      }
    },
    isActiveRoute (href) {
      return href && this.$route.path.includes(href)
    },
    findActiveItem (items, parent) {
      return items.find((item) => {
        if (item.href && this.$route.path.endsWith(item.href)) {
          this.selectedItem = parent || item
          this.activeItem = this.items.indexOf(this.selectedItem)
          this.step = parent ? 2 : 1
          return this.selectedItem
        }
        if (item.children) {
          return this.findActiveItem(item.children, item)
        }
      })
    },
    onItemClick (item) {
      if (item.children) {
        this.step++
        this.selectedItem = item
      }
      //  else {
      //   this.$emit('select', item)
      //   if (item.href) {
      //     this.$router.push(this.prepareHref ? this.prepareHref(item.href) : item.href)
      //   }
      // }
    },
    onNavigationDrawerChange () {
      if (this.mini) {
        this.toggleMini()
      } else {
        this.drawer = !this.drawer
      }
    },
    getParam (param, item, def) {
      if (param === undefined) {
        return def
      }
      if (typeof param === 'function') {
        return param(item)
      }
      return param
    },
    toggleMini () {
      this.mini = !this.mini
      this.$emit('update:miniVariant', this.mini)
      if (!this.mini) {
        this.$nextTick(() => this.drawer = true)
      }
    }
  }
}
</script>

<style lang="scss">
  .VSideBarMenu {
    .v-icon {
      &.icon-right {
          opacity: 0.8;
      }
    }
    // .v-list-item--active {
    //   var(--v-warning-base);
    // }
    &_Body {
      flex: 1;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background-color: darkgrey;
      }
    }
    &_Description {
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      margin-bottom: -4px;
      opacity: 0.8;
    }
    &_AminateIconLeft:hover {
      .v-icon.icon-left {
        transform: translateX(-5px);
        transition: transform .5s,-webkit-transform .5s;
      }
    }
    &_AminateIconRight:hover {
      .v-icon.icon-right {
        transform: translateX(5px);
        transition: transform .5s,-webkit-transform .5s;
      }
    }
  }
</style>
