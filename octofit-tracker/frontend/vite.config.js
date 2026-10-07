import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const codespaceName = env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME || '';

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
    },
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
  };
})
