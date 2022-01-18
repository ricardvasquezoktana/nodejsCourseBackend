const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
})

mongoose.model('User', userSchema)
