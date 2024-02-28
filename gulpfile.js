
// Explanation for Students ---- This is requires the gulp package from node modules
// Gulp exports an object with many methods
// task , watch, src and pipe will be the main ones we use today but see the gulp docs to expand and also see how you might refactor it to no longer use task and maybe use exports, series and parallells
// i don't use them here because they are more magic and make it harder to show what's happening
const gulp = require('gulp');

// Use Nodemon programatically
const nodemon = require('gulp-nodemon-pro');

// Explanation for Students ---- This is the mastermind that will open up our code in a browser window
const browserSync = require('browser-sync').create();

// Explanation for Students ---- This is a browserSync method that reloads the page we wangt whenever we make a change to have the page reload
const reload = browserSync.reload;

// Explanation for Students ---- This is a NODEJS standard method that lets us call scripts in our package.json or node_modules from our code
var exec = require('child_process').exec;


// Explanation for Students ---- This is the brain child for our self made development server

gulp.task('default', (cb) => {
	// Compile REACT
	exec('npm run dev:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
	// SERVE BACKEND
	nodemon({
	 script: 'server.js',
	 env: { 'NODE_ENV': 'development'}
 });
 // SERVE  FRONT END WITH PROXY TO BACKEND
	browserSync.init({
	 proxy: {
		 target: 'http://localhost:8000',
		 ws: true
	 },
	 serveStatic: ['./public']
	});
	// SET UP WATCJERS TO LISTEN TO CHANGES IN FILES
	gulp.watch(['./src/*','./src/**/*.js','./src/components/**/**/*', './src/pages/**/**/*'], gulp.task('js-watch')).on('change', reload);;
	// LISTEN FOR WHEN TO RELOAD PAGES
	gulp
		.watch([
			'./public/js/**/.#*js',
			'./public/index.html'
		])
		.on('change', reload);
		cb()
});



// Explanation for Students ---- This is for the development build
gulp.task('webpack', cb => {
	exec('npm run dev:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

// Explanation for Students ---- This is for the production build
gulp.task('build', cb => {
	exec('npm run build:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('js-watch', gulp.task('webpack'), function (done) {
    reload();
    done();
});

