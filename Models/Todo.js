const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)//1씩 자동 증가

const TodoSchema = new mongoose.Schema({
  task: String,
  done: {type:Boolean, default: false},

},{versionKey:false})//_v 안생기게 해줌

TodoSchema.plugin(AutoIncrement, {inc_field: "id"})//1씩 자동증가하는 스키마를 넣어줌

module.exports = mongoose.model("Todo", TodoSchema)

