const w2v = require("word2vec")
const fs = require("fs")
const path = require("path")

// console.log(__dirname)

exports.load_w2v_model = function(cb) {
  let file_path = path.resolve(__dirname, "./data/glove.6B.50d1.txt")
  w2v.loadModel(file_path, function(error, model) {
    if (error) {
      console.log(error)
    }
    // console.log(model)
    cb(model)
  })
}

exports.load_5k_words = function() {
  let file_path = path.resolve(__dirname, "./data/5k.csv")
  let content = fs.readFileSync(file_path, { encoding: "utf-8" })
  // \n?
  let lines = content.split("\r\n").map(line => line.split(","))
  // pop off the first line
  let headers = lines.shift()

  lines = lines.map(line => {
    let result = {}
    headers.map((col_name, i) => {
      result[col_name] = line[i]
    })
    return result
  })
  // console.log(headers)
  // headers = headers.split(',')
  return lines
}

// exports.load_10k_no_swear_words = function() {
//   let file_path = path.resolve(
//     __dirname,
//     "./data/google-10000-english-usa-no-swears.txt"
//   )
//   let content = fs.readFileSync(file_path, { encoding: "utf-8" })
//   return content.split("\n")
// }
//
// exports.load_20k_words = function() {
//   let file_path = path.resolve(__dirname, "./data/20k.txt")
//   let content = fs.readFileSync(file_path, { encoding: "utf-8" })
//   return content.split("\n")
// }
