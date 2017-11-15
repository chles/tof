const gulp   = require('gulp');
const babel  = require('gulp-babel');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const Server = require('karma').Server;


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


gulp.task('tests', function(done){
	new Server({
		configFile: __dirname + '/karma.conf.js',
		// Override any value of karma.conf.js
		//singleRun: true
	}, done).start();
});


gulp.task('default', [
	'lint',
	'scripts'
]);