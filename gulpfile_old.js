var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');

// CSS
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("app/sass/**/*.scss")
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});



// HTML
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('app/**/*.pug')
    .pipe(
      pug({pretty: true}).on('error', notify.onError(function (error) {
        return 'ERROR. \n' + error;
      }))
    )
    .pipe(gulp.dest("app"))
});



// JS
var babel = require('gulp-babel');

gulp.task('babel', function(){
  return gulp.src('app/babel/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    })).on('error', notify.onError(function (error) {
        return 'ERROR. \n' + error;
      }))
    .pipe(gulp.dest('app/js'));
});



// Static Server + watching scss/html/pug/js files
gulp.task('serve', ['sass', 'pug', 'babel'], function() {

  browserSync.init({
    server: "./app"
  });
  gulp.watch("app/babel/**/*.js", ['babel']);
  gulp.watch("app/sass/**/*.scss", ['sass']);
  gulp.watch("app/**/*.pug", ['pug']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});



gulp.task('default', ['serve']);