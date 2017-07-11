const gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    _ = require("lodash"),
    join = require('path').join;

const outputPath = "dist";
const sourcePath = "src";

const tasks = [
    {
        name: "clean",
        path: join(outputPath, "*"),
        steps: path => () => del(path)
    },
    {
        name: "template",
        path: join(sourcePath, "index.pug"),
        steps: path => () => gulp.src(path)
            .pipe(pug({}))
            .pipe(gulp.dest(outputPath))
    },
    {
        name: "style",
        path: join(sourcePath, "style/style.less"),
        steps: path => () => gulp.src(path)
            .pipe(less())
            .pipe(rename('style.css'))
            .pipe(gulp.dest(outputPath))
            .pipe(rename('style.min.css'))
            .pipe(sourcemaps.init())
            .pipe(cssmin())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(outputPath))
    },
    {
        name: "image",
        path: [join(sourcePath, 'images/**/*')],
        steps: path => () => gulp.src(path)
            .pipe(gulp.dest(join(outputPath, '/images')))
    },
    {
        name: "font",
        path: [join(sourcePath, 'font/**/*'), 'node_modules/bootstrap/dist/fonts/**/*'],
        steps: path => () => gulp.src(path)
            .pipe(gulp.dest(join(outputPath, 'font')))
    },
];

tasks.forEach(task => gulp.task(task.name, task.steps(task.path)));

gulp.task('watch', () => tasks
    .filter(task => task.name !== "clean")
    .forEach(task => gulp.watch(task.path, [task.name])));

gulp.task('default', _.chain(tasks)
    .map(task => task.name)
    .filter(name => name !== "clean")
    .value());






