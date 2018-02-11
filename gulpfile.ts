import * as gulp from 'gulp';
import * as jsYaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

let swagger_src_path = './src/swagger.yaml';
let swagger_dest_path = './api/swagger';
let swagger_file = `${swagger_dest_path}/swagger.yaml`;

gulp.task('gen-swagger-file', () => {
    if (!fs.existsSync(swagger_dest_path)) {
        fs.mkdirSync(swagger_dest_path);
    }
    gulp.src(swagger_src_path).pipe(gulp.dest(`${swagger_dest_path}/`));
});
gulp.task('copy-swagger-ui', () => {
    gulp.src('./node_modules/swagger-ui-express/**/*').pipe(gulp.dest('./api/swagger/'));
});
gulp.task('watcher', () => {
    // swagger doc backup.
    gulp.watch(swagger_file, () => {
        gulp.src(swagger_file).pipe(gulp.dest('./src/'));
    });
    // generate swagger yaml to json.
    gulp.watch(swagger_file, () => {
        let gen_yaml = jsYaml.safeLoad(fs.readFileSync(swagger_file, 'utf8'));
        fs.writeFileSync(`${swagger_dest_path}/swagger.json`, JSON.stringify(gen_yaml, null, ' '));
    });
});

gulp.task('default', ['copy-swagger-ui','gen-swagger-file', 'watcher'], () => { });