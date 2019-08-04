const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/data/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES).pipe(gulp.dest('dist/data'));
});

gulp.task('watch', () => {
  console.log('includes: ', tsProject.config.include);
  gulp.watch('src/**/*.ts', gulp.series('scripts'));
  gulp.watch('src/data/**/*.json', gulp.series('assets'));
});

// gulp.task('default', ['watch', 'assets']);
