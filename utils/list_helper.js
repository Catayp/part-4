const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs
    .map((result) => result.likes)
    .reduce((num, sum) => num + sum)
}

module.exports = { dummy, totalLikes }
