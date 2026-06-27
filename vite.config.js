import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { writeFileSync } from 'fs'

function versionJsonPlugin(version) {
  return {
    name: 'version-json',
    buildStart() {
      writeFileSync('public/version.json', JSON.stringify({ version }))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const version = env.VITE_APP_VERSION || '1.0.0'

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      versionJsonPlugin(version),
    ],
  }
})
