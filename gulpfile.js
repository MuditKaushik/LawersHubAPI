"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var jsYaml = require("js-yaml");
var fs = require("fs");
var swagger_src_path = './src/swagger.yaml';
var swagger_dest_path = './api/swagger';
var swagger_file = swagger_dest_path + "/swagger.yaml";
gulp.task('gen-swagger-file', function () {
    if (!fs.existsSync(swagger_dest_path)) {
        fs.mkdirSync(swagger_dest_path);
    }
    gulp.src(swagger_src_path).pipe(gulp.dest(swagger_dest_path + "/"));
});
gulp.task('copy-swagger-ui', function () {
    gulp.src('./node_modules/swagger-ui-express/**/*').pipe(gulp.dest('./api/swagger/'));
});
gulp.task('watcher', function () {
    // swagger doc backup.
    gulp.watch(swagger_file, function () {
        gulp.src(swagger_file).pipe(gulp.dest('./src/'));
    });
    // generate swagger yaml to json.
    gulp.watch(swagger_file, function () {
        var gen_yaml = jsYaml.safeLoad(fs.readFileSync(swagger_file, 'utf8'));
        fs.writeFileSync(swagger_dest_path + "/swagger.json", JSON.stringify(gen_yaml, null, ' '));
    });
});
gulp.task('default', ['copy-swagger-ui', 'gen-swagger-file', 'watcher'], function () { });
