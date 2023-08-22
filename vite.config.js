import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/01-galeria/', // reemplaza 'nombre_del_repositorio' con el nombre de tu repositorio en GitHub
})