// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();

// Start Watching: Run "gulp"


// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(gulp.dest('build'));
});

// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src('assets/css/main.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest('assets/css')).on('error', gutil.log);
});

// Default task
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/css/**/*.less', ['build-css']);
});
gulp.task('default', ['watch']);