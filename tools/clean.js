import del from "del"
import task from "./lib/task"
import fs from "./lib/fs"

export default task(async function clean() {
  await del(["build/*", "!build/.git"], { dot: true })
  await del(["pages/tags/*", "!pages/tags/.keep"], { dot: true })
  await del(["pages/page/*", "!pages/page/.keep"], { dot: true })
  await fs.mkdir("build")
})
