const { src, dest } = require('gulp');
const { parallel } = require('gulp');
const { watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });
  watch('src/sass/**/*.scss', buildSass);
  watch('src/pages/**/*.pug', buildPug);
  watch('src/images/**/*', destImages);
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('src/sass/*.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildPug = () => {
    console.log('Компиляция Pug');
  
    return src('src/pages/*.pug')
      .pipe(pug({ pretty: true }))
      .pipe(dest('build/'))
      .pipe(browserSync.stream());
}

const destImages = () => {
  return src('src/images/**/*')
    .pipe(dest('build/images'));
}

const destJs = () => {
  return src('src/bootstrap/dist/js/bootstrap.min.js')
    .pipe(dest('build/js/'));
}

exports.server = browserSyncJob;
exports.build = parallel(buildSass, buildPug, destImages, destJs);