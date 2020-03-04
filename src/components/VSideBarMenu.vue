<template>
  <v-navigation-drawer
    v-model="drawer"
    class="VSideBarMenu"
    app
    clipped
    :permanent="mini"
    :mini-variant="mini"
    v-bind="$attrs"
  >
    <slot slot="prepend" name="prepend" />
    <slot name="append" slot="append" >
      <!-- <v-list dense> -->
        <VNavListItem
          :icon="mini && icons.expand"
          :icon-right="!mini && icons.collapse"
          :text="labels && labels.collapse"
          @click="toggleMini"
        />
      <!-- </v-list> -->
    </slot>

    <v-list class="VSideBarMenu_Body v-list-group">
      <v-list-item-group>
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
              :button="Boolean(item.href)"
              @click="onItemClick(item)"
            />
          </template>
        </v-window-item>

        <v-window-item :value="2">
          <VNavListItem
            class="VSideBarMenu_AminateIconLeft"
            :icon="icons.back"
            :text="labels && labels.back"
            @click="step--"
          />

          <div v-if="selectedItem.text"
            class="caption VSideBarMenu_Description">
            {{ selectedItem.text }}
          </div>

          <template v-for="(subItem, i) in selectedItem.children">
            <VNavListItem
              v-if="getParam(subItem.visible, null, true)"
              :key="i"
              :icon="subItem.icon"
              :text="subItem.text"
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
                v-if="getParam(subItem.visible, null, true)"
                :key="i"
                :icon="subItem.icon"
                :text="subItem.text"
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
    backText: String,
    miniVariant: Boolean
  },
  data () {
    return {
      selectedItem: {},
      step: 1,
      drawer: this.value,
      mini: null
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
        this.mini = true
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
      // max-width: 24px!important;
      &.icon-right {
          opacity: 0.8;
      }
    }
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
