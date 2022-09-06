const { User } = require("../Models/User");
const bcrypt = require("bcrypt");
require('dotenv').config()
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: process.env.service,
  host: process.env.host,
  port: process.env.port,
  secure: process.env.secure,
  auth: {
    user: process.env.user ,
    pass: process.env.pass
  }
}));


module.exports = {
  createUser: async function (req, res) {

    var hash = bcrypt.hashSync(req.body.u_password, 10);

    var { u_name, u_mail, u_password, u_classe, u_descritption } = req.body;
    u_password = hash
    const users = new User({
      u_name: u_name, u_password: hash, u_mail: u_mail, u_classe: u_classe, u_descritption: u_descritption, u_role: "Studiant"
    })

    await users.save()

    if (users)
      res.json(users)
    else {
      res.json({ Message: "Can't create this user " })
    }

  }
  , createTeacher: async function (req, res) {
    var hash = bcrypt.hashSync(req.body.u_password, 10);

    var { u_name, u_mail, u_password, u_classe, u_descritption } = req.body;
    u_password = hash
    const users = new User({
      u_name: u_name, u_password: hash, u_mail: u_mail, u_classe: u_classe, u_descritption: u_descritption, u_role: "Teacher"
    })

    await users.save()
    if (users)
      res.json(users)
    else {
      res.json({ Message: "Can't create this user " })
    }

  },

  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(users)
  },

  login: async (req, res) => {

    var { u_mail } = req.body;

    const users = await User.findOne({ u_mail: u_mail })
    const match = bcrypt.compareSync(req.body.u_password, users.u_password);
    console.log(match);
    if ((users == null) && (match)) {

      return res.status(404).json({ message: "Your email address or the password is incorrect." });
    } else {
      res.json({ result: "ok" })
    }



  },
  update: async (req, res) => {

  },
  showprofile: async (req, res) => {
    const { _id } = req.header
    console.log(_id);
    const user = await User.findOne(_id)
    if (user) {
      res.json({ name: user.u_name, mail: user.u_mail, classe: user.u_classe, })
    } else {
      return res.json({ message: "errore" })
    }
  },
  ban: async (req, res) => {
    const { _id } = req.header

    const user = await User.findOne(_id)

    if (user) {

      user.u_ban = true;
      await user.save()

      res.json(user)
    } else {
      return res.json({ message: "errore" })
    }
  },
  deban: async (req, res) => {
    const { _id } = req.header

    const user = await User.findOne(_id)

    if (user) {

      user.u_ban = false;
      await user.save()

      res.json(user)
    } else {
      return res.json({ message: "errore" })
    }
  },
  fogetpwd: async (req, res) => {
    const code = Math.floor(Math.random() * 9999)
    const user = await User.findOne({ u_mail: req.body.u_mail })

    var mailOptions = {
      from: 'contact.esprit.gamix@gmail.com',
      to: user.u_mail,
      subject: 'Changing your password [FROM GameStore] :' + user.u_name,
      text: 'this is the code \n code :' + code,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("the mail has been send ....");
        res.json(user)
      }
    });

  },
  acttivateUser: async (req, res) => {
    const { _id } = req.header

    const user = await User.findOne(_id)
    const code = Math.floor(Math.random() * 9999)


    var mailOptions = {
      from: 'contact.esprit.gamix@gmail.com',
      to: user.u_mail,
      subject: 'Changing your password [FROM GameStore] :' + user.u_name,
      text: 'this is the code \n code :' + code
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        user.u_activate = true;
        user.save()
        //send a htlm page to activate the use 
        res.json(user)
      }
    });

  },
  search: async (req, res) => {
    const { u_name, u_mail, u_classe } = req.body;
    const user = await User.find().or([{ u_name }, { u_mail }, { u_classe }])
    if (user) {
      res.json(user)

    } else {

      res.json({ Messager: "erroooor" })
    }
  }








}