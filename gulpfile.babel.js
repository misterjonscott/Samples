'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import sassdoc from 'sassdoc';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import pump from 'pump';
import browserSync from 'browser-sync';

const dirs = {
    jsFolder: 'Scripts',
    sassFolder: 'scss',
    viewFolder: 'Views',
    dest: 'Content'
};

const sassPaths = {
    src: `${dirs.sassFolder}/**/*.scss`,
    dest: `${dirs.dest}/styles`
};

const jsPaths = {
    src: `${dirs.jsFolder}/*.js`,
    dest: `${dirs.dest}/scripts`
};

const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

const sassdocoptions = {
    dest: `${sassPaths.dest}/sassdoc`,
    display: {
        access: ['public', 'private'],
        alias: true
    }
};

gulp.task('styles', () => {
    return gulp.src(sassPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(sassPaths.dest))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('javascript', (cb) => {
    pump([
        // Exclude the _references file, but import the rest.
        gulp.src([jsPaths.src, '!'+dirs.jsFolder+'/_references.js']),
        sourcemaps.init(),
        concat('all.js'),
        gulp.dest(jsPaths.dest),
        uglify(),
        rename({ extname: '.min.js' }),
        sourcemaps.write('.'),
        gulp.dest(jsPaths.dest),
        browserSync.stream({ match: '**/*.js' })
    ], cb);
});

gulp.task('sassdoc', () => {
    return gulp.src(sassPaths.src)
        .pipe(sassdoc(sassdocoptions));
});

gulp.task('browsersync', () => {
    browserSync.init({
        proxy: "http://localhost:50527/Account/Login?GUID=719700001",
        port: 3030
    });
    gulp.watch(`${dirs.viewFolder}/**/*.cshtml`).on("change", browserSync.reload);
});

gulp.task('watchcss', () => {
    return gulp
        .watch(sassPaths.src, ['styles'])
        .on('change', (event) => {
            console.log('Style ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('watchjs', () => {
    return gulp
        .watch(jsPaths.src, ['javascript'])
        .on('change', (event) => {
            console.log('Script ' + event.path + ' was ' + event.type + ', running tasks...');
        })
});

gulp.task('prodbuild', ['styles', 'javascript']);

gulp.task('live', ['browsersync', 'styles', 'javascript', 'watchjs', 'watchcss']);

gulp.task('default', ['styles', 'javascript', 'watchjs', 'watchcss']);
