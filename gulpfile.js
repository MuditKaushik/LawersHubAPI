"use strict";
exports.__esModule = true;
var fs = require("fs");
var gulp = require("gulp");
var jsYaml = require("js-yaml");
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
function CreateSwaggerJson() {
    var genYaml = jsYaml.safeLoad(fs.readFileSync(swaggerFile, 'utf8'));
    fs.writeFileSync(swaggerDestpath + "/swagger.json", JSON.stringify(genYaml, null, ' '));
}
gulp.task('gen-swagger-file', GenerateSwaggerFile);
gulp.task('swagger-json', CreateSwaggerJson);
gulp.task('swagger-backup', CreateSwaggerBackup);
gulp.task('watcher', function () {
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerJson);
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerBackup);
});
gulp.task('default', function () {
    runSequence('gen-swagger-file', 'swagger-json', 'watcher');
});
