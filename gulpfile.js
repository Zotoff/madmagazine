"use strict";

global.$ = {
  path: {
    task: require(`./gulp/paths/tasks.js`)
  },
  config: require(`./gulp/config`),
  gulp: require(`gulp`),
  del: require(`del`),
  webp: require(`imagemin-webp`),
  uglify: require(`gulp-uglify-es`).default,
  rename: require(`gulp-rename`),
  cssunit: require(`gulp-css-unit`),
  browserSync: require(`browser-sync`).create(),
  gp: require(`gulp-load-plugins`)(),
  requirejs: require(`requirejs`)
};

// Require all paths
$.path.task.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task(`default`, $.gulp.series(
    `clean`,
    $.gulp.parallel(
        `sass`,
        `pug`,
        `imageswebp`,
        `imagescopy`,
        `iconscopy`,
        `jscopy`,
        `phpcopy`,
        `fontscopy`
    ),
    $.gulp.parallel(
        `watch`,
        `serve`
    )
));
