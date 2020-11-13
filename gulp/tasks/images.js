'use strict';

module.exports = function () {
  $.gulp.task(`imageswebp`, function () {
    return $.gulp.src(`./src/images/**/*.png`)
        .pipe($.gp.extReplace(`.webp`))
        .pipe($.gulp.dest($.config.root + `/img`));
  });
};
