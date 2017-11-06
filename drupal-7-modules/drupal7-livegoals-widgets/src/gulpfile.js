var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');
var svgmin = require('gulp-svgmin');

gulp.task('svgs', function () {
    return gulp.src('**/*.svg')
          .pipe(svgmin())
          .pipe(gulp.dest('../build'));
});


gulp.task('styles', function () {
  return gulp.src('main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../build'))
    .pipe(livereload());
});


var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

function compile(watch) {
  var bundler = watchify(browserify('./main.jsx', { 
    debug: true,
//    fullPaths: true,
    paths: ['node_modules','.'] 
  }).transform(babelify, {
    presets: ["es2015", "react"],
    plugins: ["syntax-flow"]
  }));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
//        .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('../build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('buildScripts', function() { return compile(); });
gulp.task('watchScripts', function() { return watch(); });


gulp.task('apply-prod-environment', function() {
    process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = 'production';
    if (process.env.NODE_ENV != 'production') {
        throw new Error("Failed to set NODE_ENV to production!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to production" + "\n");
    }
});


gulp.task('watch', function() {
  livereload.listen();
  /*
  gulp.watch('*.jsx', ['scripts']);
  */
  gulp.watch('../build/*.js', function (files) {
    livereload.changed(files)
  });
  gulp.watch('assets/*.svg', ['svgs']);
  gulp.watch('**/*.scss', ['styles']);
  gulp.watch('../build/*.css', function (files) {
    livereload.changed(files)
  });
});
gulp.task('default', [
//  'apply-prod-environment',
  'watch', 
  'watchScripts', 
  'styles','svgs']);




