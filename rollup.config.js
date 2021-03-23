import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';


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
  external: [
    Object.keys(packageJson.peerDependencies || {}),
    /@babel\/runtime/
  ],
  plugins: [
    // copy({
    //   targets: [
    //     {
    //       src: 'src/assets/images/**/*',
    //       dest: 'build/images/',
    //       verbose: true
    //     }
    //   ]
    // }),
    image(),
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
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    del({ targets: ['build/*'] })
  ]
};
