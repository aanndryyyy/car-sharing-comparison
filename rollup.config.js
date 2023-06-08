import replace from '@rollup/plugin-replace';
import {svelteSVG} from "rollup-plugin-svelte-svg";

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        svelteSVG({
            svgo: {}
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            include: '**/node_modules/**',
        }),
    ]
};