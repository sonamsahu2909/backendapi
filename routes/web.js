const express = require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const route = express.Router()
const checkuserauth = require('../middleware/auth')

route.get('/productdisplay',ProductController.display)

// user controller

route.post('/userinsert',UserController.userinsert)
route.post('/verify_login',UserController.verify_login)
route.get('/me',checkuserauth,UserController.get_user_detail)
route.get('/getalluser',UserController.get_all_user)
route.post('/updatepassword',checkuserauth,UserController.change_password)
route.post('/updateprofile',checkuserauth,UserController.profile_update)
route.get('/logout',UserController.logout)

module.exports = route