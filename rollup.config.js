import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';

const packageJson = require("./package.json");

export default {
  input: "src/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
  plugins: [
    peerDepsExternal(),
    postcss({
      extract: false,
      use: [
        [
          'sass', {
          data: "$o-brand: 'internal';\n$system-code: 'gt';",
          includePaths: [
            "node_modules",
            "node_modules/@financial-times"
          ]
        }
        ]
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    del({ targets: ['build/*'] })
  ]
};
