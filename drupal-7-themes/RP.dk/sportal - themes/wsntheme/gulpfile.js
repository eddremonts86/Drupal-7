var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , sass = require('gulp-sass')
  , sass_sourcemaps = require('gulp-sourcemaps')
  , minifycss = require('gulp-minify-css')
  , autoprefixer = require('gulp-autoprefixer')
  , rename = require('gulp-rename')
  , notify = require('gulp-notify')
  , jade = require('gulp-jade')
  , browserSync = require('browser-sync').create()
;






/**
 * templates
 */
gulp.task('templates', function() {
  gulp.src('src/templates/*.jade')
    .pipe(jade({
                  pretty: true
                }
              ).on('error', function(err) {
                 console.log('Jade error templates');
                 console.log(err);
                  return notify().write(err);
                }
              )
    )
    .pipe(gulp.dest('./'));
});


/**
 * css
 */
var sass_input = 'src/css/styles.scss';
var sass_output = 'css/';
var sassOptions = {
  errLogToConsole: true,
  sourcemap: true,
  outputStyle: 'expanded'
};

gulp.task('css',function(){
    console.error('css');
    gulp.src(sass_input)
        .pipe(sass_sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass(sassOptions))
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function(error) {
            console.error(error);
            //this.emit('end');
            return notify().write(error);
        })
        .pipe(autoprefixer({
          browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari > 8',
                        'IE > 9',
                    ],
          cascade: false
        }))
        .pipe(sass_sourcemaps.write('./maps'))
        .pipe(gulp.dest(sass_output))
        .pipe(browserSync.stream())
        .on('change', browserSync.reload)
      ;
        
    
});


/**
 * la tarea por defecto que sea el total de ellas
 */
gulp.task('default', [ 'css','templates']);

// Watch
gulp.task('watch', function() {
    // browser sync
    browserSync.init({
          scrollRestoreTechnique: 'cookie',
          server: {
            baseDir: "./"
          }
    });
    
    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['css']);


    // Watch templates files
     gulp.watch('src/templates/*.jade', function(event) {
      console.log(event);
      compileAndRefresh(event.path);
    });
    gulp.watch('src/templates/**/*.jade', function(event) {
      console.log(event);
      console.log('pruebas');
      allMainTemplateCompileAndRfresh();
    });


});


function compileAndRefresh(file) {
  gulp.src(file)
    .pipe(jade({
                  pretty: true
                }
              ).on('error', function(err) {
                console.log('Jade error compileAndRefresh');
                 console.log(err);
                  return notify().write(err);
                }
              )
    )
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
    .on('change', browserSync.reload)
    ;
}

function allMainTemplateCompileAndRfresh(){
  console.log('allMainTemplateCompileAndRfresh');
  gulp.src('src/templates/*.jade')
    .pipe(jade({
                  pretty: true
                }
              ).on('error', function(err) {
                console.log('Jade error allMainTemplateCompileAndRfresh');
                 console.log(err);
                 return notify().write(err);
                }
              )
    )
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
    .on('change', browserSync.reload)
    ;
}