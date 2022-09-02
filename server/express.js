const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const utils = require('./utils')
const port = 3002
let Model

mongoose.connect('mongodb://localhost:27017/test')
const con = mongoose.connection
con.on('error', console.error.bind(console, '连接数据库失败'))
con.once('open', () => {
  //定义一个schema
  let Schema = mongoose.Schema({
    username: String,
    password: String,
    register_time: String,
  })

  //继承一个schema
  Model = mongoose.model('user', Schema)
})
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded())
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')

  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行

  res.header('Access-Control-Allow-Headers', 'Content-Type')

  res.header('Access-Control-Allow-Methods', '*')

  res.header('Content-Type', 'application/json;charset=utf-8')

  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// app.use('/user', express.static(path.join(__dirname, '')))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/user/list', (req, res) => {
  Model.find((err, data) => {
    res.send(data)
  })
})

/**
 * 注册
 */
app.post('/user/register', (req, res) => {
  let user = new Model({ ...req.body })
  Model.findOne({ username: req.body.username }, (err, data) => {
    utils.handleData(
      data,
      res,
      () => {
        res.send({
          msg: '已存在同名用户',
          success: false,
        })
      },
      () => {
        user.save(req.body, (err, data) => {
          console.log(data)
          res.send({
            msg: '注册成功',
            success: true,
            data: data,
          })
        })
      }
    )
  })
})

/**
 * 登录
 */
app.post('/user/login', (req, res) => {
  Model.findOne({ username: req.body.username }, (err, data) => {
    utils.handleData(
      data,
      res,
      () => {
        if (req.body.password === data.password) {
          res.send({
            msg: '登录成功',
            data: { token: new Buffer(data.username).toString('base64'), username: data.username },
            success: true,
          })
        } else {
          res.send({
            msg: '密码错误',
            success: false,
          })
        }
      },
      () => {
        res.send({
          msg: '该用户不存在，请注册',
          success: false,
        })
      }
    )
  })
})

/**
 * 忘记密码
 */
app.post('/user/forgot-password', (req, res) => {
  let user = new Model({ ...req.body })
  Model.findOne({ username: req.body.username }, (err, data) => {
    utils.handleData(
      data,
      res,
      () => {
        if (req.body.password === data.password) {
          res.send({
            msg: '密码与原密码重复',
            success: false,
          })
        } else {
          Model.updateOne(req.body, (err, data) => {
            console.log(data)
            res.send({
              msg: '重置密码成功',
              success: true,
              data: data,
            })
          })
        }
      },
      () => {
        res.send({
          msg: '该用户不存在',
          success: false,
        })
      }
    )
  })
})

app.delete('/user/:id', (req, res) => {
  Model.remove({ _id: req.body._id }, (err, data) => {
    Model.find((err, data) => {
      console.log(data.length)
      res.send(data)
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
