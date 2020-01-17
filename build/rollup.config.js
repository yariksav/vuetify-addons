// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify-es';
import css from 'rollup-plugin-css-porter';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
  input: 'src/entry.js',
  output: {
    name: 'VuetifyAddons',
    exports: 'named',
    globals: {
      'vuetify': 'Vuetify',
      'vuetify/lib': 'Vuetify'
    }
  },
  plugins: [
    vue({
      css: false,
      compileTemplate: true,
    }),
    css({ dest: 'dist/vuetify-addons.css' }),
    buble({
      objectAssign: 'Object.assign'
    }),
  ],
  external: ['vuetify', 'vuetify/lib']
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(uglify());
}

export default config;
