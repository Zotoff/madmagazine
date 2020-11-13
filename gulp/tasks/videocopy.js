'use strict';

module.exports = function() {
    $.gulp.task('videocopy', function(){
        return $.gulp.src('./src/video/**/*.{avi,mp4}')
        .pipe($.gulp.dest($.config.root + '/video'));
    });
};