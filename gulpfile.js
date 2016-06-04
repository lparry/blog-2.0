const gulp = require("gulp")
const responsive = require("gulp-responsive")
const rev = require("gulp-rev")

gulp.task("default", () => {
  gulp.src("cache/flickr/**/*.{png,jpg}", { base: "cache/flickr" })
    .pipe(responsive(
      {
        "**/*.{png,jpg}": [
          // {
          //   format: "jpeg",
          //   width: 1024,
          //   quality: 90,
          //   rename: { extname: ".jpg" },
          // },
          // {
          //   format: "jpeg",
          //   width: 2048,
          //   quality: 50,
          //   rename: { suffix: "@2x", extname: ".jpg" },
          // },
          {
            format: "webp",
            width: 512,
            quality: 90,
            rename: { suffix: "-small", extname: ".webp" },
          },
          {
            format: "webp",
            width: 1024,
            quality: 90,
            rename: { extname: ".webp" },
          },
          {
            format: "webp",
            width: 2048,
            quality: 50,
            rename: { suffix: "@2x", extname: ".webp" },
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
