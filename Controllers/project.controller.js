const { Project } = require("../Models/Projects");

const { User } = require("../Models/User");

const nodemailer = require('nodemailer');

const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config()

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

  createProject: async function (req, res) {
    var { p_title, p_description } = req.body
    var { _id } = req.header


    const user = await User.findOne(_id);
    const project = new Project({ p_title: p_title, p_description: p_description, p_owner: _id })

    if (req.file) {
      let imagePath = req.file.path.replace("public", "");
      project.p_images.push(imagePath) 
    } else {
      project.p_images.push("Images/placeholder.jpg")
    }




    var mailOptions = {
      from: 'contact.esprit.gamix@gmail.com',
      to: user.u_mail,
      subject: 'Project  :' + p_title,
      text: 'the project has been save successfully !!!!!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {

        project.save()

        res.json({ projet: project, USER: user })
      } else {
        res.json({ Message: "project don't save successfully " })
      }
    });

  },
  getProjects: async function (req, res) {
    const project = await Project.find();

    res.json(project)
  },
  updateProject: async function (req, res) {

  },

}