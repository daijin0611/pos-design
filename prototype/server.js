/**
 * POS H5 高保真原型 - 独立运行服务器
 * 丽德健康管理系统
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 所有未匹配的路由返回 index.html（SPA 兼容）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  🌿 POS H5 高保真原型服务器已启动');
  console.log(`  📍 访问地址: http://localhost:${PORT}`);
  console.log(`  📱 手机访问: http://<你的IP>:${PORT}`);
  console.log('  ⏹  按 Ctrl+C 停止服务器');
  console.log('');
});
