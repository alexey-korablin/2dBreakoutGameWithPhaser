module.exports = () => {
    $.gulp.task('style', () => {
        return $.gulp.src('app/styles/**/main.less')
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.less({
            'include css': true
        }))
        .pipe($.gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('Error', $.gp.notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Style'
        }))
        .pipe($.gp.csso())
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest('build/styles'))
        .pipe($.bs.reload({
            stream: true
        }))
    });

    $.gulp.task('style:dev', () => {
        return $.gulp.src('app/styles/**/main.less')
        .pipe($.gp.less({
            'include css': true
        }))
        .pipe($.gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .on('Error', $.gp.notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Style'
        }))
        .pipe($.gp.csso())
        .pipe($.gulp.dest('build/styles'))
        .pipe($.bs.reload({
            stream: true
        }))
    })
}