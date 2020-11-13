'use strict';

module.exports = function() {
    $.gulp.task('iconscopy', function(){
        return $.gulp.src('./src/icons/**/*.{svg}')
        .pipe($.gulp.dest($.config.root + '/img/icons/'));
    });
};