'use strict';
module.exports = () => {
    $.gulp.task('watch', () => {
        $.gulp.watch('app/*.html', $.gulp.series('layout'));
        $.gulp.watch('app/styles/**/*.less', $.gulp.series('style'));
        $.gulp.watch('app/scripts/**/*.js', $.gulp.series('script'));
        $.gulp.watch('app/assets/img/*.png', $.gulp.series('asset'));
    });
};