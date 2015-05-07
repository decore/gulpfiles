var 
    gulp = require('gulp'), // Сообственно Gulp JS
    jade = require('gulp-jade'), // Плагин для Jade
    stylus = require('gulp-stylus'), // Плагин для Stylus
    livereload = require('gulp-livereload'), // Livereload для Gulp
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'), // Склейка файлов
    // connect = require('gulp-connect'), // Webserver
    browserSync = require('browser-sync'),
    newer = require('gulp-newer'),
    reload      = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "public"
        }
    });
});

//stylus

gulp.task('stylus', function() {
    gulp.src(['assets/stylus/**/**/*.styl', '!assets/stylus/**/**/_*.styl'])
        .pipe(stylus()) // собираем stylus
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('public/css')) // записываем css
    .pipe(browserSync.reload({stream: true}));
    // .pipe(connect.reload()); // даем команду на перезагрузку css
});

gulp.task('css-static', function(){
    gulp.src('assets/css/**/*.css')
        .pipe(newer('assets/css/**/*'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Собираем html из Jade

gulp.task('jade', function() {
    gulp.src(['assets/*.jade', '!assets/_*.jade'])
        .pipe(jade())  // Собираем Jade только в папке assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('public/')) // Записываем собранные файлы
    .pipe(browserSync.reload({stream: true}));
    // .pipe(connect.reload()); // даем команду на перезагрузку страницы
}); 

// Собираем JS
gulp.task('js', function() {
    gulp.src(['assets/js/**/*.js', '!assets/js/vendor/**/*.js'])
        .pipe(concat('all.js')) // Собираем все JS, кроме тех которые находятся в assets/js/vendor/**
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-static', function() {
    gulp.src(['assets/js/vendor/*.*', 'assets/js/vendor/**/*.*'])
        .pipe(gulp.dest('public/js/vendor'))
        .pipe(browserSync.reload({stream: true}));
});
// Копируем изображения

gulp.task('images', function() {
    gulp.src('assets/img/**')
        .pipe(newer('assets/img/**'))
        .pipe(gulp.dest('public/img'))
        .pipe(browserSync.reload({stream: true}));
});


// Запуск сервера разработки gulp watch

gulp.task('watch', function() {
    gulp.watch('assets/stylus/*.styl',['stylus']);
    gulp.watch('assets/css/**/*.css',['css-static']);
    gulp.watch('assets/*.jade', ['jade']);
    gulp.watch('assets/img/*', ['images']);
    gulp.watch('assets/js/**/*', ['js']);
    gulp.watch('assets/js/vendor/*', ['js-static']);
});

gulp.task('default', ['browser-sync', 'jade', 'stylus', 'css-static', 'images', 'js', 'js-static', 'watch']);

gulp.task('build', function(){
    gulp.src('assets/img/**/*')
        .pipe(gulp.dest('./build/img'));
    gulp.src(['assets/js/**/*.js', '!assets/js/vendor/**/*.js'])
        .pipe(gulp.dest('./build/js'))
    gulp.src(['assets/js/**/*.css', '!assets/js/vendor/**/*.css'])
        .pipe(gulp.dest('./build/js'))
    gulp.src(['assets/**/**/*.jade', '!assets/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(gulp.dest('./build/')) // Записываем собранные файлы
    gulp.src(['assets/**/**/*.styl', '!assets/**/**/_*.styl'])
        .pipe(stylus()) // собираем stylus
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
        .pipe(gulp.dest('./build/'))
});