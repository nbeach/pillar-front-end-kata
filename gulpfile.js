const gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    join = require('path').join;

const outputPath = "dist";
const sourcePath = "src";


gulp.task("clean", () => del(join(outputPath, "*")));

gulp.task("template", () => gulp
    .src(join(sourcePath, "index.pug"))
    .pipe(pug({}))
    .pipe(gulp.dest(outputPath))
);

gulp.task("style", () => gulp
    .src(join(sourcePath, "style/style.less"))
    .pipe(less())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(outputPath))
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(outputPath))
);

gulp.task("image", () => gulp
    .src(join(sourcePath, "image/**/*"))
    .pipe(gulp.dest(join(outputPath, "/image")))
);

gulp.task("font", () => gulp
    .src([join(sourcePath, "font/**/*"), "node_modules/bootstrap/dist/fonts/**/*"])
    .pipe(gulp.dest(join(outputPath, "font")))
);


gulp.task("default", ["template", "style", "image", "font"]);

gulp.task('watch', ['default'], () => {
    gulp.watch(join(sourcePath, "**/*.pug"),   ["template"]);
    gulp.watch(join(sourcePath, "**/*.less"),  ["style"]);
    gulp.watch(join(sourcePath, "image/**/*"), ["image"]);
    gulp.watch(join(sourcePath, "font/**/*"),  ["font"]);
});


