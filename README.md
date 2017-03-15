# fyg


----------

> fyg 是基于fis3封装的一个解决方案，用vue+modjs+sass去搭建的。
该项目根据fis3的文件编译流程，在编译的特定流程去做了对于的编译工作，以此来实现



![这里写图片描述](https://raw.githubusercontent.com/fex-team/fis3/master/doc/docs/api/img/fis-compile-flow.png)

在解决模块化方面，有一下几个插件需要依赖：

 - fis3-command-new //用于项目初始化，以及widget，page的新建
 - fis3-parser-init-page//页面依赖的js，css的添加
 - fis3-prepackager-htmldependence //页面依赖js的关联依赖文件的整理以及添加
 - fis3-command-fsvn //储存svn用户信息
 - fis3-postpackager-fsvn //编译后对静态文件做提交动作
