"use strict";

var babelify    = require('babelify');
var browserify  = require('browserify');
var gulp        = require('gulp');
var riotify     = require('riotify');
var source      = require('vinyl-source-stream');

var production = (process.env.NODE_ENV === 'production'); console.log(production);

gulp.task('default', ['bundle-client-files']);

gulp.task('bundle-client-files', ['bundle-frontend', 'bundle-backend']);

gulp.task('bundle-frontend', function() {
  return browserify({
      debug: !production,
      entries: ['client/frontend.js'],
      transform: [
        [babelify],
        [riotify, {"type": "es6"}]
      ]
    })
    .bundle()
    .pipe(source('frontend.js'))
    .pipe(gulp.dest('public/js'))
  ;
});

gulp.task('bundle-backend', function() {
  return browserify({
      debug: !production,
      entries: ['client/backend.js'],
      transform: [
        [babelify],
        [riotify, {"type": "es6"}]
      ]
    })
    .bundle()
    .pipe(source('backend.js'))
    .pipe(gulp.dest('public/js'))
  ;
});

gulp.task('watch', function() {
  gulp.watch('shared/components/*', ['bundle-client-files']);
});
