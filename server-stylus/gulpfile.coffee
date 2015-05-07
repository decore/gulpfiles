require('coffee-script/register')
gulp = require('gulp')
$ = require('gulp-load-plugins')()
browserSync = require('browser-sync')

gulp.task 'sass', ->
    return gulp.src(['./sass/**/*.sass'])
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            indentedSyntax: true,
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        # .pipe($.autoprefixer('last 3 version'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))

gulp.task 'stylus', ->
  gulp.src('./stylus/**/*.styl')
    .pipe($.sourcemaps.init())
    .pipe($.stylus())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))

gulp.task 'server', ->
    browserSync({
        server: {
            baseDir: './'
        },
        # for cloud9.io
        # port: process.env.PORT,
        # host: process.env.IP
    })

gulp.task 'watch', ->
    gulp.watch(['./sass/**/*.sass'], ['sass'])
    gulp.watch(['./stylus/**/*.styl'], ['stylus'])

gulp.task 'default', ['server', 'sass', 'stylus', 'watch']