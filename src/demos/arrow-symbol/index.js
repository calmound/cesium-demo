import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumPlot from "cesium-plot-js";

export async function init(container) {
  const viewer = new Cesium.Viewer(container);

  const arrowPositions = [
    Cesium.Cartesian3.fromDegrees(115.8, 39.9),
    Cesium.Cartesian3.fromDegrees(116.0, 40.0),
    Cesium.Cartesian3.fromDegrees(116.2, 39.9),
  ];

  const arrowShape = Cesium.Cartesian3.fromDegreesArray([
    115.8,
    39.91, // 箭身左下角
    115.8,
    39.89, // 箭身右下角
    115.9,
    39.89, // 箭头底部右
    115.9,
    39.88, // 箭头右侧
    116.0,
    39.9, // 箭头尖端
    115.9,
    39.92, // 箭头左侧
    115.9,
    39.91, // 箭头底部左
  ]);

  // 创建红色箭头实体
  const arrowEntity = viewer.entities.add({
    name: "红色箭头",
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(arrowShape),
      material: Cesium.Color.RED.withAlpha(0.8),
      outline: true,
      outlineWidth: 2,
      height: 0,
      extrudedHeight: 1000, // 箭头的高度
    },
  });

  // 飞行到箭头位置
  flyToArrow(viewer, arrowPositions);

  function flyToArrow(viewer, positions) {
    // 直接使用固定的经纬度坐标
    const centerLongitude = 116.0; // 中心点经度
    const centerLatitude = 39.9; // 中心点纬度
    const viewHeight = 50000; // 视图高度（米）

    // 飞行到箭头位置
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        centerLongitude,
        centerLatitude,
        viewHeight
      ),
      duration: 2.0,
      complete: function () {
        console.log("Camera has reached the arrow position");
      },
    });
  }

  // 绘制进攻箭头
  // const geometry1 = new CesiumPlot.AttackArrow(Cesium, viewer, {
  //   material: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
  //   outlineMaterial: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
  //   outlineWidth: 3,
  //   show: true,
  // });

  // geometry1.on("drawEnd", (data) => {
  //   console.log(data);
  // });

  // 绘制双箭头
  const geometry2 = new CesiumPlot.AttackArrow(Cesium, viewer, {
    material: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
    outlineMaterial: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
    outlineWidth: 3,
  });

  geometry2.on("drawEnd", (data) => {
    console.log(data);
  });

  const cartesianPoints = [
    {
      x: -2133835.4252435253,
      y: 4417894.642531558,
      z: 4061821.4828650053,
    },
    {
      x: -2137181.2256785277,
      y: 4417579.261006469,
      z: 4060414.659839411,
    },
    {
      x: -2139410.4770342503,
      y: 4412744.708073081,
      z: 4064468.266519916,
    },
  ];
  const geometry3 = CesiumPlot.createGeometryFromData(Cesium, viewer, {
    type: "AttackArrow",
    cartesianPoints: cartesianPoints,
    style: {
      material: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
      outlineMaterial: Cesium.Color.fromCssColorString("rgba(255, 0, 0, 1)"),
    },
  });
  geometry3.startGrowthAnimation();
}

// 导出清理函数，在切换案例时调用
export function cleanup(viewer) {
  if (viewer) {
    viewer.destroy();
  }
}
