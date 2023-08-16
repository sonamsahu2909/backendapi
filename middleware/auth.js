const jwt = require('jsonwebtoken')
const UserModal = require('../modals/user')


const checkuserauth = async(req,res,next)=>{

    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if (!token){
        res.status(401).json({'status':"failed",'message':"unauthorized user, no token"})
    }
    else{
        const verify = jwt.verify(token,'sonamsahu@123456789')
        // console.log(verify)
        const user =await UserModal.findById(verify.ID)
        // console.log(user)
        req.user = user
        next()
    }

}
module.exports = checkuserauth