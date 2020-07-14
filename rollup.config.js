import babel from 'rollup-plugin-babel'

export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        format: 'umd',
        name: 'url',
        globals: { '@debdut/bent': '@debdut/bent' }
    },
    external: [ '@debdut/bent' ],
    plugins: [
        babel({ exclude: 'node_modules/**' })
    ]
}