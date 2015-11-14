var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

gulp.task('styles', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass({
      includePaths: ['./scss'],
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(rename({
      basename: 'styles',
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function() {
  gulp.watch('scss/**/*.scss', ['styles']);
});
