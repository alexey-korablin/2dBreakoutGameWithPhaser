module.exports = () => {
    $.gulp.task('asset', () => {
        return $.gulp.src('app/assets/img/*.png')
        .pipe($.gulp.dest('build/assets/img/'))
        .on('end', $.bs.reload);
    });
};