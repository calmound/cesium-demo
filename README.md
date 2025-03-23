# Cesium 演示案例集合

这是一个基于 Cesium 的演示项目，包含多个独立的小案例，每个案例都展示了 Cesium 的不同功能和特性。项目使用 Vite 作为构建工具，便于快速开发和预览。

## 项目介绍

本项目旨在通过一系列简单、独立的案例，展示 Cesium 的各种功能和用法。每个案例都是一个完整的 demo，可以单独运行和学习。项目采用模块化的结构，便于扩展和维护。

## 项目结构

```
cesium-demo/
├── index.html                 # 主入口页面
├── package.json               # 项目依赖配置
├── vite.config.js             # Vite 配置文件
├── .env                       # 环境变量文件（包含 Cesium Ion 令牌）
├── .env.example               # 环境变量示例文件
├── public/                    # 静态资源目录
│   ├── assets/                # 公共资源（图片、模型等）
│   └── data/                  # 公共数据文件
├── src/                       # 源代码目录
│   ├── common/                # 公共组件和工具函数
│   ├── styles/                # 样式文件
│   ├── main.js                # 主入口文件
│   └── demos/                 # 所有案例目录
│       ├── basic-globe/       # 案例1：基础地球
│       └── ... 更多案例文件夹
└── README.md                  # 项目说明文档
```

## 案例列表

1. **基础地球** - 展示基本的 Cesium 三维地球，包括地形和影像加载。

## 快速开始

### 配置环境变量

在开始之前，您需要配置 Cesium Ion 访问令牌：

1. 复制 `.env.example` 文件为 `.env`
2. 在 `.env` 文件中，将 `VITE_CESIUM_ION_TOKEN` 的值替换为您自己的 Cesium Ion 访问令牌
   ```
   VITE_CESIUM_ION_TOKEN=您的Cesium_Ion访问令牌
   ```
   您可以在 [Cesium Ion](https://cesium.com/ion/tokens) 创建自己的访问令牌

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev

# 或使用 pnpm
pnpm dev
```

启动后，在浏览器中访问 http://localhost:5173 即可查看项目。

### 构建项目

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build

# 或使用 pnpm
pnpm build
```

## 如何添加新案例

1. 在 `src/demos` 目录下创建新的案例文件夹，例如 `new-demo`
2. 在新文件夹中创建以下文件：
   - `index.js` - 案例的入口文件
   - `README.md` - 案例的说明文档
3. 在 `src/common/utils.js` 文件的 `getDemoList` 函数中添加新案例的信息

案例的入口文件 `index.js` 必须导出以下两个函数：

```javascript
// 初始化函数，接收容器元素ID，返回 Cesium Viewer 实例
export function init(container) {
  // 初始化代码
  return viewer;
}

// 清理函数，在切换案例时调用，用于清理资源
export function cleanup(viewer) {
  if (viewer) {
    viewer.destroy();
  }
}
```

## 技术栈

- [Cesium](https://cesium.com/platform/cesiumjs/) - 三维地球可视化库
- [Vite](https://vitejs.dev/) - 前端构建工具

## 注意事项

- 本项目需要使用 Cesium Ion 访问令牌，请确保在 `.env` 文件中配置了有效的令牌。
- 请不要将包含您个人令牌的 `.env` 文件提交到版本控制系统中。
- 项目中的案例仅用于演示目的，可能不适合直接用于生产环境。

## 许可证

[MIT](LICENSE)
