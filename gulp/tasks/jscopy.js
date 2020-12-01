'use strict';

module.exports = function() {
    $.gulp.task('jscopy', function(){
        return $.gulp.src('./src/js/**/*.js')
        .pipe($.gulp.dest($.config.root + '/js'));
    });
};
