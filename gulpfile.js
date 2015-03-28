var gulp = require('gulp');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

var config = require('./config');

gulp.task('clean', function(cb) {
  del([
    './public/**',
  ], cb);
});

gulp.task('annotate', ['clean'], function() {
  return gulp.src('./client/app/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./public/app'));
});

gulp.task('vendor', ['annotate'], function() {
  return gulp.src(['./bower_components/**/*', '!./bower_components/midi-soundfonts-partial/**/*'])
    .pipe(gulp.dest('./public/vendor'))
});

gulp.task('css', ['vendor'], function() {
  return gulp.src('./client/app/**/*.css')
    .pipe(gulp.dest('./public/styles'))
});

gulp.task('templates', ['css'], function() {
  return gulp.src('./client/app/**/*.html')
    .pipe(gulp.dest('./public/templates'))
});

gulp.task('soundfonts', ['templates'], function() {
  return gulp.src([
    './bower_components/midi-soundfonts-partial/FluidR3_GM/acoustic_grand_piano-ogg.js',
    './bower_components/midi-soundfonts-partial/FluidR3_GM/synth_drum-ogg.js',
    './bower_components/midi-soundfonts-partial/FluidR3_GM/synth_drum_empty_notes-ogg.js'
    ])
    .pipe(gulp.dest('./public/soundfont'))
});

gulp.task('index', ['soundfonts'], function() {
  var target = gulp.src('./client/index.html');
  var appFiles = [
    './public/app/**/*.module.js',
    './public/app/**/*.js',
    './public/styles/**/*.css'
  ];
  var files = gulp.src(config.vendorFiles.concat(appFiles), {
    read: false
  });

  return target.pipe(inject(files, {
      ignorePath: 'public'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['index']);
