import reverse from "lodash.reverse"
import sortBy from "lodash.sortby"

const generatePagesData = (files) => reverse(sortBy(files.map(file => {
  const page = require(`../../pages/blog/${file}`)
  const metadata = page.metadata
  return {
    file,
    formattedDate: metadata.formattedDate,
    intro: page.intro,
    path: metadata.canonicalPath,
    tags: metadata.tags,
    title: metadata.title,
  }
}), obj => new Date(obj.date)))

export default generatePagesData
