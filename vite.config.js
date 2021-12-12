import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
    base: './',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    optimizeDeps: {
        include: ['schart.js']
    }
}