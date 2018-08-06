'use strict';
module.exports = () => {
    $.gulp.task('serve', () => {
        $.bs.init({
            server: {
                baseDir: './build'
            }
        });
    });
};