// npm i gulpjs/gulp#4.0 browser-sync gulp-sass gulp-sass-glob gulp-autoprefixer
const gulp                  = require('gulp');
const install               = require("gulp-install");
const browserSync           = require('browser-sync').create();
const del                   = require('del');
// CSS
const sass                  = require('gulp-sass');
const sassGlob              = require('gulp-sass-glob');
const autoprefixer          = require('gulp-autoprefixer');

// Installing all packages in package.json;
gulp.src(['./package.json'])
  .pipe(install())

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
  gulp.src("app/sass/**/*.scss")
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream())
);


// Your "watch" task
gulp.task('watch', () => {

	browserSync.init({
    server: "./app"
  });

  gulp.watch("app/sass/**/*.scss", gulp.series('sass'));
  gulp.watch("app/*.html").on('all', browserSync.reload);

});

// clean task
gulp.task('clean', () => del.sync('dest') );

// copyFiles
// gulp.task('copyFiles', () => {
//   gulp.src('app/css/**/*.css')
//     .pipe(gulp.dest('dest/css'))

//   gulp.src('app/img/**/*')
//     .pipe(gulp.dest('dest/img'))

//   gulp.src('app/*.html')
//     .pipe(gulp.dest('dest'))

//   gulp.src('app/js/**/*')
//     .pipe(gulp.dest('dest/js'))
// });

gulp.task('build', gulp.series('sass'), function(){
  gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dest/css'))

  gulp.src('app/img/**/*')
    .pipe(gulp.dest('dest/img'))

  gulp.src('app/*.html')
    .pipe(gulp.dest('dest'))

  gulp.src('app/js/**/*')
    .pipe(gulp.dest('dest/js'))
});

gulp.task('default', gulp.series('watch'));