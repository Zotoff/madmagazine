'use strict';

module.exports = function() {
    $.gulp.task('pug', function() {
        return $.gulp.src('./dev/pug/**/*.pug')
        .pipe($.gp.pug({pretty: true}))
        .on('error', $.gp.notify.onError('Error: <%= error.message %>'))
        .pipe($.gulp.dest($.config.root));
    });
};