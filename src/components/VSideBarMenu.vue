<template>
  <div class="SideBarMenu">
    <v-navigation-drawer
      v-model="drawer"
      class="SideBarMenu_Drawer"
      app
      clipped
      v-bind="$attrs"
    >
      <slot slot="prepend" name="prepend" />
      <slot slot="append" name="append" />
      <v-list class="SideBarMenu_Body">
        <v-list-item-group>
          <v-window v-model="step">
            <v-window-item :value="1">
              <template v-for="(item, i) in items">
                <v-divider v-if="item.divider" :key="i"/>
                <v-list-item v-else-if="getParam(item.visible, null, true)" :key="i" class="SideBarMenu_MenuItem" @click="onItemClick(item)">
                  <v-icon v-if="item.icon" small left class="mr-2">
                    {{ item.icon }}
                  </v-icon>
                  <div v-if="item.href" role="button">
                    {{ item.text }}
                  </div>
                  <template v-else>
                    {{ item.text }}
                  </template>
                  <v-icon v-if="item.children && item.children.length" right class="icon-right">
                    chevron_right
                  </v-icon>
                </v-list-item>
              </template>
            </v-window-item>
            <v-window-item :value="2">
              <v-list>
                <v-list-item class="SideBarMenu_MenuItem" @click="step--">
                  <v-icon left class="icon-left">
                    chevron_left
                  </v-icon>
                  {{ backText || 'Main menu' }}
                </v-list-item>
                <v-list-item disabled dense class="caption">
                  {{ selectedItem.text }}
                </v-list-item>
                <v-list-item v-for="(subItem, i) in selectedItem.children" :key="i" @click="onItemClick(subItem)">
                  <v-icon v-if="subItem.icon" left>
                    {{ subItem.icon }}
                  </v-icon>
                  <div role="button">
                    {{ subItem.text }}
                  </div>
                </v-list-item>
              </v-list>
            </v-window-item>
          </v-window>
        </v-list-item-group>
      </v-list>
      <div v-if="$slots.footer" class="SideBarMenu_Footer">
        <slot name="footer" />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {
  VDivider,
  VWindow,
  VWindowItem,
  VIcon,
  VList,
  VListItem,
  VListItemGroup,
  VNavigationDrawer
} from 'vuetify/lib'

export default {
  components: {
    VDivider,
    VWindow,
    VWindowItem,
    VIcon,
    VList,
    VListItem,
    VListItemGroup,
    VNavigationDrawer
  },
  props: {
    items: Array,
    value: {
      type: Boolean,
      default: null
    },
    useState: Boolean,
    backText: String
  },
  data () {
    return {
      selectedItem: {},
      step: 1,
      drawer: this.value
    }
  },
  watch: {
    value (val) {
      this.drawer = val
    },
    drawer (val) {
      this.$emit('input', val)
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
    findActiveItem (items, parent) {
      return items.find((item) => {
        if (item.href && this.$route.path.endsWith(item.href)) {
          this.selectedItem = parent || item
          this.step = parent ? 2 : 1
          return true
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
      } else {
        this.$emit('select', item)
        if (typeof item.handler === 'function') {
          item.handler()
        }
        if (item.href) {
          item.href && this.$router.push(item.href)
        }
      }
    },
    onNavigationDrawerChange () {
      this.drawer = !this.drawer
    },
    getParam (param, item, def) {
      if (param === undefined) {
        return def
      }
      if (typeof param === 'function') {
        return param(item)
      }
      return param
    }
  }
}
</script>

<style lang="scss">
  .SideBarMenu {
    &_Drawer {
      .v-navigation-drawer__content {
        display: flex;
        flex-direction: column;
      }
    }
    &_Body {
      flex: 1;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: darkgrey;
      }
    }
    &_MenuItem {
       .v-icon.icon-right {
         opacity: 0;
       }
      &:hover {
        .v-icon.icon-left {
          transform: translateX(-5px);
          transition: transform .5s,-webkit-transform .5s;
        }
        .v-icon.icon-right {
          opacity: 1;
          animation: opacity1 1s;
          transform: translateX(5px);
          transition: transform .5s,-webkit-transform .5s;
        }
      }
    }
    // &_Header {
    //   padding: 12px 16px;
    //   color: rgb(230, 223, 223);
    //   flex-shrink: 0;
    // }
    // &_Footer {
    //   padding: 12px 16px;
    //   color: rgb(230, 223, 223);
    //   flex-shrink: 0;
    // }
  }
</style>
