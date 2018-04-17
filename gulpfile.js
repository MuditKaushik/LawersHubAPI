"use strict";
exports.__esModule = true;
var fs = require("fs");
var gulp = require("gulp");
var runSequence = require("run-sequence");
var swaggerSrcpath = './api/swagger/swagger.yaml';
var swaggerDestpath = './dist/swagger/';
function Swagger() {
    if (!fs.existsSync(swaggerDestpath)) {
        fs.mkdirSync(swaggerDestpath);
    }
    gulp.src(swaggerSrcpath).pipe(gulp.dest(swaggerDestpath + "/"));
}
function SwaggerChange() {
    gulp.src(swaggerSrcpath).pipe(gulp.dest(swaggerDestpath + "/"));
}
gulp.task('swagger', Swagger);
gulp.task('swaggerChange', SwaggerChange);
gulp.task('watcher', function () {
    gulp.watch(swaggerSrcpath, SwaggerChange);
});
gulp.task('build', function () {
    runSequence(['swagger']);
});
gulp.task('default', function () {
    runSequence(['swagger', 'swaggerChange', 'watcher']);
});
