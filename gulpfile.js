'use strict';

const gulp = require('gulp');
const gulpSimple = require('gulp-simple');
const runSequence = require('run-sequence');
const minimist = require('minimist');

const config = require('./gulp-config');

gulpSimple.prefix = 'source_';
gulpSimple.minify = minimist(process.argv.slice(2)).release;
gulpSimple.init(config);

gulp.task('default', callback => runSequence(
    'source_clean',
    'source_build',
    callback
));

gulp.task('watch', callback => runSequence(
    'source_clean',
    'source_build',
    'source_watch',
    callback
));