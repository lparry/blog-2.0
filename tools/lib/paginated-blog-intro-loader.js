/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from "glob"
import sortBy from "lodash.sortby"
import reverse from "lodash.reverse"
import path, { join } from "path"

module.exports = function blogLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  const paginationPage = path.basename(this.resource, ".jsx")
  const paginationPageNo = paginationPage === "index" ? 1 : parseInt(paginationPage, 10)
  const perPage = 10

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

    const paginationPages = pagesData.slice((paginationPageNo - 1) * perPage, paginationPageNo * perPage)


    if (pagesData.length) {
      return callback(null,
                      source.replace(" blogPages = []",
                                     (` blogPages = ${JSON.stringify(paginationPages)}`)))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
