// npm i gulpjs/gulp#4.0 gulp-if gulp-pug emitty browser-sync gulp-notify gulp-sass gulp-sass-glob gulp-autoprefixer gulp-babel
const gulp = require('gulp');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const emitty = require('emitty').setup('app', 'pug');

const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');

// CSS
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');

// JS
const babel = require('gulp-babel');

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

gulp.task('templates', () =>
	gulp.src('app/**/*.pug')
		.pipe(gulpif(global.watch, emitty.stream(global.emittyChangedFile)))
		.pipe(
			pug({ pretty: true }).on('error', notify.onError(function (error) {
        return 'ERROR. \n' + error;
      }))
		)
		.pipe(gulp.dest('app'))
);

gulp.task('babel', function(){
  return gulp.src('app/babel/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    })).on('error', notify.onError(function (error) {
        return 'ERROR. \n' + error;
      }))
    .pipe(gulp.dest('app/js'));
});


// Your "watch" task
gulp.task('watch', () => {
	// Shows that run "watch" mode
	global.watch = true;

	browserSync.init({
    server: "./app"
  });

	gulp.watch('app/**/*.pug', gulp.series('templates'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});

	gulp.watch("app/babel/**/*.js", gulp.series('babel'));
  gulp.watch("app/sass/**/*.scss", gulp.series('sass'));
  gulp.watch("app/*.html").on('all', browserSync.reload);

});

gulp.task('default', gulp.series('watch'));