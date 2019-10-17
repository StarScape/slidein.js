import pkg from './package.json'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
  input: pkg.module,
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    uglify(),
  ],
  output: {
    file: pkg.main,
    format: 'cjs',
  },
}