import * as fs from 'fs';
import * as gulp from 'gulp';
import * as jsYaml from 'js-yaml';
import * as path from 'path';

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
function CreateSwaggerJson() {
    let genYaml = jsYaml.safeLoad(fs.readFileSync(swaggerFile, 'utf8'));
    fs.writeFileSync(`${swaggerDestpath}/swagger.json`, JSON.stringify(genYaml, null, ' '));
}

gulp.task('gen-swagger-file', GenerateSwaggerFile);
gulp.task('swagger-json', CreateSwaggerJson);
gulp.task('swagger-backup', CreateSwaggerBackup);
gulp.task('watcher', () => {
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerBackup);
    gulp.watch(swaggerFile, { queue: true }, CreateSwaggerJson);
});

gulp.task('default', ['gen-swagger-file', 'swagger-json', 'watcher'], () => { });
