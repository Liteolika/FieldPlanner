/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    debug = require("gulp-debug"),
    del = require("del"),
    install = require("gulp-install"),
    typings = require("gulp-typings"),
    less = require("gulp-less"),
    flatten = require("gulp-flatten"),
    runSequence = require("run-sequence"),
    tsc = require("gulp-typescript"),
    angularFilesort = require("gulp-angular-filesort"),
    ngAnnotate = require("gulp-ng-annotate"),
    sourcemaps = require("gulp-sourcemaps"),
    wiredep = require("wiredep"),
    inject = require("gulp-inject"),
    browserify = require("browserify"),
    transform = require("vinyl-transform"),
    uglify = require("gulp-uglify"),
    source = require('vinyl-source-stream');


var tsProject = tsc.createProject("./client/tsconfig.json");

//gulp.task("atest", (cb) => {

//    return browserify('./wwwroot/scripts/app.module.js')
//    .bundle()
//    .pipe(source('kaka.js'))
//        .pipe(uglify())
//    .pipe(gulp.dest('./wwwroot/kaka/'));

//});

gulp.task("build", (cb) => {
    runSequence("build-clean", "build-clean-inject", [
        "build-vendorscripts",
        "build-vendorstyles",
        "build-typescripts",
        "build-fonts",
        "build-images",
        "build-less",
        "build-views",
        "build-templates"
    ], "build-inject", cb);
});

gulp.task("build-clean-inject", (cb) => {

    runSequence("build-clean", "build-inject", cb);
});

gulp.task("build-inject", () => {

    return gulp.src('./server/views/_layout.cshtml')

        // Inject vendor css
        .pipe(inject(gulp.src(['wwwroot/vendor/styles/**/*.css']),
                {
                    starttag: '<!-- inject:vendor:{{ext}} -->',
                    addRootSlash: false,
                    transform: (filePath, file, i, length) => {
                        filePath = filePath + "?c=" + rnd();
                        return '<link rel="stylesheet" href="' + filePath.replace('wwwroot/', '') + '"/>';
                    }
                }))

        .pipe(inject(gulp.src(['wwwroot/styles/**/*.css']),
                {
                    starttag: '<!-- inject:{{ext}} -->',
                    addRootSlash: false,
                    transform: (filePath, file, i, length) => {
                        filePath = filePath + "?c=" + rnd();
                        return '<link rel="stylesheet" href="' + filePath.replace('wwwroot/', '') + '"/>';
                    }
                }))

        .pipe(inject(gulp.src([
            'wwwroot/vendor/scripts/**/angular.js',
            'wwwroot/vendor/scripts/**/jquery.js',
            'wwwroot/vendor/scripts/**/*.js'
        ]).pipe(debug()),
                {
                    starttag: '<!-- inject:vendor:{{ext}} -->',
                    addRootSlash: false,
                    transform: (filePath, file, i, length) => {
                        filePath = filePath + "?c=" + rnd();
                        return '<script src="' + filePath.replace('wwwroot/', '') + '"></script>';
                    }
                }))

        .pipe(inject(gulp.src(['wwwroot/scripts/**/*.js']).pipe(angularFilesort()),
                {
                    starttag: '<!-- inject:{{ext}} -->',
                    addRootSlash: false,
                    transform: (filePath, file, i, length) => {
                        filePath = filePath + "?c=" + rnd();
                        return '<script src="' + filePath.replace('wwwroot/', '') + '"></script>';
                    }
                }))



//.pipe(inject(
//  gulp.src(['wwwroot/scripts/**/*.js'], { read: true }).pipe(angularFilesort()), {
//      addRootSlash: false,
//      transform: function (filePath, file, i, length) {
//          filePath = filePath + "?c=" + rnd();
//          console.log(filePath);
//          return '<script src="' + filePath.replace('wwwroot/', '') + '"></script>';
//      }
//  }))

        .pipe(gulp.dest('./server/views'));

});

gulp.task("build-typescripts", () => {

    return tsProject.src()
    .pipe(tsProject())
    .pipe(angularFilesort())
    .pipe(ngAnnotate({ add: true }))
    .pipe(flatten())
    .pipe(gulp.dest('./wwwroot/scripts'));

});

gulp.task("build-vendorscripts", () => {

    return gulp.src(wiredep({
        directory: './bower_components'
    }).js).pipe(angularFilesort())
        .pipe(gulp.dest('./wwwroot/vendor/scripts'));
});

gulp.task("build-vendorstyles", () => {

    return gulp.src(wiredep({
        directory: './bower_components'
    }).css)
        .pipe(gulp.dest('./wwwroot/vendor/styles'));
});

gulp.task("build-clean", () => {
    return del("wwwroot/*");
});

gulp.task("install-packages", (cb) => {
    return gulp.src(["./bower.json", "./package.json"])
    .pipe(install());
});

gulp.task("install-typings", () => {
    var stream = gulp.src("./client/typings.json")
        .pipe(typings());
    return stream;
});

gulp.task('build-less', () => {
    return gulp.src(["./client/styles/*.less"])
        .pipe(less())
        .pipe(gulp.dest("./wwwroot/styles"));
});

gulp.task("build-images", () => {
    return gulp.src([
        "./client/images/**/*.*"
    ]).pipe(gulp.dest("./wwwroot/images"));
});

gulp.task('build-views', () => {
    return gulp.src([
        './client/app/**/*.html'
    ]).pipe(flatten()).pipe(gulp.dest('./wwwroot/views'));
});

gulp.task('build-templates', () => {
    return gulp.src([
        './client/app/**/tpl.*.html'
    ]).pipe(flatten()).pipe(gulp.dest('./wwwroot/templates'));
});

gulp.task('build-fonts', () => {
    return gulp.src([
        './bower_components/**/*.{eot,svg,ttf,woff,woff2}'
    ]).pipe(flatten()).pipe(gulp.dest("./wwwroot/vendor/fonts"));
});


function rnd() {
    var u = Math.floor((Math.random() * 9999) + 1);
    var d = Date.now();
    return u + "" + d;
}