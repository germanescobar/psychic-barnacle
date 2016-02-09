var gulp = require('gulp')
    connect = require('gulp-connect')
    sass = require('gulp-ruby-sass')
    concat = require('gulp-concat')

gulp.task('webserver', ['views', 'js', 'sass'], function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('views', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('dist/'));

  gulp.src('./app/views/*.html')
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('js', function() {
  return gulp.src('./app/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('icons', function() {
  return gulp.src('./node_modules/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('./dist/css/fonts/'));
});

gulp.task('sass', ['icons'], function () {
  return sass('./app/sass/style.scss', {
    loadPath: ['./node_modules/bootstrap-sass/assets/stylesheets/']
  }).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['views']);
  gulp.watch(['app/views/*.html'], ['views']);
  gulp.watch(['app/js/*.js'], ['js']);
  gulp.watch(['app/sass/*.scss'], ['sass']);
});
 
gulp.task('default', ['webserver', 'watch']);