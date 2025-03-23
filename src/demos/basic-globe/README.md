# 基础地球案例

## 功能介绍
这个案例展示了如何初始化一个基本的 Cesium 三维地球，是所有 Cesium 应用的起点。

## 使用的 Cesium 特性
- Cesium Ion 默认地形和影像
- Viewer 组件的基本配置
- 相机控制

## 实现思路
1. 创建一个 HTML 容器元素
2. 初始化 Cesium Viewer 实例
3. 配置默认视图和相机位置
4. 添加基础控件

## 使用方法
点击导航菜单中的"基础地球"选项即可查看此案例。

## 关键代码解释
```javascript
// 初始化 Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(), // 加载全球地形
  shouldAnimate: true, // 启用动画
});

// 设置初始相机位置
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 1500000), // 北京上空
  orientation: {
    heading: 0.0,
    pitch: -Cesium.Math.PI_OVER_TWO / 2,
    roll: 0.0
  }
});
```
