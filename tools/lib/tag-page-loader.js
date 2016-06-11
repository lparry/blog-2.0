/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from "glob"
import path from "path"
import includes from "lodash.includes"
import generatePagesData from "./generatePagesData"
import fs from "fs"
import Promise from "bluebird"
Promise.promisifyAll(fs)

// generate tag pages
module.exports = function tagPageLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()
  let pagesData

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx}", { cwd: path.join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }
    pagesData = generatePagesData(files)

    const tag = source.match(/ tag = "([^"]*)"/)[1]


    const tagBlogPosts = pagesData.filter(pageData => includes(pageData.tags, tag))


    if (tagBlogPosts.length) {
      return callback(null,
                      source.replace(/const blogPosts = \[\]/,
                                      `const blogPosts = ${JSON.stringify(tagBlogPosts)}`))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
