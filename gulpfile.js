var gulp = require('gulp');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

gulp.task('clean', function (cb) {
  del([
    './public/**',
  ], cb);
});

gulp.task('annotate', ['clean'], function () {
  return gulp.src('./client/app/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./public/app'));
});

gulp.task('vendor', ['annotate'], function() {
  return gulp.src('./bower_components/**/*')
    .pipe(gulp.dest('./public/vendor'))
});

gulp.task('css', ['vendor'], function () {
  return gulp.src('./client/app/**/*.css')
    .pipe(gulp.dest('./public/styles'))
});

gulp.task('templates', ['css'], function () {
  return gulp.src('./client/app/**/*.html')
    .pipe(gulp.dest('./public/templates'))
});

gulp.task('index', ['templates'], function () {
  var target = gulp.src('./client/index.html');
  var vendorFiles = [
    './public/vendor/angular/angular.min.js',
    './public/vendor/lodash/lodash.min.js'
  ];
  var appFiles = [
    './public/app/**/*.module.js',
    './public/app/**/*.js',
    './public/styles/**/*.css'
  ];
  var files = gulp.src(vendorFiles.concat(appFiles), {read: false});

  return target.pipe(inject(files, {ignorePath: 'public'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('default',  ['index']);
