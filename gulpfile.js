'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    return browserify('./js/scripts.js')
        .bundle()
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
});

// serve
gulp.task('serve', function () {
    browserSync.init({
        injectChanges: true,
        server: './'
    });

    gulp.watch('./src/index.js').on('change', browserSync.reload);
    gulp.watch('./src/constants.js').on('change', browserSync.reload);
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./js/scripts.js', gulp.series('browserify')).on('change', browserSync.reload);
});

// default task
gulp.task('default', gulp.series('serve'));