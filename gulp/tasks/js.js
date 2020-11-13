'use strict';
module.exports = function () {
  $.gulp.task(`js`, function () {
    return $.gulp.src([
      `./dev/js/constants.js`,
      `./dev/js/network.js`,
      `./dev/js/main.js`,
    ]
    )
    .pipe($.gp.sourcemaps.init())
    .pipe($.gp.jshint())
    .pipe($.gp.jshint.reporter(`default`))
    // .pipe($.gp.babel({
    //   presets: ["@babel/preset-env"]
    // }))
    // .pipe($.gp.uglify())
    .pipe($.gp.sourcemaps.write())
    .pipe($.gp.rename(`bundle.min.js`))
    .pipe($.gulp.dest($.config.root + `/js`));
  });
};
