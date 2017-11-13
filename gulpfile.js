const gulp   = require('gulp');
const babel  = require('gulp-babel');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


var paths = {
	scripts: 'src/*.js',
	output: 'dist/'
}

gulp.task('scripts', function(){
	return gulp.src(paths.scripts)
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest(paths.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.output))
});

gulp.task('lint', function(){
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

gulp.task('default', [
	'lint',
	'scripts'
]);