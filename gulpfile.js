const gulp=require('gulp');

const sass=require('gulp-sass')(require('sass'));//sass files to css

const cssnano=require('gulp-cssnano');//compressing css files in one line

const rev=require('gulp-rev');//renames files with # alongside them eg if name of file is home.css it will rename it to home-abcd(i.e some string) .whenever sent to the browser new string gets attached to it(accepted by the browser as new asset)
const uglify=require('gulp-uglify-es').default;//use to minify js
const del=require('del');
const imagemin=require('gulp-imagemin');
//we create a task of what gulp needs to do here minifying css
gulp.task('css',function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')//**-every folder and subfolder inside sass folder with  *.scss - any file name with .scss ext
    .pipe(sass())//to be passed throgh gulp sass module through pipe(a fxn which is calling all these sub middlewares which are there with gulp modules) which are converted from sass to css
    .pipe(cssnano())//then compressing css
    .pipe(gulp.dest('./assets.css'));//minification is done and placed inside assets.css

    gulp.src('./assets/**/*.css')
    .pipe(rev())//renaming
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',//cwd-current working directory cos taking everything from public folder
        merge: true// if a name already exists then it will not change it will merge it with original exisiting file
    }))//now need to manifest(a map where our ejs file will look for the x.css it will take orig renamed file from map)
    .pipe(gulp.dest('./public/assets'));
    done();
}); 

gulp.task('js',function(done){
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())//minify js
    .pipe(rev())//revise the name
    .pipe(gulp.dest('./public/assets'))//put it into public assets
    .pipe(rev.manifest({//and put the details into manifest
        cwd: 'public',//cwd-current working directory cos taking everything from public folder
        merge: true// if a name already exists then it will not change it will merge it with original exisiting file
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

}); 

gulp.task('images',function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')//regular expressions for matching extensions
    .pipe(imagemin())//minify images
    .pipe(rev())//revise the name
    .pipe(gulp.dest('./public/assets'))//put it into public assets
    .pipe(rev.manifest({//and put the details into manifest
        cwd: 'public',//cwd-current working directory cos taking everything from public folder
        merge: true// if a name already exists then it will not change it will merge it with original exisiting file
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

}); 
//empty the public assets directory->whenever we are building the project we need to clear the previous build and build it from scratch
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
})

//run all 4 of these-since all the tasks need to be run independently
gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('Building assets');
    done();
})