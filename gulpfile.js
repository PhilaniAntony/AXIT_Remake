//Create constants fo all packages and require them
const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      cache = require('gulp-cache'),
      cleancss =require('gulp-cleancss'),
      imagemin = require('gulp-imagemin'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat');
/************General Gulp plugins**************/

//Create a  browserSync task
gulp.task('browsersync', function (){
    browserSync.init({
        baseDir :'app'
    })
});

//Create an autoprefixer task
gulp.task('autoprefix', function(){
    return gulp.src('app/scc/**/*.scss')
               .pipe(autoprefixer())
               .pipe(gulp.dest('dist'))
});

//Create a cache task
gulp.task('cache', function (){
    return gulp.src('app/images/*')
            .pipe(cache())
            .pipe(gulp.dest('dist'))
});
//Create a plumber task
gulp.task('plumber', function (){
    return gulp.src('app/scss/**/*.scss')
               .pipe(plumber())
               .pipe(sass())
               .pipe(uglify())
               .pipe(cleancss())
               .pipe(plumber.stop())
               .pipe(gulp.dest('dist'))
               .pipe(browserSync.stream())
});
/******************** HTML  Related task**************** */
gulp.task('html', function (){
    return gulp.src('app/*.html')
               .pipe(gulp.dest('dist'))
               .pipe(browserSync.stream())
});
/******************** CSS  Related task**************** */
gulp.task('sass', function (){
    return gulp.src('app/scss/**/*.scss')
               .pipe(sass())
               .pipe(plumber())
               .pipe(gulp.dest('dist'))
               .pipe(browserSync.stream())
});

gulp.task('cleancss', function (){
    return gulp.src('app/scss/**/*.scss')
               .pipe(cleancss())
               .pipe(plumber())
               .pipe(gulp.dest('dist/sass'))
               .pipe(browserSync.stream())
});
gulp.task('uglify', function(){
    return gulp.src('app/scss/**/*.scss')
               .pipe(uglify())
               .pipe(plumber())
               .pipe(gulp.dest('dist'))
});
/****************Image Related task***********************/
//Create imagemin task
gulp.task('imagemin' , function(){
    return gulp.src('app/images/**/*')
               .pipe(cache(imagemin({optimizationLevel : 5})))
               .pipe(gulp.dest('dist'))
});
/****************JS Related Task***********************/
gulp.task('uglify',function(){
    return gulp.src('app/js/*.js')
    .pipe(uglify)
    .pipe(plumber)
    .pipe(gulp.dest('dist/js')) 
});
gulp.task('scripts', function() {
    return gulp.src('app/js/partials/*.js')
      .pipe(concat('all.js'))
      .pipe(plumber())
      .pipe(gulp.dest('.dist/'))
      .pipe(browserSync.stream())
  });

/****************Setting a watch task************* */
gulp.task('watch', function(){
    gulp.watch('app*.html',gulp.parallel['html'])
    gulp.watch('app/scss/**/*.scss', gulp.series['sass','autoprefixer','cleancss', 'uglify', 'plumber' ]);
    gulp.watch('app/images/*',gulp.series [ 'imagemin','cache']);
    gulp.watch('app/js/**/*.js', gulp.parallel['uglify', 'scripts']);

});


