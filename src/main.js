import './styles/main.css';
import { getDemoList, createElement, getUrlParam, setUrlParam } from './common/utils';
import { configureIonToken } from './common/cesiumUtils';

// 配置 Cesium Ion 访问令牌
configureIonToken();

// 获取应用容器
const appContainer = document.querySelector('#app');

// 初始化应用
function initApp() {
  // 清空容器
  appContainer.innerHTML = '';
  
  // 创建顶部导航
  const topNav = createElement('div', { class: 'top-nav' });
  topNav.innerHTML = `
    <h1>Cesium 演示案例</h1>
    <div class="nav-links">
      <a href="#" class="active" id="nav-home">首页</a>
      <a href="https://github.com/calmound/cesium-demo" target="_blank">GitHub</a>
    </div>
  `;
  
  // 创建主内容区
  const mainContent = createElement('div', { class: 'main-content' });
  
  // 添加到页面
  appContainer.appendChild(topNav);
  appContainer.appendChild(mainContent);
  
  // 获取当前选中的案例ID（从URL参数中获取）
  const currentDemoId = getUrlParam('demo');
  
  // 如果URL中有案例ID，加载该案例，否则显示首页
  if (currentDemoId) {
    loadDemo(currentDemoId);
  } else {
    showHomePage();
  }
  
  // 添加导航事件监听
  document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    showHomePage();
  });
}

// 显示首页
function showHomePage() {
  // 更新URL参数
  setUrlParam('demo', '');
  
  // 获取主内容区
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';
  
  // 创建首页内容
  const homePage = createElement('div', { class: 'home-page' });
  homePage.innerHTML = `
    <h2>Cesium 演示案例集合</h2>
    <p>选择下面的案例进行查看：</p>
    <div class="demo-grid"></div>
  `;
  
  // 添加到主内容区
  mainContent.appendChild(homePage);
  
  // 获取案例列表
  const demoList = getDemoList();
  
  // 获取案例网格容器
  const demoGrid = homePage.querySelector('.demo-grid');
  
  // 添加案例卡片
  demoList.forEach(demo => {
    const demoCard = createElement('div', { class: 'demo-card' });
    demoCard.innerHTML = `
      <img src="${demo.thumbnail || '/assets/thumbnails/placeholder.jpg'}" alt="${demo.title}">
      <div class="demo-card-content">
        <h3>${demo.title}</h3>
        <p>${demo.description}</p>
        <button data-demo-id="${demo.id}">查看案例</button>
      </div>
    `;
    
    // 添加到网格
    demoGrid.appendChild(demoCard);
    
    // 添加点击事件
    const button = demoCard.querySelector('button');
    button.addEventListener('click', () => {
      loadDemo(demo.id);
    });
  });
}

// 加载指定案例
async function loadDemo(demoId) {
  // 更新URL参数
  setUrlParam('demo', demoId);
  
  // 获取主内容区
  const mainContent = document.querySelector('.main-content');
  
  // 显示加载动画
  mainContent.innerHTML = '<div class="loader"></div>';
  
  try {
    // 动态导入案例模块
    const demoModule = await import(`./demos/${demoId}/index.js`);
    
    // 获取案例信息
    const demoInfo = getDemoList().find(demo => demo.id === demoId);
    
    // 创建案例内容
    mainContent.innerHTML = '';
    
    // 创建侧边导航
    const sideNav = createElement('div', { class: 'side-nav' });
    sideNav.innerHTML = `
      <h2>案例列表</h2>
      <ul class="demo-list"></ul>
    `;
    
    // 创建案例内容区
    const demoContent = createElement('div', { class: 'demo-content' });
    demoContent.innerHTML = `
      <div class="demo-viewer">
        <div id="cesiumContainer" class="cesium-container"></div>
      </div>
    `;
    
    // 添加到主内容区
    mainContent.appendChild(sideNav);
    mainContent.appendChild(demoContent);
    
    // 填充侧边导航的案例列表
    const demoList = sideNav.querySelector('.demo-list');
    getDemoList().forEach(demo => {
      const demoItem = createElement('li', { 
        class: `demo-item ${demo.id === demoId ? 'active' : ''}`,
        'data-demo-id': demo.id
      });
      
      demoItem.innerHTML = `
        <h3>${demo.title}</h3>
        <p>${demo.description}</p>
      `;
      
      demoList.appendChild(demoItem);
      
      // 添加点击事件
      demoItem.addEventListener('click', () => {
        loadDemo(demo.id);
      });
    });
    
    // 初始化案例
    const viewer = demoModule.init('cesiumContainer');
    
    // 添加清理函数
    window.currentDemo = {
      viewer,
      cleanup: () => demoModule.cleanup(viewer)
    };
    
  } catch (error) {
    console.error('加载案例失败:', error);
    mainContent.innerHTML = `
      <div class="error-message">
        <h2>加载案例失败</h2>
        <p>${error.message}</p>
        <button id="back-to-home">返回首页</button>
      </div>
    `;
    
    document.getElementById('back-to-home').addEventListener('click', showHomePage);
  }
}

// 初始化应用
initApp();

// 在切换案例前清理当前案例
window.addEventListener('beforeunload', () => {
  if (window.currentDemo && window.currentDemo.cleanup) {
    window.currentDemo.cleanup();
  }
});
