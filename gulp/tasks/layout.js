module.exports = () => {
    $.gulp.task('layout', () => {
        return $.gulp.src('app/*.html')
        .pipe($.gulp.dest('build'))
        .on('end', $.bs.reload);
    });
};