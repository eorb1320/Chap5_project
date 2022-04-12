const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  postId: {
    type: String,
  },
  email: {
    type: String,
  },
})

module.exports = mongoose.model('Likes', likeSchema)