'use strict';

module.exports = function() {
    $.gulp.task('phpcopy', function(){
        return $.gulp.src('./src/php/**/*.php')
        .pipe($.gulp.dest($.config.root + '/php'));
    });
};