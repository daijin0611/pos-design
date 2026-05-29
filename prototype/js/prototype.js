/**
 * POS H5 原型 - 交互脚本
 * 处理 Tab 切换、筛选、动画等交互
 */

(function () {
  'use strict';

  // ============ Tab 切换 ============
  function initTabs() {
    document.querySelectorAll('.coupon-tabs .coupon-tab, .points-tabs .points-tab, ' +
      '.reminder-tabs .reminder-tab, .rank-tabs .rank-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var parent = this.parentElement;
        parent.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ============ Filter 切换 ============
  function initFilters() {
    document.querySelectorAll('.filter-tab, .period-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var parent = this.parentElement;
        parent.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ============ 可点击卡片高亮 ============
  function initSelectableCards() {
    document.querySelectorAll('.store-card, .service-card, .tech-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var parent = this.parentElement;
        parent.querySelectorAll('.selected').forEach(function (el) { el.classList.remove('selected'); });
        this.classList.add('selected');
      });
    });
  }

  // ============ 时间段选择 ============
  function initTimeSlots() {
    document.querySelectorAll('.time-slot:not(.disabled)').forEach(function (slot) {
      slot.addEventListener('click', function () {
        var grid = this.closest('.time-grid');
        grid.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ============ 提醒操作按钮反馈 ============
  function initRemindActions() {
    document.querySelectorAll('.remind-action').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var original = this.textContent;
        this.textContent = '✓ 已操作';
        this.style.color = 'var(--success)';
        var self = this;
        setTimeout(function () {
          self.textContent = original;
          self.style.color = '';
        }, 2000);
      });
    });
  }

  // ============ 数量加减 ============
  function initQuantityButtons() {
    document.querySelectorAll('.qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var numEl = this.parentElement.querySelector('.qty-num');
        if (!numEl) return;
        var num = parseInt(numEl.textContent, 10);
        if (this.textContent.trim() === '+') {
          numEl.textContent = num + 1;
        } else if (this.textContent.trim() === '−' || this.textContent.trim() === '-') {
          if (num > 1) numEl.textContent = num - 1;
        }
      });
    });
  }

  // ============ 登录 Tab 切换 ============
  function initLoginTabs() {
    var tabs = document.querySelectorAll('.login-tab');
    if (tabs.length === 0) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  // ============ 角色选择跳转 ============
  function initRoleSelector() {
    var loginBtn = document.querySelector('.login-btn');
    if (!loginBtn) return;

    loginBtn.addEventListener('click', function () {
      var roleSelect = document.querySelector('.role-select');
      if (roleSelect) {
        roleSelect.classList.toggle('show');
      }
    });

    document.querySelectorAll('.role-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var name = this.querySelector('.role-name');
        if (!name) return;
        var text = name.textContent;
        if (text.indexOf('会员') > -1) {
          location.href = 'pages/member-home.html';
        } else if (text.indexOf('员工') > -1) {
          location.href = 'pages/staff-home.html';
        } else if (text.indexOf('管理') > -1) {
          location.href = 'pages/admin-home.html';
        }
      });
    });
  }

  // ============ 验证码倒计时 ============
  function initSMSButton() {
    var smsBtn = document.querySelector('.sms-btn');
    if (!smsBtn) return;

    smsBtn.addEventListener('click', function () {
      if (this.classList.contains('disabled')) return;
      var seconds = 60;
      this.classList.add('disabled');
      var self = this;
      var interval = setInterval(function () {
        seconds--;
        self.textContent = seconds + 's 后重发';
        if (seconds <= 0) {
          clearInterval(interval);
          self.textContent = '获取验证码';
          self.classList.remove('disabled');
        }
      }, 1000);
    });
  }

  // ============ 日期选择高亮 ============
  function initDateSelector() {
    var dateItems = document.querySelectorAll('[style*="border-radius"][style*="min-width: 56px"]');
    dateItems.forEach(function (item) {
      item.addEventListener('click', function () {
        dateItems.forEach(function (d) {
          d.style.borderColor = 'var(--border)';
          d.style.background = '';
          var val = d.querySelector('div:last-child');
          if (val) val.style.color = 'var(--text-primary)';
        });
        this.style.borderColor = 'var(--primary)';
        this.style.background = 'var(--primary-light)';
        var val = this.querySelector('div:last-child');
        if (val) val.style.color = 'var(--primary)';
      });
    });
  }

  // ============ 滚动动画 ============
  function initScrollAnimations() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .remind-card, .rank-list-item, .perf-item').forEach(function (el) {
      if (!el.classList.contains('animate-in')) {
        observer.observe(el);
      }
    });
  }

  // ============ 初始化 ============
  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initFilters();
    initSelectableCards();
    initTimeSlots();
    initRemindActions();
    initQuantityButtons();
    initLoginTabs();
    initRoleSelector();
    initSMSButton();
    initDateSelector();
    initScrollAnimations();
  });
})();
