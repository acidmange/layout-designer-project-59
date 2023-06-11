// Gulpfile

const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');

const sassCompile = (done) => {
  console.log('Compile SASS to CSS');

  return src('app/sass/app.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'));
};

const pugCompile = (done) => {
  console.log('Compile Pug to HTML');

  return src('app/pages/*.pug')
    .pipe(pug())
    .pipe(dest('build/'));
};

exports.default = series(sassCompile, pugCompile);