var gulp = require('gulp');
var series = require('stream-series');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var del = require('del');

var config = require('./config');

gulp.task('clean', function(cb) {
  del([
    'public/app/**/*',
    'public/styles/**/*',
    'public/templates/**/*',
    'public/vendor/**/*',
    'public/index.html'
  ], cb);
});

gulp.task('annotate', ['clean'], function() {
  return gulp.src('./client/app/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./public/app'));
});

gulp.task('vendor', ['annotate'], function() {
  return gulp.src(['./bower_components/**/*', '!./bower_components/midi-soundfonts-partial/**/*'])
    .pipe(gulp.dest('./public/vendor'));
});

gulp.task('css', ['vendor'], function() {
  return gulp.src('./client/app/**/*.css')
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('templates', ['css'], function() {
  return gulp.src('./client/app/**/*.html')
    .pipe(gulp.dest('./public/templates'));
});

gulp.task('soundfonts', function() {
  return gulp.src(config.soundfonts)
    .pipe(gulp.dest('./public/soundfont'));
});

gulp.task('index', ['templates'], function() {
  var target = gulp.src('./client/index.html');
  var appJsFiles = gulp.src([
    './public/app/**/*.module.js',
    './public/app/**/*.js'
  ]).pipe(angularFilesort());
  var appCssFiles = gulp.src('./public/styles/**/*.css');
  var vendorFiles = gulp.src(config.vendorFiles);

  var files = series(vendorFiles, appJsFiles, appCssFiles);

  return target.pipe(inject(files, {
      ignorePath: 'public'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('full', ['soundfonts', 'index']);

gulp.task('default', ['index']);
