/// <reference types="vitest" />
import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
<<<<<<< HEAD
import { defineConfig } from "vitest/config" 
import tsconfigPaths from "vite-tsconfig-paths"
=======
import { defineConfig } from "vitest/config"
>>>>>>> fab26362ad277bc67b7d2360c0916c02b2109a69

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
<<<<<<< HEAD
    setupFiles: './src/setupTests.ts',
  },
});
=======
    setupFiles: './src/shared/lib/tests/setup.ts',
  },
})
>>>>>>> fab26362ad277bc67b7d2360c0916c02b2109a69
