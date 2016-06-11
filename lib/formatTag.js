function capitalize(string) {
  return string.split(" ")
    .map(word => word.replace(/(?:^|\s)\S/g, a => a.toUpperCase()))
    .join(" ")
}

const PRESERVED = {
  nye: "NYE",
  usa: "USA",
  hcmc: "HCMC",
}

export default function formatTag(tag) {
  const lowerTag = tag.toLowerCase()
  return PRESERVED[lowerTag] || capitalize(lowerTag)
}
