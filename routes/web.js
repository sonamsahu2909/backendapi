const express = require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const route = express.Router()
const checkuserauth = require('../middleware/auth')
const Categorycontroller = require('../controllers/CategoryController')


// user controller

route.post('/userinsert',UserController.userinsert)
route.post('/verify_login',UserController.verify_login)
route.get('/me',checkuserauth,UserController.get_user_detail)
route.get('/getalluser',UserController.get_all_user)
route.post('/updatepassword',UserController.change_password)
route.post('/updateprofile',UserController.profile_update)
route.get('/logout',UserController.logout)

// productcontroller
route.post('/product',ProductController.product)
route.get('/product/display' , ProductController.prodisplay)
route.get('/productdelete/:id',ProductController.prodelete)
route.get('/productdetail/:id',ProductController.productdetail)
route.post('/productupdate/:id',ProductController.product_update)

// category 
route.post('/category' , Categorycontroller.category)
route.get('/category/display',Categorycontroller.catdisplay)
// route.post('/categoryupdate/:id',Categorycontroller.catupdate)
route.get('/categorydelete/:id', Categorycontroller.catdelete)

module.exports = route