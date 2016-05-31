/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from "glob"
import { join } from "path"

module.exports = function blogLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx,markdown}", { cwd: join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const pagesData = files.map(file => {
      const metadata = require(`../../pages/blog/${file}`).metadata
      return {
        path: metadata.canonicalPath,
        title: metadata.title,
      }
    })


    if (pagesData.length) {
      return callback(null,
                      source.replace(" blogPages = []",
                                     (` blogPages = ${JSON.stringify(pagesData)}`)))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
