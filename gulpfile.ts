import * as fs from 'fs';
import * as gulp from 'gulp';
import * as jsYaml from 'js-yaml';
import * as path from 'path';
import * as runSequence from 'run-sequence';

let swaggerSrcpath = './src/swagger.yaml';
let swaggerDestpath = './api/swagger';
let swaggerFile = `${swaggerDestpath}/swagger.yaml`;

function GenerateSwaggerFile() {
    if (!fs.existsSync(swaggerDestpath)) {
        fs.mkdirSync(swaggerDestpath);
    }
    gulp.src(swaggerSrcpath).pipe(gulp.dest(`${swaggerDestpath}/`));
}
function CreateSwaggerBackup() {
    gulp.src(swaggerFile).pipe(gulp.dest('./src/'));
}

gulp.task('gen-swagger-file', GenerateSwaggerFile);
gulp.task('swagger-backup', CreateSwaggerBackup);

gulp.task('watcher', () => {
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerBackup);
});

gulp.task('default', () => {
    runSequence('gen-swagger-file', 'watcher');
});
