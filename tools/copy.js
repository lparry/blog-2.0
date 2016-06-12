import task from "./lib/task"
import cp from "./lib/copy"
import mkdirp from "mkdirp"
import Promise from "bluebird"

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
export default task(async function copy() {
  await Promise.promisify(mkdirp)("build/assets")
  await cp("cache/flickr-responsive", "build/assets/flickr")
  await cp("cache/images-responsive", "build/assets/images")
  await cp("static", "build")
})
