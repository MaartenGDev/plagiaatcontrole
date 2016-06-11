var gulp = require('gulp');
var rollup = require('gulp-rollup');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('watch',function(){
	console.log('trigger');
    gulp.watch(['src/*.js'],['bundle'])
});


gulp.task('bundle', function(){
	gulp.src('src/app.js')
		.pipe(rollup())
       		.pipe(babel())	
       		.pipe(concat('app.js'))	
		.pipe(gulp.dest('dist'));
});
