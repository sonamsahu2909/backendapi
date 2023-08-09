class ProductController {
    
    static display = async(req,res)=>{
        try{
           res.send('hello display')

        }catch{
            console.log(error)
        }
    } 
}

module.exports = ProductController