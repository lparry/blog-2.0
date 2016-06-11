import glob from "glob"
import path from "path"
import sortBy from "lodash.sortby"
import fs from "fs"
import Promise from "bluebird"
Promise.promisifyAll(fs)

const tagTemplate = fs.readFileSync(path.join(__dirname, "../../templates/TagPage.jsx"), "utf8")

module.exports = function tagLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx,markdown}", { cwd: path.join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const tagList = {}
    files.forEach(file => {
      const tags = require(`../../pages/blog/${file}`).metadata.tags // eslint-disable-line global-require
      tags.forEach(tag => (tagList[tag] = tag))
    })

    const tags = sortBy(Object.keys(tagList))

    tags.forEach(tag => {
      const tagUrl = tag.toLowerCase().replace(/ /g, "-")
      const filename = path.join(__dirname, `../../pages/tags/${tagUrl}.jsx`)
      const contents = tagTemplate
                       .replace(/const tag = ""/, `const tag = "${tag}"`)

      if (!fs.existsSync(filename)) {
        fs.writeFileAsync(filename, contents)
        .catch(error => console.error(`couldn't write tag file ${tag} - ${error}`))
      }
    })


    if (tags.length) {
      return callback(null,
                      source.replace(" tags = []",
                                     (` tags = ${JSON.stringify(tags)}`)))
    }

    return callback(new Error("Cannot find any blog pages."))
  })
}
