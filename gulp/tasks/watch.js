'use strict';

module.exports = function() {
    $.gulp.task('watch', function(){
        $.gulp.watch('./dev/js/*.js', $.gulp.series('js'));
        $.gulp.watch('./dev/scss/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('./dev/pug/*.pug', $.gulp.series('pug'));
    });
};