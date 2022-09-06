const router = require("express").Router();
const multer = require("../middleware/multer");
const project = require("../Controllers/project.controller");


/**
 * @Path /projects
 */
router.get("/",project.getProjects)
router.post("/",multer.single("image"),project.createProject)
module.exports = router;