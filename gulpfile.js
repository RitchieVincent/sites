var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

var jsFiles = ['*.js', './public/js/**/*.js'],
    cssFiles = ['*.css', './public/css/**/*.css'],
    scssFiles = './public/sass/**/*.scss';

gulp.task('style', function () {

    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());

});

gulp.task('sass', function () {

    return gulp.src('./public/sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());

});

gulp.task('concat', function () {

    return gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'));

});

//gulp.task('sass:watch', function () {
//
//    gulp.watch(scssFiles, ['sass']);
//    gulp.watch('./public/css/**/*.css', ['concat']);
//
//});

gulp.task('inject', function () {

    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });

    var options = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/partials/head.ejs')
        .pipe(inject(injectSrc, options))
        .pipe(gulp.dest('./src/views/partials'));

});

gulp.task('serve', ['style', 'sass', 'concat', 'inject'], function () {

    var options = {

        script: 'app.js',
        delayTime: 1,
        env: {

            'PORT': 3000

        },
        watch: jsFiles

    };

    browserSync.init({

        proxy: 'localhost:3000'

    });

    gulp.watch(scssFiles, ['sass']);
    gulp.watch('./public/css/**/*.css', ['concat']);
    gulp.watch('./public/css/**/*.css').on('change', browserSync.reload);

    return nodemon(options)
        .on('restart', function (ev) {

            console.log('Restarting...');

        });

});

gulp.task('default', ['serve']);