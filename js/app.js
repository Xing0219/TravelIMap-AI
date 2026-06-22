/* ============================================
   TravelMap AI - 手机端主交互脚本
   登录状态 / 页面路由 / 地图交互 / 路线生成
   ============================================ */

(function () {
  'use strict';

  // ==================== 城市数据 ====================
  var CITY_DATA = {
    hangzhou: {
      name: '杭州',
      center: [30.2741, 120.1551],
      zoom: 13,
      pois: [
        { name: '西湖', lat: 30.2590, lng: 120.1388, type: 'scenic', duration: 180, desc: '世界文化遗产，杭州标志性景点', rating: 4.8 },
        { name: '灵隐寺', lat: 30.2408, lng: 120.1000, type: 'scenic', duration: 120, desc: '千年古刹，江南著名禅宗寺院', rating: 4.7 },
        { name: '河坊街', lat: 30.2470, lng: 120.1680, type: 'food', duration: 90, desc: '历史文化街区，汇聚杭州特色美食', rating: 4.5 },
        { name: '西溪湿地', lat: 30.2650, lng: 120.0620, type: 'nature', duration: 150, desc: '国家湿地公园，城市中的自然绿洲', rating: 4.6 },
        { name: '龙井村', lat: 30.2280, lng: 120.1250, type: 'culture', duration: 90, desc: '龙井茶产地，品茶赏景两不误', rating: 4.4 },
        { name: '南宋御街', lat: 30.2490, lng: 120.1700, type: 'culture', duration: 60, desc: '南宋皇城遗址上的步行街', rating: 4.3 },
        { name: '断桥残雪', lat: 30.2600, lng: 120.1510, type: 'scenic', duration: 45, desc: '西湖十景之一，白蛇传传说发生地', rating: 4.5 },
        { name: '知味观', lat: 30.2460, lng: 120.1690, type: 'food', duration: 60, desc: '百年老字号，杭帮菜代表', rating: 4.4 },
        { name: '雷峰塔', lat: 30.2480, lng: 120.1490, type: 'scenic', duration: 60, desc: '西湖标志性建筑，登塔俯瞰全景', rating: 4.5 },
        { name: '九溪烟树', lat: 30.2150, lng: 120.1150, type: 'nature', duration: 120, desc: '九溪十八涧，徒步好去处', rating: 4.6 }
      ]
    },
    chengdu: {
      name: '成都',
      center: [30.5728, 104.0668],
      zoom: 13,
      pois: [
        { name: '大熊猫繁育基地', lat: 30.7328, lng: 104.1458, type: 'scenic', duration: 180, desc: '近距离观赏国宝大熊猫', rating: 4.8 },
        { name: '宽窄巷子', lat: 30.6697, lng: 104.0553, type: 'culture', duration: 120, desc: '成都历史文化名片', rating: 4.5 },
        { name: '锦里古街', lat: 30.6460, lng: 104.0480, type: 'food', duration: 90, desc: '三国文化+成都小吃', rating: 4.4 },
        { name: '武侯祠', lat: 30.6435, lng: 104.0480, type: 'culture', duration: 90, desc: '三国圣地，诸葛亮纪念地', rating: 4.6 },
        { name: '春熙路', lat: 30.6571, lng: 104.0817, type: 'shopping', duration: 120, desc: '成都最繁华的商业步行街', rating: 4.3 },
        { name: '人民公园', lat: 30.6560, lng: 104.0630, type: 'nature', duration: 60, desc: '体验成都慢生活的最佳去处', rating: 4.4 },
        { name: '太古里', lat: 30.6520, lng: 104.0840, type: 'shopping', duration: 90, desc: '时尚购物+美食聚集地', rating: 4.5 },
        { name: '玉林路', lat: 30.6400, lng: 104.0600, type: 'food', duration: 90, desc: '成都地道美食街', rating: 4.3 },
        { name: '青城山', lat: 30.8980, lng: 103.5720, type: 'nature', duration: 240, desc: '道教名山，天下幽', rating: 4.7 },
        { name: '都江堰', lat: 30.9984, lng: 103.6070, type: 'scenic', duration: 180, desc: '世界水利文化鼻祖', rating: 4.7 }
      ]
    },
    beijing: {
      name: '北京',
      center: [39.9042, 116.4074],
      zoom: 12,
      pois: [
        { name: '故宫博物院', lat: 39.9163, lng: 116.3972, type: 'scenic', duration: 240, desc: '世界最大宫殿建筑群', rating: 4.9 },
        { name: '天安门广场', lat: 39.9055, lng: 116.3976, type: 'scenic', duration: 60, desc: '世界最大的城市中心广场', rating: 4.7 },
        { name: '颐和园', lat: 39.9998, lng: 116.2755, type: 'scenic', duration: 180, desc: '皇家园林博物馆', rating: 4.8 },
        { name: '南锣鼓巷', lat: 39.9370, lng: 116.4030, type: 'culture', duration: 90, desc: '北京最古老的街区之一', rating: 4.4 },
        { name: '王府井', lat: 39.9137, lng: 116.4103, type: 'shopping', duration: 120, desc: '中华第一街', rating: 4.3 },
        { name: '798艺术区', lat: 39.9838, lng: 116.4940, type: 'culture', duration: 120, desc: '当代艺术聚集地', rating: 4.5 },
        { name: '簋街', lat: 39.9400, lng: 116.4250, type: 'food', duration: 90, desc: '北京著名美食街', rating: 4.3 },
        { name: '天坛公园', lat: 39.8822, lng: 116.4066, type: 'scenic', duration: 120, desc: '明清祭天圣地', rating: 4.7 },
        { name: '什刹海', lat: 39.9400, lng: 116.3830, type: 'nature', duration: 90, desc: '老北京风貌保存最完好的地方', rating: 4.5 },
        { name: '国家博物馆', lat: 39.9050, lng: 116.3970, type: 'culture', duration: 150, desc: '中华文物收藏最丰富的博物馆', rating: 4.6 }
      ]
    },
    shanghai: {
      name: '上海',
      center: [31.2304, 121.4737],
      zoom: 13,
      pois: [
        { name: '外滩', lat: 31.2400, lng: 121.4900, type: 'scenic', duration: 90, desc: '万国建筑博览群', rating: 4.8 },
        { name: '豫园', lat: 31.2272, lng: 121.4920, type: 'culture', duration: 90, desc: '江南古典园林', rating: 4.5 },
        { name: '南京路步行街', lat: 31.2350, lng: 121.4750, type: 'shopping', duration: 120, desc: '中华商业第一街', rating: 4.4 },
        { name: '田子坊', lat: 31.2100, lng: 121.4680, type: 'culture', duration: 90, desc: '石库门里的创意市集', rating: 4.4 },
        { name: '城隍庙', lat: 31.2260, lng: 121.4920, type: 'food', duration: 60, desc: '上海小吃聚集地', rating: 4.3 },
        { name: '陆家嘴', lat: 31.2390, lng: 121.5000, type: 'scenic', duration: 90, desc: '东方明珠、上海中心所在地', rating: 4.6 },
        { name: '新天地', lat: 31.2200, lng: 121.4740, type: 'food', duration: 90, desc: '石库门里的时尚地标', rating: 4.5 },
        { name: '迪士尼乐园', lat: 31.1440, lng: 121.6570, type: 'scenic', duration: 360, desc: '中国大陆首座迪士尼主题乐园', rating: 4.7 },
        { name: '武康路', lat: 31.2060, lng: 121.4400, type: 'culture', duration: 60, desc: '梧桐树下的历史名街', rating: 4.5 },
        { name: '静安寺', lat: 31.2230, lng: 121.4480, type: 'scenic', duration: 45, desc: '千年古刹，闹中取静', rating: 4.4 }
      ]
    }
  };

  // ==================== 全局状态 ====================
  var currentUser = null;
  var currentPage = 'login';
  var maps = {};
  var routeLayers = [];
  var currentRoute = null;
  var myRoutes = [];

  // ==================== 初始化 ====================
  document.addEventListener('DOMContentLoaded', function () {
    initLoginPage();
    initHomePage();
    initCreatePage();
    initDetailPage();
    initProfilePage();
    initTabBar();
    initModals();

    // 检查登录状态
    checkLoginStatus();
  });

  // ==================== 登录页 ====================
  function initLoginPage() {
    var tabs = document.querySelectorAll('.login-tab');
    var forms = document.querySelectorAll('.login-form');
    var tabContainer = document.querySelector('.login-tabs');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        tabContainer.dataset.active = target;

        forms.forEach(function (f) { f.classList.remove('active'); });
        document.getElementById(target + 'Form').classList.add('active');
      });
    });

    // 密码可见性切换
    document.getElementById('toggleLoginPwd').addEventListener('click', function () {
      togglePassword('loginPassword', this);
    });
    document.getElementById('toggleRegPwd').addEventListener('click', function () {
      togglePassword('regPassword', this);
    });

    // 发送验证码
    document.getElementById('sendCodeBtn').addEventListener('click', function () {
      var phone = document.getElementById('regPhone').value;
      if (!phone || phone.length !== 11) {
        showToast('请输入正确的手机号');
        return;
      }
      var btn = this;
      var count = 60;
      btn.disabled = true;
      btn.textContent = count + 's';
      var timer = setInterval(function () {
        count--;
        btn.textContent = count + 's';
        if (count <= 0) {
          clearInterval(timer);
          btn.disabled = false;
          btn.textContent = '获取验证码';
        }
      }, 1000);
      showToast('验证码已发送');
    });

    // 登录表单
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = document.getElementById('loginPhone').value;
      var password = document.getElementById('loginPassword').value;
      if (!phone || phone.length !== 11) {
        showToast('请输入正确的手机号');
        return;
      }
      if (!password) {
        showToast('请输入密码');
        return;
      }
      // 模拟登录
      login({ phone: phone, name: '用户' + phone.slice(-4), avatar: '' });
    });

    // 注册表单
    document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = document.getElementById('regPhone').value;
      var code = document.getElementById('regCode').value;
      var password = document.getElementById('regPassword').value;
      var nickname = document.getElementById('regNickname').value;
      if (!phone || phone.length !== 11) {
        showToast('请输入正确的手机号');
        return;
      }
      if (!code || code.length !== 6) {
        showToast('请输入6位验证码');
        return;
      }
      if (!password || password.length < 6) {
        showToast('密码至少6位');
        return;
      }
      login({ phone: phone, name: nickname || '用户' + phone.slice(-4), avatar: '' });
    });
  }

  function togglePassword(inputId, btn) {
    var input = document.getElementById(inputId);
    var isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  }

  function login(user) {
    currentUser = user;
    localStorage.setItem('travelmap_user', JSON.stringify(user));
    updateUserUI();
    showPage('home');
    showToast('登录成功');
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem('travelmap_user');
    showPage('login');
    showToast('已退出登录');
  }

  function checkLoginStatus() {
    var saved = localStorage.getItem('travelmap_user');
    if (saved) {
      currentUser = JSON.parse(saved);
      updateUserUI();
      showPage('home');
    } else {
      showPage('login');
    }
  }

  function updateUserUI() {
    if (!currentUser) return;
    // 更新首页头像
    var headerName = document.getElementById('headerAvatarPlaceholder');
    if (headerName) {
      headerName.innerHTML = '<span style="font-size:14px;font-weight:700;color:var(--primary)">' + currentUser.name.charAt(0) + '</span>';
    }
    // 更新个人中心
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    var placeholder = document.getElementById('profileAvatarPlaceholder');
    if (placeholder) {
      placeholder.innerHTML = '<span style="font-size:28px;font-weight:700;color:var(--primary)">' + currentUser.name.charAt(0) + '</span>';
    }
    document.getElementById('logoutGroup').style.display = 'block';
  }

  // ==================== 首页 ====================
  function initHomePage() {
    // 快捷入口
    document.querySelectorAll('.quick-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = this.dataset.action;
        if (action === 'create') {
          showPage('create');
        } else if (action === 'nearby') {
          showToast('附近景点功能开发中');
        } else if (action === 'history') {
          showToast('历史足迹功能开发中');
        } else if (action === 'favorites') {
          showToast('收藏功能开发中');
        }
      });
    });

    // 头像点击 -> 个人中心
    document.getElementById('headerAvatar').addEventListener('click', function () {
      showPage('profile');
    });

    // 初始化首页地图
    setTimeout(function () {
      if (!maps.home) {
        maps.home = L.map('homeMap', {
          center: [30.2741, 120.1551],
          zoom: 12,
          zoomControl: false,
          attributionControl: false
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }).addTo(maps.home);
      }
    }, 500);

    // 定位按钮
    document.getElementById('locateBtn').addEventListener('click', function () {
      showToast('正在定位...');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          maps.home.setView([lat, lng], 14);
          L.marker([lat, lng]).addTo(maps.home)
            .bindPopup('当前位置').openPopup();
        }, function () {
          showToast('定位失败，请检查权限');
        });
      }
    });

    // 生成推荐路线卡片
    renderRecommendRoutes();

    // 热门目的地点击
    document.querySelectorAll('.dest-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var city = this.dataset.city;
        if (CITY_DATA[city]) {
          // 直接生成路线
          generateRoute(city, 2, ['scenic', 'food']);
        }
      });
    });
  }

  function renderRecommendRoutes() {
    var container = document.getElementById('recommendRoutes');
    var routes = [
      { city: 'hangzhou', days: 2, title: '杭州西湖2日游', tags: ['景点', '美食'], time: '约6小时', dist: '15公里' },
      { city: 'chengdu', days: 3, title: '成都美食3日游', tags: ['美食', '文化'], time: '约8小时', dist: '22公里' },
      { city: 'beijing', days: 2, title: '北京故宫2日游', tags: ['景点', '文化'], time: '约7小时', dist: '18公里' }
    ];

    container.innerHTML = routes.map(function (r, i) {
      return '<div class="route-card" data-index="' + i + '">' +
        '<div class="route-card-img" style="background:linear-gradient(135deg,' + (i === 0 ? '#0d9488,#14b8a6' : i === 1 ? '#f59e0b,#fbbf24' : '#ef4444,#f87171') + ')">' +
          '<h4>' + r.title + '</h4>' +
          '<span class="route-meta">' + r.time + ' · ' + r.dist + '</span>' +
        '</div>' +
        '<div class="route-card-info">' +
          '<div class="route-card-tags">' + r.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
          '<div class="route-card-stats">' +
            '<span>' + r.days + '天行程</span>' +
            '<span>' + (r.city === 'hangzhou' ? '10个景点' : r.city === 'chengdu' ? '10个景点' : '10个景点') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    container.querySelectorAll('.route-card').forEach(function (card, idx) {
      card.addEventListener('click', function () {
        var r = routes[idx];
        generateRoute(r.city, r.days, ['scenic', 'food']);
      });
    });
  }

  // ==================== 创建路线页 ====================
  function initCreatePage() {
    // 返回按钮
    document.getElementById('createBack').addEventListener('click', function () {
      showPage('home');
    });

    // 目的地选择
    document.querySelectorAll('.dest-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        document.querySelectorAll('.dest-option').forEach(function (o) { o.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // 天数滑块
    var daySlider = document.getElementById('daySlider');
    var dayValue = document.getElementById('dayValue');
    daySlider.addEventListener('input', function () {
      dayValue.textContent = this.value;
    });

    // 偏好标签
    document.querySelectorAll('.pref-tag').forEach(function (tag) {
      tag.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    });

    // 预算选择
    document.querySelectorAll('.budget-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.budget-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });

    // 生成路线
    document.getElementById('createRouteBtn').addEventListener('click', function () {
      var btn = this;
      var btnText = btn.querySelector('.btn-text');
      var btnLoading = btn.querySelector('.btn-loading');

      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      btn.disabled = true;

      var city = document.querySelector('.dest-option.active').dataset.city;
      var days = parseInt(daySlider.value);
      var tags = [];
      document.querySelectorAll('.pref-tag.active').forEach(function (t) {
        tags.push(t.dataset.tag);
      });

      setTimeout(function () {
        generateRoute(city, days, tags);
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btn.disabled = false;
      }, 1500);
    });
  }

  // ==================== 路线生成 ====================
  function generateRoute(cityKey, days, tags) {
    var city = CITY_DATA[cityKey];
    if (!city) return;

    var filtered = city.pois.filter(function (p) {
      return tags.indexOf(p.type) !== -1;
    });
    if (filtered.length === 0) filtered = city.pois.slice();

    var perDay = Math.ceil(filtered.length / days);
    var route = { city: cityKey, cityName: city.name, days: days, daysData: [] };

    for (var d = 0; d < days; d++) {
      var dayPois = filtered.slice(d * perDay, (d + 1) * perDay);
      if (dayPois.length === 0 && d === days - 1) {
        dayPois = filtered.slice(-1);
      }
      route.daysData.push({ day: d + 1, pois: dayPois });
    }

    currentRoute = route;
    myRoutes.push(route);
    showRouteDetail(route);
  }

  // ==================== 路线详情页 ====================
  function initDetailPage() {
    document.getElementById('detailBack').addEventListener('click', function () {
      showPage('home');
    });

    document.getElementById('shareRouteBtn').addEventListener('click', function () {
      document.getElementById('shareModal').classList.add('show');
      document.getElementById('overlay').classList.add('show');
    });

    document.getElementById('detailMore').addEventListener('click', function () {
      showToast('更多选项');
    });

    document.getElementById('editRouteBtn').addEventListener('click', function () {
      showToast('编辑功能开发中');
    });

    document.getElementById('navigateBtn').addEventListener('click', function () {
      showToast('开始导航');
    });
  }

  function showRouteDetail(route) {
    document.getElementById('detailTitle').textContent = route.cityName + route.days + '日游';
    document.getElementById('detailRouteName').textContent = route.cityName + route.days + '日游';

    var totalDuration = 0;
    var totalSpots = 0;
    route.daysData.forEach(function (d) {
      d.pois.forEach(function (p) {
        totalDuration += p.duration;
        totalSpots++;
      });
    });

    document.getElementById('detailDuration').textContent = '约' + Math.ceil(totalDuration / 60) + '小时';
    document.getElementById('detailDistance').textContent = '约' + (totalSpots * 3) + '公里';
    document.getElementById('detailBudget').textContent = '约' + (route.days * 400) + '元';

    // 天数标签
    var dayTabs = document.getElementById('dayTabs');
    dayTabs.innerHTML = route.daysData.map(function (d, i) {
      return '<button class="day-tab ' + (i === 0 ? 'active' : '') + '" data-day="' + i + '">第' + d.day + '天</button>';
    }).join('');

    dayTabs.querySelectorAll('.day-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        dayTabs.querySelectorAll('.day-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderSpotList(route.daysData[parseInt(this.dataset.day)]);
      });
    });

    // 渲染景点列表
    renderSpotList(route.daysData[0]);

    // 渲染地图
    setTimeout(function () {
      renderDetailMap(route);
    }, 100);

    showPage('routeDetail');
  }

  function renderSpotList(dayData) {
    var list = document.getElementById('spotList');
    list.innerHTML = dayData.pois.map(function (p, i) {
      var typeNames = { scenic: '景点', food: '美食', shopping: '购物', nature: '自然', culture: '文化', night: '夜景' };
      return '<div class="spot-item">' +
        '<div class="spot-number">' + (i + 1) + '</div>' +
        '<div class="spot-info">' +
          '<h4>' + p.name + '</h4>' +
          '<p>' + p.desc + '</p>' +
          '<div class="spot-tags">' +
            '<span>' + typeNames[p.type] + '</span>' +
            '<span>★ ' + p.rating + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="spot-time">' + Math.floor(p.duration / 60) + 'h' + (p.duration % 60) + 'm</div>' +
      '</div>';
    }).join('');
  }

  function renderDetailMap(route) {
    var city = CITY_DATA[route.city];
    if (!city) return;

    if (maps.detail) {
      maps.detail.remove();
    }

    maps.detail = L.map('detailMap', {
      center: city.center,
      zoom: city.zoom,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(maps.detail);

    var colors = ['#0d9488', '#f59e0b', '#8b5cf6'];

    route.daysData.forEach(function (day, dayIdx) {
      var color = colors[dayIdx % colors.length];

      if (day.pois.length > 1) {
        var latlngs = day.pois.map(function (p) { return [p.lat, p.lng]; });
        L.polyline(latlngs, {
          color: color,
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 6'
        }).addTo(maps.detail);
      }

      day.pois.forEach(function (p, poiIdx) {
        var markerHtml = '<div class="custom-marker marker-' + p.type + '">' + (poiIdx + 1) + '</div>';
        var icon = L.divIcon({
          html: markerHtml,
          className: '',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
        L.marker([p.lat, p.lng], { icon: icon }).addTo(maps.detail)
          .bindPopup('<strong>' + p.name + '</strong><br><small>' + p.desc + '</small>');
      });
    });
  }

  // ==================== 个人中心页 ====================
  function initProfilePage() {
    document.getElementById('menuMyRoutes').addEventListener('click', function () {
      showMyRoutes();
    });

    document.getElementById('menuFavorites').addEventListener('click', function () {
      showToast('收藏功能开发中');
    });

    document.getElementById('menuHistory').addEventListener('click', function () {
      showToast('浏览历史功能开发中');
    });

    document.getElementById('menuNotifications').addEventListener('click', function () {
      showToast('消息通知功能开发中');
    });

    document.getElementById('menuHelp').addEventListener('click', function () {
      showToast('帮助与反馈功能开发中');
    });

    document.getElementById('menuAbout').addEventListener('click', function () {
      showToast('TravelMap AI v1.0');
    });

    document.getElementById('logoutBtn').addEventListener('click', function () {
      logout();
    });

    document.getElementById('profileSettings').addEventListener('click', function () {
      showToast('设置功能开发中');
    });
  }

  function showMyRoutes() {
    var list = document.getElementById('myRoutesList');
    var empty = document.getElementById('emptyRoutes');

    if (myRoutes.length === 0) {
      list.style.display = 'none';
      empty.style.display = 'flex';
    } else {
      list.style.display = 'flex';
      empty.style.display = 'none';
      list.innerHTML = myRoutes.map(function (r, i) {
        return '<div class="my-route-item" data-index="' + i + '">' +
          '<div class="my-route-img">' + r.cityName.charAt(0) + '</div>' +
          '<div class="my-route-info">' +
            '<h4>' + r.cityName + r.days + '日游</h4>' +
            '<div class="my-route-meta">' +
              '<span>' + r.days + '天</span>' +
              '<span>' + r.daysData.reduce(function (sum, d) { return sum + d.pois.length; }, 0) + '个景点</span>' +
            '</div>' +
            '<div class="my-route-tags">' +
              '<span>AI生成</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');

      list.querySelectorAll('.my-route-item').forEach(function (item, idx) {
        item.addEventListener('click', function () {
          currentRoute = myRoutes[idx];
          showRouteDetail(currentRoute);
        });
      });
    }

    document.getElementById('createFirstRoute').addEventListener('click', function () {
      showPage('create');
    });

    document.getElementById('myRoutesBack').addEventListener('click', function () {
      showPage('profile');
    });

    showPage('myRoutes');
  }

  // ==================== 底部导航 ====================
  function initTabBar() {
    document.querySelectorAll('.tab-item').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var page = this.dataset.page;
        if (page === 'create') {
          showPage('create');
        } else if (page === 'home') {
          showPage('home');
        } else if (page === 'profile') {
          showPage('profile');
        }
      });
    });
  }

  // ==================== 页面切换 ====================
  function showPage(pageName) {
    var pages = {
      login: 'loginPage',
      home: 'homePage',
      create: 'createPage',
      routeDetail: 'routeDetailPage',
      profile: 'profilePage',
      myRoutes: 'myRoutesPage'
    };

    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(function (p) {
      p.classList.remove('active');
    });

    // 显示目标页面
    var targetId = pages[pageName];
    if (targetId) {
      document.getElementById(targetId).classList.add('active');
    }

    currentPage = pageName;

    // 更新底部导航
    document.querySelectorAll('.tab-item').forEach(function (tab) {
      tab.classList.remove('active');
      if (tab.dataset.page === pageName) {
        tab.classList.add('active');
      }
    });

    // 登录页不显示底部导航
    var tabBar = document.getElementById('tabBar');
    if (pageName === 'login') {
      tabBar.style.display = 'none';
    } else {
      tabBar.style.display = 'flex';
    }

    // 路线详情页特殊处理
    if (pageName === 'routeDetail') {
      tabBar.style.display = 'none';
    }

    // 我的路线页不显示底部导航
    if (pageName === 'myRoutes') {
      tabBar.style.display = 'none';
    }
  }

  // ==================== 弹窗 ====================
  function initModals() {
    document.getElementById('closeShareModal').addEventListener('click', closeModals);
    document.getElementById('overlay').addEventListener('click', closeModals);

    document.querySelectorAll('.share-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        showToast('分享成功');
        closeModals();
      });
    });
  }

  function closeModals() {
    document.querySelectorAll('.modal').forEach(function (m) { m.classList.remove('show'); });
    document.getElementById('overlay').classList.remove('show');
  }

  // ==================== Toast ====================
  function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2000);
  }

  // 暴露全局API供测试和外部调用
  window.app = {
    login: login,
    logout: logout,
    showPage: showPage,
    showToast: showToast,
    generateRoute: generateRoute,
    showMyRoutes: showMyRoutes,
    closeModals: closeModals
  };

})();
