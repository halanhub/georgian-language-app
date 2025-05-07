// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { nodeResolve } from "file:///home/project/node_modules/@rollup/plugin-node-resolve/dist/es/index.js";
import commonjs from "file:///home/project/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import { nodePolyfills } from "file:///home/project/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
      // Polyfills to include
      include: ["buffer", "process", "util", "global"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    mainFields: ["browser", "module", "jsnext:main", "main"]
    // Prioritize browser field
  },
  define: {
    // Define global for browser environment
    global: "globalThis"
  },
  optimizeDeps: {
    include: [
      "@supabase/postgrest-js",
      "react-router",
      "react-router-dom"
    ],
    exclude: ["lucide-react"]
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      plugins: [
        nodeResolve({
          preferBuiltins: false,
          browser: true,
          mainFields: ["browser", "module", "jsnext:main", "main"],
          // Prioritize browser field
          extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
          // Add all relevant extensions
        }),
        commonjs({
          requireReturnsDefault: true,
          // Force CommonJS modules to have a default export
          transformMixedEsModules: true,
          ignore: ["bufferutil", "utf-8-validate"]
        })
      ],
      external: []
    }
  },
  server: {
    host: true,
    port: 5173
  },
  base: "./"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IG5vZGVSZXNvbHZlIH0gZnJvbSAnQHJvbGx1cC9wbHVnaW4tbm9kZS1yZXNvbHZlJztcbmltcG9ydCBjb21tb25qcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1jb21tb25qcyc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBub2RlUG9seWZpbGxzKHtcbiAgICAgIC8vIFdoZXRoZXIgdG8gcG9seWZpbGwgYG5vZGU6YCBwcm90b2NvbCBpbXBvcnRzLlxuICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxuICAgICAgLy8gUG9seWZpbGxzIHRvIGluY2x1ZGVcbiAgICAgIGluY2x1ZGU6IFsnYnVmZmVyJywgJ3Byb2Nlc3MnLCAndXRpbCcsICdnbG9iYWwnXVxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICAgIG1haW5GaWVsZHM6IFsnYnJvd3NlcicsICdtb2R1bGUnLCAnanNuZXh0Om1haW4nLCAnbWFpbiddLCAvLyBQcmlvcml0aXplIGJyb3dzZXIgZmllbGRcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgLy8gRGVmaW5lIGdsb2JhbCBmb3IgYnJvd3NlciBlbnZpcm9ubWVudFxuICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAnQHN1cGFiYXNlL3Bvc3RncmVzdC1qcycsXG4gICAgICAncmVhY3Qtcm91dGVyJyxcbiAgICAgICdyZWFjdC1yb3V0ZXItZG9tJ1xuICAgIF0sXG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXVxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBtaW5pZnk6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBub2RlUmVzb2x2ZSh7XG4gICAgICAgICAgcHJlZmVyQnVpbHRpbnM6IGZhbHNlLFxuICAgICAgICAgIGJyb3dzZXI6IHRydWUsXG4gICAgICAgICAgbWFpbkZpZWxkczogWydicm93c2VyJywgJ21vZHVsZScsICdqc25leHQ6bWFpbicsICdtYWluJ10sIC8vIFByaW9yaXRpemUgYnJvd3NlciBmaWVsZFxuICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbiddLCAvLyBBZGQgYWxsIHJlbGV2YW50IGV4dGVuc2lvbnNcbiAgICAgICAgfSksXG4gICAgICAgIGNvbW1vbmpzKHtcbiAgICAgICAgICByZXF1aXJlUmV0dXJuc0RlZmF1bHQ6IHRydWUsIC8vIEZvcmNlIENvbW1vbkpTIG1vZHVsZXMgdG8gaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG4gICAgICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgICAgICAgaWdub3JlOiBbJ2J1ZmZlcnV0aWwnLCAndXRmLTgtdmFsaWRhdGUnXVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIGV4dGVybmFsOiBbXVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiA1MTczLFxuICB9LFxuICBiYXNlOiAnLi8nLFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sY0FBYztBQUNyQixTQUFTLHFCQUFxQjtBQUw5QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUE7QUFBQSxNQUVaLGlCQUFpQjtBQUFBO0FBQUEsTUFFakIsU0FBUyxDQUFDLFVBQVUsV0FBVyxRQUFRLFFBQVE7QUFBQSxJQUNqRCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsSUFDQSxZQUFZLENBQUMsV0FBVyxVQUFVLGVBQWUsTUFBTTtBQUFBO0FBQUEsRUFDekQ7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBRU4sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxZQUFZO0FBQUEsVUFDVixnQkFBZ0I7QUFBQSxVQUNoQixTQUFTO0FBQUEsVUFDVCxZQUFZLENBQUMsV0FBVyxVQUFVLGVBQWUsTUFBTTtBQUFBO0FBQUEsVUFDdkQsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxPQUFPO0FBQUE7QUFBQSxRQUM1RCxDQUFDO0FBQUEsUUFDRCxTQUFTO0FBQUEsVUFDUCx1QkFBdUI7QUFBQTtBQUFBLFVBQ3ZCLHlCQUF5QjtBQUFBLFVBQ3pCLFFBQVEsQ0FBQyxjQUFjLGdCQUFnQjtBQUFBLFFBQ3pDLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFDUixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
