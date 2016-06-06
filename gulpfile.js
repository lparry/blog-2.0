const gulp = require("gulp")
const responsive = require("gulp-responsive")
const rev = require("gulp-rev")

gulp.task("default", () => {
  gulp.src("cache/flickr/**/*.{png,jpg}", { base: "cache/flickr" })
    .pipe(responsive(
      {
        "**/*.{png,jpg}": [
          {
            format: "jpeg",
            width: 350,
            quality: 90,
            rename: { suffix: "-tiny", extname: ".jpg" },
          },
          {
            format: "jpeg",
            width: 700,
            quality: 90,
            rename: { suffix: "-tiny@2x", extname: ".jpg" },
          },
          {
            format: "jpeg",
            width: 512,
            quality: 90,
            rename: { suffix: "-small", extname: ".jpg" },
          },
          {
            format: "jpeg",
            width: 1024,
            quality: 80,
            rename: { extname: ".webp" },
          },
          {
            format: "jpeg",
            width: 2048,
            quality: 50,
            rename: { suffix: "@2x", extname: ".jpg" },
          },
        ],
      },
      {
        errorOnEnlargement: false,
        progressive: true,
        withMetadata: false,
      }
    ))
    .pipe(rev())
    .pipe(gulp.dest("cache/flickr-responsive"))
    .pipe(rev.manifest("flickr_manifest.json"))
    .pipe(gulp.dest("."))
})
