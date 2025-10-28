import { src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function css(done) {
    src('scss/app.scss')
    .pipe( sass().on('error',sass.logError) ) 
    .pipe( dest('build'))

    done()
}

export function dev() {
    watch('scss/**/*.scss', css)
}