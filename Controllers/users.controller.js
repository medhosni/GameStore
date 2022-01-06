const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
module.exports = {
    createUser: async function (req, res) {
        
        var hash = bcrypt.hashSync(req.body.u_password, 10);



        console.log(hash);
        var { u_name, u_mail,u_password, u_classe, u_descritption } = req.body;
        u_password=hash
        const users =new User( {
          u_name:u_name,u_password:hash,u_mail:u_mail,u_classe:u_classe,u_descritption:u_descritption
        })
        
        await users.save()

        res.json(users)

    },




    getUsers: async (req, res) => {
        const users = await User.find();
        res.json(users)
    },







    login: async(req,res)=>{
        
        var { u_mail } = req.body;
       
        const users = await User.findOne({u_mail:u_mail})
        const match = bcrypt.compareSync(req.body.u_password, users.u_password);
        console.log(match);
        if ((users== null)&& (match)) {
            
            return res.status(404).json({  message: "Error" });
        }else{
            res.json({result:"ok"})
        }
        
        

    }
}