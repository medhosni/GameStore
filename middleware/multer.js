const path = require('path')

const multer = require('multer')
const storage =multer.diskStorage({
  destination :(req ,file ,callback )=>{
    callback(null,'Images')
},
filename : (req,file,callback)=>{
    const name = file.originalname.split(" ").join("_")
    callback(null,Date.now()+path.extname(name))
}

})
module.exports = multer({storage :storage })
