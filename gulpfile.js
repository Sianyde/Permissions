const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');


var devMode = false;


gulp.watch(styles, ['css']);
gulp.watch(scripts, ['js']);

gulp.task('css', function(){
   gulp.src(styles)
       .pipe(sass.sync().on('error', sass.logError))
       .pipe(concat('main.css'))
       .pipe(gulp.dest('./dist/css'))
       .pipe(browserSync.reload({
           stream: true
       }))
});

gulp.task('js', function(){
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function(){
    gulp.src('./src/templates/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('json', function(){
    gulp.src('./src/json/**/*.json')
        .pipe(gulp.dest('./dist/json'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('build', function(){
   gulp.start(['css', 'js', 'html', 'json']);
});

gulp.task('browser-sync', function(){
   browserSync.init(null, {
       open: false,
       server: {
           baseDir: 'dist'
       }
   });
});

gulp.task('default', function(){
   devMode = true;
   gulp.start(['build', 'browser-sync']);
   gulp.watch(['./src/css/**/*.css'], ['css']);
   gulp.watch(['./src/css/**/*.js'], ['js']);
   gulp.watch(['./src/templates/**/*.html'], ['html']);
   gulp.watch(['./src/json/**/*.json'], ['json']);
});
