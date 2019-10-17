import pkg from './package.json'
import { uglify } from 'rollup-plugin-uglify'
import css from 'rollup-plugin-css-porter'
import babel from 'rollup-plugin-babel'

export default {
  input: pkg.module,
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    uglify(),
    css({
      raw: false,
      minified: 'dist/slidein.css',
    }),
  ],
  output: {
    file: pkg.main,
    format: 'cjs',
  },
}