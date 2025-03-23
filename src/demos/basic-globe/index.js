/**
 * 基础地球案例
 *
 * 这个文件演示了如何创建一个基本的 Cesium 三维地球，包括：
 * 1. 初始化 Cesium Viewer
 * 2. 配置基础地形和影像
 * 3. 设置初始视角
 * 4. 添加 OSM 建筑物图层
 */

import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

// 导出初始化函数，供主程序调用
export async function init(container) {
  // 配置 Cesium Ion 访问令牌
  // 使用环境变量中的令牌，而不是硬编码在代码中
  Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

  // 创建 Cesium Viewer 实例
  const viewer = new Cesium.Viewer(container, {
    // 地形提供者 - 使用 Cesium 世界地形
    terrain: Cesium.Terrain.fromWorldTerrain(),

    // 基础配置
    animation: true, // 显示动画控件
    baseLayerPicker: true, // 显示图层选择器
    fullscreenButton: true, // 显示全屏按钮
    vrButton: false, // 隐藏 VR 按钮
    geocoder: true, // 显示地理编码器
    homeButton: true, // 显示 Home 按钮
    infoBox: true, // 显示信息框
    sceneModePicker: true, // 显示场景模式选择器
    selectionIndicator: true, // 显示选择指示器
    timeline: true, // 显示时间轴
    navigationHelpButton: true, // 显示导航帮助按钮

    // 其他设置
    shouldAnimate: true, // 启用动画
    shadows: false, // 禁用阴影以提高性能
    targetFrameRate: 60, // 目标帧率
  });

  // 禁用深度测试，使大气效果更明显
  viewer.scene.globe.depthTestAgainstTerrain = false;

  // 设置初始相机位置 - 飞向旧金山上空
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400), // 经度、纬度、高度
    orientation: {
      heading: Cesium.Math.toRadians(0.0), // 朝向（弧度）
      pitch: Cesium.Math.toRadians(-15.0), // 俯仰角（弧度）
    },
    duration: 3, // 飞行时间（秒）
  });

  // 添加 OSM 建筑物图层
  try {
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
  } catch (error) {
    console.error("加载 OSM 建筑物图层失败:", error);
  }

  // 添加一些基础控件的事件处理
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (
    e
  ) {
    // 自定义 Home 按钮行为
    e.cancel = true;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
      duration: 2,
    });
  });

  // 返回 viewer 实例，以便外部可以进一步操作
  return viewer;
}

// 导出清理函数，在切换案例时调用
export function cleanup(viewer) {
  if (viewer) {
    viewer.destroy();
  }
}
