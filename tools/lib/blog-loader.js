import glob from "glob"
import sortBy from "lodash.sortby"
import reverse from "lodash.reverse"
import { join } from "path"

module.exports = function blogLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx}", { cwd: join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const pagesData = reverse(sortBy(files.map(file => {
      const page = require(`../../pages/blog/${file}`)
      const metadata = page.metadata
      return {
        date: metadata.date,
        file,
        path: metadata.canonicalPath,
        tags: metadata.tags,
        title: metadata.title,
      }
    }), obj => new Date(obj.date)))


    if (pagesData.length) {
      return callback(null,
                      source.replace(" blogPages = []",
                                     (` blogPages = ${JSON.stringify(pagesData)}`)))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
