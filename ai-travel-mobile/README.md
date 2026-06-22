# TravelMap AI - 智能旅行规划（手机端）

基于地图可视化的 AI 个性化旅游路线生成系统 - 手机端小程序风格版本。

## 功能特性

- 登录/注册（手机号 + 密码/验证码）
- 首页地图探索 + 快捷入口
- AI 智能路线生成（选择目的地、天数、偏好标签、预算）
- 路线详情（地图展示 + 景点列表 + 天数切换）
- 个人中心（用户信息、数据统计、菜单列表）
- 我的路线（历史路线管理）
- 底部导航栏 + 页面切换动画
- 竖屏适配 + 触摸优化

## 技术栈

- HTML5 + CSS3 + JavaScript（纯前端，无框架依赖）
- Leaflet + OpenStreetMap（地图）
- localStorage（登录状态持久化）

## 本地预览

```bash
cd ai-travel-mobile
python -m http.server 8081
# 访问 http://localhost:8081
```

## GitHub Pages 部署

1. 将整个 `ai-travel-mobile` 文件夹推送到 GitHub 仓库
2. 进入仓库 Settings -> Pages
3. Source 选择 "Deploy from a branch"
4. Branch 选择 `main` 或 `master`，文件夹选择 `/ (root)`
5. 保存后等待部署完成，访问 `https://你的用户名.github.io/仓库名/`

## 项目结构

```
ai-travel-mobile/
├── index.html      # 主页面（包含所有页面结构）
├── css/
│   └── style.css   # 完整样式（竖屏适配、动画）
├── js/
│   └── app.js      # 交互逻辑（登录、路由、地图、路线生成）
└── README.md
```

## 注意事项

- 地图瓦片需要网络连接（OpenStreetMap）
- 当前为纯前端演示版本，无真实后端 API
- 登录状态通过 localStorage 保存
