/**
 * Cesium 工具函数集合
 * 
 * 这个文件包含了一系列与 Cesium 相关的实用工具函数，可以在不同案例中复用
 */

import * as Cesium from 'cesium';

/**
 * 配置 Cesium Ion 访问令牌
 * @param {string} token - 自定义的 Cesium Ion 访问令牌，如果不提供则使用环境变量中的令牌
 */
export function configureIonToken(token) {
  // 优先使用传入的令牌，如果没有则使用环境变量中的令牌
  const accessToken = token || import.meta.env.VITE_CESIUM_ION_TOKEN;
  
  // 如果没有找到令牌，给出友好提示
  if (!accessToken) {
    console.warn('未找到 Cesium Ion 访问令牌！请在 .env 文件中设置 VITE_CESIUM_ION_TOKEN');
    console.warn('您可以复制 .env.example 文件为 .env，并替换为您自己的令牌');
  }
  
  Cesium.Ion.defaultAccessToken = accessToken;
}

/**
 * 创建一个标准配置的 Cesium Viewer
 * @param {string} container - 容器元素的 ID
 * @param {Object} options - 自定义配置选项
 * @returns {Cesium.Viewer} Cesium Viewer 实例
 */
export function createViewer(container, options = {}) {
  // 默认配置
  const defaultOptions = {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: true,
    baseLayerPicker: true,
    fullscreenButton: true,
    vrButton: false,
    geocoder: true,
    homeButton: true,
    infoBox: true,
    sceneModePicker: true,
    selectionIndicator: true,
    timeline: true,
    navigationHelpButton: true,
    shouldAnimate: true,
    shadows: false,
    targetFrameRate: 60,
  };

  // 合并默认配置和自定义配置
  const mergedOptions = { ...defaultOptions, ...options };
  
  // 创建 Viewer 实例
  const viewer = new Cesium.Viewer(container, mergedOptions);
  
  // 禁用深度测试，使大气效果更明显
  viewer.scene.globe.depthTestAgainstTerrain = false;
  
  return viewer;
}

/**
 * 飞向指定位置
 * @param {Cesium.Viewer} viewer - Cesium Viewer 实例
 * @param {number} longitude - 经度（度）
 * @param {number} latitude - 纬度（度）
 * @param {number} height - 高度（米）
 * @param {number} duration - 飞行时间（秒）
 */
export function flyTo(viewer, longitude, latitude, height, duration = 3) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
    duration: duration
  });
}

/**
 * 清理 Cesium Viewer 实例
 * @param {Cesium.Viewer} viewer - 要清理的 Viewer 实例
 */
export function destroyViewer(viewer) {
  if (viewer && !viewer.isDestroyed()) {
    viewer.destroy();
  }
}

/**
 * 添加 OSM 建筑物图层
 * @param {Cesium.Viewer} viewer - Cesium Viewer 实例
 * @returns {Promise<Cesium.Cesium3DTileset>} 建筑物图层实例
 */
export async function addOsmBuildings(viewer) {
  try {
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
    return buildingTileset;
  } catch (error) {
    console.error('加载 OSM 建筑物图层失败:', error);
    throw error;
  }
}
