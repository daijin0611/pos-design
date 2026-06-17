/**
 * 健康档案 Mock 数据层
 * 基于 localStorage 持久化，模拟"会员 → 项目档案 → 调理记录"三级数据
 *
 * 数据模型：
 *   members:  { id, name, phone, level, levelColor, prefs[], avatarBg, avatarColor }
 *   projects: { id, name, desc, duration, iconBg, iconColor }   // iconBg/iconColor 用于头像/图标
 *   records:  { id, memberId, projectId, date, sessionNo, response, attention[], note, hasPhoto }
 *
 * response 枚举: 'great'(很满意) | 'good'(改善明显) | 'normal'(一般) | 'bad'(不适)
 */

(function (global) {
  'use strict';

  var KEY = 'pos_health_db_v1';

  // ============ 初始化种子数据 ============
  function seed() {
    var today = new Date('2026-05-22');
    function d(offset) {
      var dt = new Date(today);
      dt.setDate(dt.getDate() + offset);
      var m = '' + (dt.getMonth() + 1);
      var day = '' + dt.getDate();
      return dt.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' + (day.length < 2 ? '0' + day : day);
    }

    var db = {
      members: [
        { id: 'm1', name: '李女士', phone: '138****6789', level: '金卡', levelBg: '#F8EFE1', levelColor: '#D49530', prefs: ['偏好轻柔手法', '过敏体质', '常约下午场'], avatarBg: 'var(--primary-light)', avatarColor: '#2CB5A0' },
        { id: 'm2', name: '王女士', phone: '139****1234', level: '金卡', levelBg: '#F8EFE1', levelColor: '#D49530', prefs: ['偏好轻柔手法'], avatarBg: 'var(--secondary-light)', avatarColor: '#F5A0B5' },
        { id: 'm3', name: '赵女士', phone: '136****9012', level: '银卡', levelBg: '#E8E8E8', levelColor: '#666666', prefs: ['足疗保健'], avatarBg: 'var(--accent-light)', avatarColor: '#E8A849' },
        { id: 'm4', name: '周女士', phone: '134****7890', level: '银卡', levelBg: '#E8E8E8', levelColor: '#666666', prefs: ['敏感肌'], avatarBg: '#F0E8F8', avatarColor: '#8B5CF6' }
      ],
      projects: [
        { id: 'p1', name: '肩颈深度调理', desc: '60分钟 · 针对肩颈劳损、僵硬', iconBg: '#EBF0FF', iconColor: '#4A6CF7' },
        { id: 'p2', name: '全身精油SPA', desc: '90分钟 · 全身放松舒缓', iconBg: 'var(--secondary-light)', iconColor: '#F5A0B5' },
        { id: 'p3', name: '面部精华护理', desc: '45分钟 · 深层补水修护', iconBg: 'var(--secondary-light)', iconColor: '#F5A0B5' },
        { id: 'p4', name: '足底反射调理', desc: '40分钟 · 促进血液循环', iconBg: 'var(--accent-light)', iconColor: '#E8A849' },
        { id: 'p5', name: '背部经络疏通', desc: '50分钟 · 疏通经络、缓解疲劳', iconBg: 'var(--primary-light)', iconColor: '#2CB5A0' }
      ],
      // 常用项目（置顶于弹窗），按技师历史频次
      frequentProjects: ['p1', 'p2'],
      records: [
        // 李女士 m1
        { id: 'r1', memberId: 'm1', projectId: 'p1', date: d(-4), sessionNo: 4, response: 'good', attention: ['下次加强牵引', '减少低头'], note: '深层筋膜松解配合热石理疗，斜方肌紧张度下降。', hasPhoto: true },
        { id: 'r2', memberId: 'm1', projectId: 'p1', date: d(-14), sessionNo: 3, response: 'normal', attention: [], note: '颈椎两侧肌肉紧张，重点松解斜方肌。', hasPhoto: false },
        { id: 'r3', memberId: 'm1', projectId: 'p3', date: d(-19), sessionNo: 1, response: 'great', attention: [], note: '深层补水修护，肤色明显提亮。', hasPhoto: true },
        { id: 'r4', memberId: 'm1', projectId: 'p1', date: d(-34), sessionNo: 1, response: 'bad', attention: ['首次注意力度'], note: '初次调理，肩颈劳损较严重，手法以轻柔为主。', hasPhoto: false },
        { id: 'r5', memberId: 'm1', projectId: 'p4', date: d(-42), sessionNo: 1, response: 'good', attention: [], note: '足底穴位按压，睡眠改善。', hasPhoto: false },
        // 王女士 m2
        { id: 'r6', memberId: 'm2', projectId: 'p2', date: d(0), sessionNo: 8, response: 'great', attention: ['加强居家拉伸'], note: '全身放松，客户反馈非常舒适。', hasPhoto: true },
        // 赵女士 m3
        { id: 'r7', memberId: 'm3', projectId: 'p4', date: d(-5), sessionNo: 3, response: 'good', attention: [], note: '足底反射，睡眠质量提升。', hasPhoto: false },
        // 周女士 m4
        { id: 'r8', memberId: 'm4', projectId: 'p3', date: d(-12), sessionNo: 2, response: 'normal', attention: ['注意过敏禁忌'], note: '面部补水，敏感肌注意产品选择。', hasPhoto: false }
      ]
    };
    return db;
  }

  // ============ 读写 ============
  function load() {
    var raw = null;
    try { raw = global.localStorage.getItem(KEY); } catch (e) {}
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {}
    }
    var db = seed();
    save(db);
    return db;
  }

  function save(db) {
    try { global.localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {}
  }

  // ============ 查询 API ============
  function getAllMembers() {
    var db = load();
    // 每个会员附上最近记录时间、总次数
    return db.members.map(function (m) {
      var recs = db.records.filter(function (r) { return r.memberId === m.id; });
      var sorted = recs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      var last = sorted[0];
      return Object.assign({}, m, {
        recordCount: recs.length,
        lastDate: last ? last.date : null,
        lastProjectId: last ? last.projectId : null
      });
    }).sort(function (a, b) {
      // 按最近记录时间倒序，无记录排最后
      if (!a.lastDate && !b.lastDate) return 0;
      if (!a.lastDate) return 1;
      if (!b.lastDate) return -1;
      return a.lastDate < b.lastDate ? 1 : -1;
    });
  }

  function getMember(memberId) {
    var db = load();
    return db.members.filter(function (m) { return m.id === memberId; })[0] || null;
  }

  // 项目档案聚合：按 projectId 分组
  function getMemberArchives(memberId) {
    var db = load();
    var recs = db.records.filter(function (r) { return r.memberId === memberId; });
    var groups = {};
    recs.forEach(function (r) {
      if (!groups[r.projectId]) groups[r.projectId] = [];
      groups[r.projectId].push(r);
    });
    var archives = Object.keys(groups).map(function (pid) {
      var list = groups[pid].slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      var proj = db.projects.filter(function (p) { return p.id === pid; })[0];
      return {
        projectId: pid,
        projectName: proj ? proj.name : '未知项目',
        iconBg: proj ? proj.iconBg : '#EBF0FF',
        iconColor: proj ? proj.iconColor : '#4A6CF7',
        count: list.length,
        lastDate: list[0].date,
        records: list
      };
    }).sort(function (a, b) { return a.lastDate < b.lastDate ? 1 : -1; });
    return archives;
  }

  function getMemberRecords(memberId, projectIdFilter) {
    var db = load();
    var recs = db.records.filter(function (r) {
      if (r.memberId !== memberId) return false;
      if (projectIdFilter && r.projectId !== projectIdFilter) return false;
      return true;
    });
    // 关联项目和会员名
    return recs.map(function (r) {
      var proj = db.projects.filter(function (p) { return p.id === r.projectId; })[0];
      return Object.assign({}, r, {
        projectName: proj ? proj.name : '未知项目',
        iconBg: proj ? proj.iconBg : '#EBF0FF',
        iconColor: proj ? proj.iconColor : '#4A6CF7'
      });
    }).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  function getAllProjects() {
    return load().projects;
  }

  function getFrequentProjectIds() {
    return load().frequentProjects || [];
  }

  // ============ 写入 API ============
  // 计算下次疗程次数 = 该会员该项目已有记录数 + 1
  function getNextSessionNo(memberId, projectId) {
    var db = load();
    var n = db.records.filter(function (r) { return r.memberId === memberId && r.projectId === projectId; }).length;
    return n + 1;
  }

  // 添加一条记录，自动归入对应项目档案
  function addRecord(data) {
    var db = load();
    var id = 'r' + Date.now();
    var today = new Date();
    var m = '' + (today.getMonth() + 1);
    var day = '' + today.getDate();
    var dateStr = today.getFullYear() + '-' + (m.length < 2 ? '0' + m : m) + '-' + (day.length < 2 ? '0' + day : day);
    var rec = {
      id: id,
      memberId: data.memberId,
      projectId: data.projectId,
      date: dateStr,
      sessionNo: data.sessionNo,
      response: data.response,
      attention: data.attention || [],
      note: data.note || '',
      hasPhoto: data.hasPhoto || false,
      photoCount: data.photoCount || (data.hasPhoto ? 1 : 0)
    };
    db.records.push(rec);
    save(db);
    return rec;
  }

  // 按 id 取单条记录
  function getRecord(recordId) {
    var db = load();
    var rec = db.records.filter(function (r) { return r.id === recordId; })[0];
    if (!rec) return null;
    var proj = db.projects.filter(function (p) { return p.id === rec.projectId; })[0];
    return Object.assign({}, rec, {
      projectName: proj ? proj.name : '未知项目',
      iconBg: proj ? proj.iconBg : '#EBF0FF',
      iconColor: proj ? proj.iconColor : '#4A6CF7'
    });
  }

  // 编辑更新一条记录（保留原 date 和 sessionNo 不变）
  function updateRecord(recordId, data) {
    var db = load();
    var rec = db.records.filter(function (r) { return r.id === recordId; })[0];
    if (!rec) return null;
    if (data.projectId !== undefined) rec.projectId = data.projectId;
    if (data.response !== undefined) rec.response = data.response;
    if (data.attention !== undefined) rec.attention = data.attention || [];
    if (data.note !== undefined) rec.note = data.note || '';
    if (data.hasPhoto !== undefined) rec.hasPhoto = data.hasPhoto;
    if (data.photoCount !== undefined) rec.photoCount = data.photoCount;
    save(db);
    return rec;
  }

  // 删除一条记录
  function deleteRecord(recordId) {
    var db = load();
    db.records = db.records.filter(function (r) { return r.id !== recordId; });
    save(db);
  }

  // ============ URL 参数辅助 ============
  function getParam(name) {
    var match = global.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  // ============ 格式化辅助 ============
  function shortDate(dateStr) {
    if (!dateStr) return '—';
    var p = dateStr.split('-');
    var m = parseInt(p[1], 10);
    var d = parseInt(p[2], 10);
    return m + '月' + d + '日';
  }

  function mdDate(dateStr) {
    if (!dateStr) return '—';
    var p = dateStr.split('-');
    return p[1] + '-' + p[2];
  }

  // 反应档元数据
  var RESPONSE_META = {
    great: { label: '很满意', cls: 'great', icon: 'like-o' },
    good: { label: '改善明显', cls: 'good', icon: 'success' },
    normal: { label: '一般', cls: 'normal', icon: '' },
    bad: { label: '不适', cls: 'bad', icon: 'warning-o' }
  };

  function respMeta(resp) {
    return RESPONSE_META[resp] || RESPONSE_META.normal;
  }

  // ============ 导出 ============
  global.HealthDB = {
    load: load,
    save: save,
    reset: function () { try { global.localStorage.removeItem(KEY); } catch (e) {} return seed(); },
    getAllMembers: getAllMembers,
    getMember: getMember,
    getMemberArchives: getMemberArchives,
    getMemberRecords: getMemberRecords,
    getAllProjects: getAllProjects,
    getFrequentProjectIds: getFrequentProjectIds,
    getNextSessionNo: getNextSessionNo,
    addRecord: addRecord,
    getRecord: getRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getParam: getParam,
    shortDate: shortDate,
    mdDate: mdDate,
    respMeta: respMeta
  };

})(window);
