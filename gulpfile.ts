import * as fs from 'fs';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

let swaggerSrcpath = './api/swagger/swagger.yaml';
let swaggerDestpath = './dist/swagger/';

function Swagger() {
    if (!fs.existsSync(swaggerDestpath)) {
        fs.mkdirSync(swaggerDestpath);
    }
    gulp.src(swaggerSrcpath).pipe(gulp.dest(`${swaggerDestpath}/`));
}
function SwaggerChange() {
    gulp.src(swaggerSrcpath).pipe(gulp.dest(`${swaggerDestpath}/`));
}
gulp.task('swagger', Swagger);
gulp.task('swaggerChange', SwaggerChange);
gulp.task('watcher', () => {
    gulp.watch(swaggerSrcpath, SwaggerChange);
});
gulp.task('build', () => {
    runSequence(['swagger']);
});
gulp.task('default', () => {
    runSequence(['swagger', 'swaggerChange', 'watcher']);
});
