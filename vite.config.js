import { defineConfig } from "vite";
import { resolve } from "path";
import cesium from "vite-plugin-cesium";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 3000,
  },
  optimizeDeps: {
    include: ["cesium"],
  },
  server: {
    open: true,
  },
  // 处理 Cesium 资源
  plugins: [
    cesium(),
    {
      name: "cesium-asset-handler",
      enforce: "pre",
      apply: "serve",
      // 处理 Cesium 静态资源
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // 处理 Cesium 资源请求
          if (req.url.includes("node_modules/cesium/Build")) {
            req.url = req.url.replace(
              "/node_modules/cesium/Build",
              "/node_modules/cesium/Build"
            );
          }
          next();
        });
      },
    },
  ],
});
