import Promise from "bluebird"
import glob from "glob"
import { join } from "path"
import task from "./lib/task"
import fs from "fs"
import markdownTranspiler from "./lib/transpileMarkdown"

const writeFile = Promise.promisify(fs.writeFile)

function getMarkdownFiles() {
  return new Promise((resolve, reject) => {
    glob("old-markdown/*.markdown", { cwd: join(__dirname, "..") }, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
  .catch(console.error)
}

const transpileFiles = (files) => (
  Promise.reduce(files, (memo, file) => {
    const newPath = file.replace(/old-markdown/, "pages/blog").replace(/\.markdown/, ".jsx")
    markdownTranspiler(file)
    .then(transpiledFile => writeFile(newPath, transpiledFile))
    .catch(console.error)
    return memo
  }, {})
  .catch(console.error)
)

export default task(async function transpile() {
  getMarkdownFiles()
  .then(files => transpileFiles(files))
  .catch(console.error)
})
