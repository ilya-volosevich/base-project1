const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));

// function browsersync() {
//     browserSync.init({
//         server: {
//             baseDir: 'build'
//         }
//     })
// }

function html() {
    return src('src/index.html')
        .pipe(imagemin())
        .pipe(dest('build'))
        // .pipe(browserSync.stream())
}

 function css() {
     return src('src/assets/styles/styles.css')
//         .pipe(sass().on('error', sass.logError))
//         // .pipe(autoprefixer({
//         //     overrideBrowserslist: ['last 2 versions'],
//         //     grid: 'autoplace',
//         // }))
//         // .pipe(cleanCSS())
         .pipe(dest('build/assets/styles'))
         //.pipe(browserSync.stream())
 }

 function images() {
     return src('src/assets/images/**/*')
         .pipe(imagemin())
         .pipe(dest('build/assets/images'))
         //.pipe(browserSync.stream())
 }

 function fonts() {
     return src('src/assets/fonts/**/*')
         .pipe(dest('build/assets/fonts'))
//         .pipe(browserSync.stream())
 }

function clear() {
     return del('build', {force: true});
}


// function startWatch() {
//     watch('src/index.html', html)
//     watch('src/assets/styles/**/*.scss', css)
//     watch('src/assets/images/**/*', images)
//     watch('src/assets/fonts/**/*', fonts)
// }

exports.dev = parallel(html,images,fonts,css)
exports.build = series(clear, parallel(html, images, fonts,css))


exports.default = series(html,images,fonts,css)