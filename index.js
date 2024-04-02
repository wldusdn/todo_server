const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./Models/Todo')
require('dotenv').config();
const cors = require('cors')

const app = express()
app.use(cors())//다른 사이트에서 가져올 때 cors에러 방지
app.use(express.json())

mongoose.connect(process.env.DB_ATLAS_URL)//아틀라스랑 연계되게끔 바꾸기 .env
// mongoose.connect('mongodb://localhost:27017/todolist')

app.get('/get', async(req, res) => {
  const todos = await Todo.find()
  console.log('/get 호출')
  console.log(todos)
  res.json(todos)
})

app.put('/update/:id', async(req,res) => {
  const {id} = req.params
  const todo = await Todo.findById(id)
  todo.done = !todo.done
  todo.save()
  console.log('/update/:id 호출')
  console.log(todo)
  res.json(todo)
})

app.delete('/delete/:id',async(req,res)=>{
  const {id} = req.params
  const todos = await Todo.findByIdAndDelete({_id:id})
  console.log('/delete/:id 호출')
  console.log(todos)
  res.json(todos)
})

//새로 만듦
app.post('/add', async(req, res)=>{
  const task = req.body.task;
  const todos = await Todo.create({task:task});
  console.log('/post 호출')
  console.log(todos)
  res.json(todos)//만든지 여부 체크
})

app.listen(3001,()=>{
  console.log('Server Stated~')
})