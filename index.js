/**
 *
 *
 *
 * 
 */
var fis=module.exports=require("fis3");
fis.require.prefixes.unshift("fyg");
fis.cli.name="fyg";
fis.cli.info=require('./package.json');



fis.match("*.js",{
	isMod:true,
});
fis.match("mod.js",{
	wrap:false   //不添加 defind()
});


//使用sass，scss 雪碧图合并
fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass'),
    useSprite: true,
});

fis.match("page/**/*.{html,js}",{
	useMap:true,
	parser:fis.plugin("init-page")
});

fis.match("::package",{
	spriter: fis.plugin('csssprites'),
});

if(process.argv.join("").indexOf("--dest")>-1){
  fis.match("*.js",{
    optimizer: fis.plugin('uglify-js'),
  });
  fis.match("*.scss",{
    optimizer: fis.plugin('clean-css')
  });
  fis.match("::package",{
    postpackager: fis.plugin('loader')
  });
  fis.match('*.{js,scss,png}', {
    useHash: true
  });
  fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
  });
  //export, module, require不压缩变量名
  fis.config.set('settings.optimizer.uglify-js', {
      mangle: {
          except: 'exports, module, require, define'
      },
      //自动去除console.log等调试信息
      compress : {
          drop_console: true
      }
  });
}
//指定哪些不被构建
fis.set('project.ignore', [
  'output/**',
  'output_wap/**',
  'node_modules/**',
  '.git/**',
  '.svn/**'
]);