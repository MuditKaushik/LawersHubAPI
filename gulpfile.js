"use strict";
exports.__esModule = true;
var fs = require("fs");
var gulp = require("gulp");
var runSequence = require("run-sequence");
var swaggerSrcpath = './src/swagger.yaml';
var swaggerDestpath = './api/swagger';
var swaggerFile = swaggerDestpath + "/swagger.yaml";
function GenerateSwaggerFile() {
    if (!fs.existsSync(swaggerDestpath)) {
        fs.mkdirSync(swaggerDestpath);
    }
    gulp.src(swaggerSrcpath).pipe(gulp.dest(swaggerDestpath + "/"));
}
function CreateSwaggerBackup() {
    gulp.src(swaggerFile).pipe(gulp.dest('./src/'));
}
gulp.task('gen-swagger-file', GenerateSwaggerFile);
gulp.task('swagger-backup', CreateSwaggerBackup);
gulp.task('watcher', function () {
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerBackup);
});
gulp.task('default', function () {
    runSequence('gen-swagger-file', 'watcher');
});
