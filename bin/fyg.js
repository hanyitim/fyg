#!/usr/bin/env node

/**
 *
 *
 *
 * 
 */
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  name: 'fyg', // 命令名字
  processTitle: 'fyg',
  moduleName: 'fyg',
  configName: 'fis-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});
cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }
  // 配置插件查找路径，优先查找本地项目里面的 node_modules
  // 然后才是全局环境下面安装的 fis3 目录里面的 node_modules
  fis.require.paths.unshift(path.join(env.cwd, 'node_modules'));
  fis.require.paths.push(path.join(path.dirname(__dirname), 'node_modules'));
  //如果不是通过npm 安装的，直接用 node 跑 bin/fyg 的话，需要添加下面的一条path，保证可以运行
  fis.require.paths.push(path.join(path.dirname(__dirname), 'node_modules','fis3','node_modules'));
  fis.cli.run(argv, env);
});