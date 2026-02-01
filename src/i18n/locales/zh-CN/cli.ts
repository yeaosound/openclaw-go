// 简体中文翻译 - CLI 模块
export const cliMessages = {
  // plugins-cli.ts
  'cli.plugins.description': '管理 OpenClaw 插件/扩展',
  'cli.plugins.list.description': '列出已发现的插件',
  'cli.plugins.show.description': '显示插件详情',
  'cli.plugins.enable.description': '在配置中启用插件',
  'cli.plugins.disable.description': '在配置中禁用插件',
  'cli.plugins.install.description': '安装插件（路径、压缩包或 npm 规范）',
  'cli.plugins.update.description': '更新已安装的插件（仅限 npm 安装）',
  'cli.plugins.doctor.description': '报告插件加载问题',

  // gateway-cli
  'cli.gateway.description': '运行 WebSocket 网关',
  'cli.gateway.run.description': '运行 WebSocket 网关（前台）',
  'cli.gateway.status.description': '显示网关服务状态 + 探测网关',
  'cli.gateway.install.description': '安装网关服务（launchd/systemd/schtasks）',
  'cli.gateway.uninstall.description': '卸载网关服务',
  'cli.gateway.start.description': '启动网关服务',
  'cli.gateway.stop.description': '停止网关服务',
  'cli.gateway.restart.description': '重启网关服务',
  'cli.gateway.call.description': '调用网关方法',
  'cli.gateway.usage.description': '从会话日志获取使用费用摘要',
  'cli.gateway.health.description': '获取网关健康状态',
  'cli.gateway.deep.description': '显示网关可访问性 + 发现 + 健康 + 状态摘要',
  'cli.gateway.discover.description': '通过 Bonjour 发现网关',

  // browser-cli
  'cli.browser.description': '管理 OpenClaw 专用浏览器（Chrome/Chromium）',
  'cli.browser.status.description': '显示浏览器状态',
  'cli.browser.start.description': '启动浏览器（如果已在运行则无操作）',
  'cli.browser.stop.description': '停止浏览器（尽力而为）',
  'cli.browser.reset.description': '重置浏览器配置文件（移至废纸篓）',
  'cli.browser.tabs.description': '列出打开的选项卡',
  'cli.browser.shortcuts.description': '选项卡快捷方式（基于索引）',
  'cli.browser.new.description': '打开新选项卡（about:blank）',
  'cli.browser.focus.description': '按索引聚焦选项卡（从 1 开始）',
  'cli.browser.close.description': '按索引关闭选项卡（从 1 开始）；默认：第一个选项卡',
  'cli.browser.open.description': '在新选项卡中打开 URL',

  // memory-cli
  'cli.memory.description': '内存搜索工具',
  'cli.memory.status.description': '显示内存搜索索引状态',
  'cli.memory.index.description': '重新索引内存文件',
  'cli.memory.search.description': '搜索内存文件',
  'cli.memory.indexing': '正在索引内存…',
  'cli.memory.checking': '正在检查内存…',

  // Service status
  'cli.service.alreadyRunning': '服务已在运行',
  'cli.service.notRunning': '服务未运行',
  'cli.service.installed': '服务已安装',
  'cli.service.notInstalled': '服务未安装',

  // Progress and status
  'cli.progress.loading': '正在加载…',
  'cli.progress.done': '完成',
  'cli.status.success': '成功',
  'cli.status.failed': '失败',
  'cli.status.warning': '警告',
  'cli.status.error': '错误',
  'cli.status.info': '信息',
};

export default cliMessages;
