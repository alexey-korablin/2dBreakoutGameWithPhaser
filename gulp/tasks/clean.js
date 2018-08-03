module.exports = () => {
    $.gulp.task('clean', () => {
        // console.log($.gp);
        return $.gulp.src('build/**/*.*', {read: false})
        .pipe($.gp.clean());
    });
};