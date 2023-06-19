// Gulpfile

const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('app/sass/**/*.scss', sassCompile);
  watch('app/pages/**/*.pug', pugCompile);
};

const sassCompile = (done) => {
  console.log('Compile SASS to CSS');

  return src('app/sass/app.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
};

const pugCompile = (done) => {
  console.log('Compile Pug to HTML');

  return src('app/pages/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
};

exports.default = series(sassCompile, pugCompile);
exports.server = browserSyncJob;