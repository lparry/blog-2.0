import glob from "glob"
import { join } from "path"
import fs from "fs"

module.exports = function oldLegacyPathsLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("*.{s,jsx,markdown}", { cwd: join(__dirname, "../../blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const paths = files.map(file => {
      const path = `pages/${file}.markdown`
      let oldUrl = fs.readFileSync(path, "utf8").split("\n").find(l => l.match(/old_blog_url:/))
      if (oldUrl) { oldUrl = oldUrl.replace(/.*http:\/\/www.lucasthenomad.com/, "") }

      // if (legacyBlogPath(path)) {
      //   path = legacyBlogUrl(path)
      // }

      if (target === "node") {
        return `  '${path}': () => '${oldUrl}'`
      }
      return `  '${path}': () => undefined`
    })

    if (paths.length) {
      return callback(null, source.replace(" oldPaths = {", ` oldPath = {\n${paths.join(",")}`))
    }

    return callback(new Error("Cannot find any routes."))
  })
}
