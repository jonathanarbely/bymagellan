'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

var autoprefixerOptions = {
    browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
};

gulp.task('hello', function () {
    console.log('Hello Gulp!')
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/assets/stylesheets/**/*.sass', ['sass']);
    gulp.watch('app/assets/images/pixel/**/*.png', ['copyPNG']);
    gulp.watch('app/assets/images/pixel/**/*.jpg', ['copyJPG']);
    gulp.watch('app/assets/images/vector/**/*.svg', ['copySVG']);
    gulp.watch('app/assets/fonts/**/*', ['copyFonts']);
    gulp.watch('app/assets/javascript/**/*', ['copyJS']);
    gulp.watch('app/assets/plugins/**/*', ['copyPlugins']);
    gulp.watch('app/assets/files/**/*', ['copyFiles']);
});

gulp.task('pug', function() {
    gulp.src('app/**/!(_)*.pug')
        .pipe(pug({
            pretty: true,
            basedir: __dirname + '/app'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp
    .src('app/assets/stylesheets/**/*.sass')
    .pipe(maps.init())
    .pipe(sass({}).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/assets/stylesheets'));
});

gulp.task('buildsass', function () {
  return gulp
    .src('app/assets/stylesheets/**/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('dist/assets/stylesheets'));
});

gulp.task('clean-folders', function () {
    return gulp.src('dist/*/*', {read: false})
        .pipe(clean());
});

gulp.task('clean-html', function () {
    return gulp.src('dist/*.html', {read: false})
        .pipe(clean());
});

gulp.task('clean-js', function () {
    return gulp.src('dist/*.js*', {read: false})
        .pipe(clean());
});

gulp.task('clean', ['clean-folders','clean-html','clean-js'], function () {
    console.log('Successfully cleaned dist.');
});

gulp.task('copyfonts', function () {
    gulp.src(['app/assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copyPNG', function () {
    gulp.src(['app/assets/images/pixel/**/!(_)*.png']).pipe(gulp.dest('dist/assets/images/pixel'));
});

gulp.task('copyJPG', function () {
    gulp.src(['app/assets/images/pixel/**/!(_)*.jpg']).pipe(gulp.dest('dist/assets/images/pixel'));
});

gulp.task('copyICO', function () {
    gulp.src(['app/assets/images/pixel/**/!(_)*.ico']).pipe(gulp.dest('dist/assets/images/pixel'));
});

gulp.task('copySVG', function () {
    gulp.src(['app/assets/images/vector/**/!(_)*.svg']).pipe(gulp.dest('dist/assets/images/vector'));
});

gulp.task('copyFonts', function () {
    gulp.src(['app/assets/fonts/**/*']).pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copyJS', function () {
    gulp.src(['app/assets/javascript/**/!(_)*.js']).pipe(gulp.dest('dist/assets/javascript'));
});

gulp.task('copySW', function () {
    gulp.src(['app/worker.js']).pipe(gulp.dest('dist/'));
});

gulp.task('copyManifest', function () {
    gulp.src(['app/manifest.json']).pipe(gulp.dest('dist/'));
});

gulp.task('copyPlugins', function () {
    gulp.src(['app/assets/plugins/**/*']).pipe(gulp.dest('dist/assets/plugins'));
});

gulp.task('copyFiles', function () {
    gulp.src(['app/assets/files/**/*']).pipe(gulp.dest('dist/assets/files'));
});

gulp.task('c', function() {
  connect.server({
    root: 'dist',
    livereload: false
  });
});

gulp.task('compress', function() {
  gulp.src('app/assets/javascript/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist/assets/javascript/'))
});

// [] are dependencies which are run before the actual task
// if a task returns something, it can be used in the next task
gulp.task('default', ['c','pug','sass','copyfonts','copyPNG','copyJPG','copySVG','copyICO','copyFonts','copyJS','copyPlugins','copyFiles','watch'], function () {
    console.log('Development env. engaged! 〽️');
});

gulp.task('build', ['pug','copyfonts','copyPNG','copyJPG','copySVG','copyICO','copyFonts','copyJS','copyPlugins','copyFiles','compress', 'buildsass', 'copySW', 'copyManifest'], function () {
    console.log('Successfully finished build! Ready to set sail. ⚓');
});

// Start Localtunnel:
// lt --port 8080