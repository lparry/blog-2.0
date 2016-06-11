import glob from "glob"
import path from "path"
import fs from "fs"
import Promise from "bluebird"
import config from "../../config"

Promise.promisifyAll(fs)

const pageTemplate = fs.readFileSync(path.join(__dirname, "../../templates/PaginationPage.jsx"), "utf8")

module.exports = function tagLoader(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  if (target === "node") {
    source = source.replace("import 'babel/polyfill';", "") // eslint-disable-line no-param-reassign
  }

  glob("**/*.{js,jsx}", { cwd: path.join(__dirname, "../../pages/blog") }, (err, files) => {
    if (err) {
      return callback(err)
    }

    const lastPageNumber = Math.ceil(files.length / config.perPage)
    if (lastPageNumber === 1) return callback(null, source)

    for (let index = 2; index <= lastPageNumber; index++) {
      const filename = path.join(__dirname, `../../pages/page/${index}.jsx`)

      if (!fs.existsSync(filename)) {
        fs.writeFileAsync(filename, pageTemplate)
        .catch(error => console.error(`couldn't write page file ${index} - ${error}`))
      }
    }

    return callback(null, source)
  })
}
