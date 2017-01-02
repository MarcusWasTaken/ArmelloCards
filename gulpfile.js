'use strict'



////////////////////////
// INIT
////////////////////////

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')
const fs = require('fs')

const webpack = require("webpack")
const webpackDevConfig = require("./webpack.dev.config.js")
const webpackDistConfig = require("./webpack.dist.config.js")

const browserSync = require('browser-sync')
const reload = browserSync.reload
const FAVICON_DATA_FILE = 'faviconData.json'



////////////////////////
// UTILITIES
////////////////////////

gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

gulp.task('default', ['clean'], () => {
  gulp.start('build:dist')
})



////////////////////////
// DEVELOPMENT
////////////////////////

const devCompiler = webpack(webpackDevConfig)

gulp.task('build:dev', (callback) => {
  devCompiler.run(function(err, stats) {
		if(err) throw new $.util.PluginError("webpack:build", err)
    callback()
	})
})

gulp.task('serve', ['build:dev'], () => {
  browserSync({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['.tmp', 'src']
    }
  })
  gulp.watch(['src/**/*.*', 'src/**/**/*.*'], ['build:dev', reload])
})



////////////////////////
// DISTRIBUTION
////////////////////////

gulp.task('html', ['generate-favicon'], () => {
  return gulp.src('src/index.html')
    .pipe($.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('extras', () => {
  return gulp.src([
    'src/*.*',
    '!src/index.html',
    '!src/favicon.*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
})

gulp.task('images', () => {
	return gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
})

gulp.task('generate-favicon', function(done) {
	$.realFavicon.generateFavicon({
		masterPicture: 'src/favicon.png',
		dest: 'dist',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '14%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#2d89ef',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'Cardviewer',
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			compression: 5,
			scalingAlgorithm: 'Lanczos',
			errorOnImageTooSmall: false
		},
		versioning: {
			paramName: 'v',
			paramValue: 'BGByna36Gl'
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done()
	})
})

gulp.task('build:dist', ['html', 'extras', 'images'], (callback) => {
  webpack(webpackDistConfig, function(err, stats) {
		if(err) throw new $.util.PluginError("webpack:build", err)
    callback()
	})
})

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 3000,
    server: {
      baseDir: ['dist']
    }
  })
})