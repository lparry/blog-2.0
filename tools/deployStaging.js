import GitRepo from "git-repository"
import Promise from "bluebird"
import task from "./lib/task"
import build from "./build"
import path from "path"
import childProcess from "child_process"
Promise.promisifyAll(childProcess)


// TODO: Update deployment URL
const remote = {
  name: "origin",
  url: "git@github.personal:lucastesting/lucastesting.github.io.git",
  branch: "master",
}

/**
 * Deploy the contents of the `/build` folder to GitHub Pages.
 */
export default task(async function deploy() {
  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  const repo = await GitRepo.open("build", { init: true })
  await repo.setRemote(remote.name, remote.url)

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, remote.branch))) {
    await repo.fetch(remote.name)
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true })
    await repo.clean({ force: true })
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push("--release")
  await build()

  await childProcess.execAsync("rm -f CNAME", { cwd: path.resolve(__dirname, "../build") })
    .catch(error => { console.log(error); throw error })

  // double build because there seems to be an ordering issue and the first
    // build refers to old JS hashes. I should fix this
  process.argv.push("--release")
  await build()

  await childProcess.execAsync("rm -f CNAME", { cwd: path.resolve(__dirname, "../build") })
    .catch(error => { console.log(error); throw error })
  //
  // childProcess.execAsync("npm run gulp", { cwd: path.resolve(__dirname, "..") })
  //   .catch(error => { console.log(error); throw error })

  // Push the contents of the build folder to the remote server via Git
  await repo.add("--all .")
  await repo.commit(`Update ${new Date().toISOString()}`)
  await repo.push(remote.name, `HEAD:${remote.branch}`, { force: true })
})
