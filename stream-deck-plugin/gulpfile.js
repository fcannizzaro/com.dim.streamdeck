const gulp = require('gulp');
const { series } = require('gulp');
const merge = require('merge-stream');
const fs = require('fs');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const shell = require('gulp-shell');

gulp.task('buildPropertyInspector', shell.task('cd property-inspector && pnpm build'));

gulp.task('buildPlugin', shell.task('pnpm build'));

function prepareZipRelease() {
  const manifest = gulp
    .src('./plugin/manifest.json')
    .pipe(gulp.dest('./plugin-release/manifest.json'));
  const pi = gulp.src('./plugin/pi/**/*').pipe(gulp.dest('./plugin-release/pi'));
  const icons = gulp.src('./plugin/icons/**/*').pipe(gulp.dest('./plugin-release/icons'));
  const images = gulp.src('./images/**/*').pipe(gulp.dest('./plugin-release/images'));
  const app = gulp.src('./build/**/*').pipe(gulp.dest('./plugin-release/app'));
  return merge(manifest, pi, icons, images, app);
}

function cleanup() {
  return gulp.src(['build', 'plugin-release'], { read: false }).pipe(clean());
}

function addPackageJSON(cb) {
  fs.writeFileSync(
    './plugin-release/app/package.json',
    JSON.stringify({
      name: 'app',
      version: '1.0.0',
      main: 'index.js',
      author: 'Francesco Saverio Cannizzaro',
    }),
  );
  cb();
}

function zipRelease() {
  return gulp.src('./plugin-release/**').pipe(zip('release.zip')).pipe(gulp.dest('./'));
}

exports.default = series(
  'buildPropertyInspector',
  'buildPlugin',
  prepareZipRelease,
  addPackageJSON,
  zipRelease,
  cleanup,
);
