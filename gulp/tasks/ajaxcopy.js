'use strict';

module.exports = function() {
    $.gulp.task('ajaxcopy', function(){
        return $.gulp.src('./src/ajax/**/*.json')
        .pipe($.gulp.dest($.config.root + '/ajax'));
    });
};
