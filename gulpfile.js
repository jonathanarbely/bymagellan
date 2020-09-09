/* jslint node: true */
'use strict';

// Required packages (dev-dependencies)
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

// Test task
gulp.task('hello', function (done) {
    console.log('Hello Gulp!');
    done();
});

// Watch for changes while developing
gulp.task('watch', gulp.series(function (done) {
    gulp.watch('app/**/*.pug', gulp.series('pug'));
    gulp.watch('app/assets/stylesheets/**/*.sass', gulp.series('sass'));
    gulp.watch('app/assets/images/pixel/**/*.png', gulp.series('copyPNG'));
    gulp.watch('app/assets/images/pixel/**/*.jpg', gulp.series('copyJPG'));
    gulp.watch('app/assets/images/vector/**/*.svg', gulp.series('copySVG'));
    gulp.watch('app/assets/fonts/**/*', gulp.series('copyFonts'));
    gulp.watch('app/assets/javascript/**/*', gulp.series('copyJS'));
    gulp.watch('app/assets/plugins/**/*', gulp.series('copyPlugins'));
    gulp.watch('app/assets/files/**/*', gulp.series('copyFiles'));
    done();
}));

// Pug -> HTML
gulp.task('pug', gulp.series(function (done) {
    gulp.src('app/**/!(_)*.pug')
        .pipe(pug({
            pretty: true,
            basedir: './app'
        }))
        .pipe(gulp.dest('./dist/'));
    done();
}));

// SASS -> CSS (w/ css-maps)
gulp.task('sass', gulp.series(function () {
    return gulp
        .src('app/assets/stylesheets/**/*.sass')
        .pipe(maps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/assets/stylesheets'));
}));

// SASS -> CSS (minified)
gulp.task('buildsass', gulp.series(function () {
    return gulp
        .src('app/assets/stylesheets/**/*.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/assets/stylesheets'));
}));

// Clean /dist
gulp.task('clean-folders', gulp.series(function () {
    return gulp.src('dist/*/*', {
            read: false
        })
        .pipe(clean());
}));
gulp.task('clean-html', gulp.series(function () {
    return gulp.src('dist/*.html', {
            read: false
        })
        .pipe(clean());
}));
gulp.task('clean-js', gulp.series(function () {
    return gulp.src('dist/*.js*', {
            read: false
        })
        .pipe(clean());
}));
gulp.task('clean', gulp.series('clean-folders', 'clean-html', 'clean-js', function (done) {
    console.log('Successfully cleaned dist.');
    done();
}));

// Copy Assets
gulp.task('copyFonts', gulp.series(function (done) {
    gulp.src(['app/assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts'));
    done();
}));
gulp.task('copyPNG', gulp.series(function (done) {
    gulp.src(['app/assets/images/pixel/**/!(_)*.png']).pipe(gulp.dest('dist/assets/images/pixel'));
    done();
}));
gulp.task('copyJPG', gulp.series(function (done) {
    gulp.src(['app/assets/images/pixel/**/!(_)*.jpg']).pipe(gulp.dest('dist/assets/images/pixel'));
    done();
}));
gulp.task('copyICO', gulp.series(function (done) {
    gulp.src(['app/assets/images/pixel/**/!(_)*.ico']).pipe(gulp.dest('dist/assets/images/pixel'));
    done();
}));
gulp.task('copySVG', gulp.series(function (done) {
    gulp.src(['app/assets/images/vector/**/!(_)*.svg']).pipe(gulp.dest('dist/assets/images/vector'));
    done();
}));
gulp.task('copyJS', gulp.series(function (done) {
    gulp.src(['app/assets/javascript/**/!(_)*.js']).pipe(gulp.dest('dist/assets/javascript'));
    done();
}));
gulp.task('copySW', gulp.series(function (done) {
    gulp.src(['app/worker.js']).pipe(gulp.dest('dist/'));
    done();
}));
gulp.task('copyManifest', gulp.series(function (done) {
    gulp.src(['app/manifest.json']).pipe(gulp.dest('dist/'));
    done();
}));
gulp.task('copyPlugins', gulp.series(function (done) {
    gulp.src(['app/assets/plugins/**/*']).pipe(gulp.dest('dist/assets/plugins'));
    done();
}));
gulp.task('copyFiles', gulp.series(function (done) {
    gulp.src(['app/assets/files/**/*']).pipe(gulp.dest('dist/assets/files'));
    done();
}));

// Start local server
// https://github.com/avevlad/gulp-connect/issues/225
gulp.task('c', gulp.series(function (done) {
    connect.server({
        root: 'dist',
        livereload: false,
        fallback: 'dist/fallback.html'
    });
    done();
}));

// Compress .js files
gulp.task('compress', gulp.series(function (done) {
    gulp.src('app/assets/javascript/*.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/assets/javascript/'));
    done();
}));

// Default build for active development w/ localhost:8080
gulp.task('default', gulp.series('pug', 'sass', 'copyFonts', 'copyPNG', 'copyJPG', 'copySVG', 'copyICO', 'copyFonts', 'copyJS', 'copyPlugins', 'copyFiles', 'watch', 'c', function (done) {
    console.log('Development environment engaged! 〽️');
    done();
}));

// Build task for production
gulp.task('build', gulp.parallel('pug', 'copyFonts', 'copyPNG', 'copyJPG', 'copySVG', 'copyICO', 'copyFonts', 'copyJS', 'copyPlugins', 'copyFiles', 'compress', 'buildsass', 'copySW', 'copyManifest', function (done) {
    console.log('Successfully finished build! Ready to set sail. ⚓');
    done();
}));