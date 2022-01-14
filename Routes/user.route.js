const router = require("express").Router();
const usersController = require("../Controllers/users.controller");


/**
 * @Path /users
 */
router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.post("/teacher", usersController.createTeacher);
router.post("/login", usersController.login);
router.post("/show", usersController.showprofile);
router.post("/ban", usersController.ban);
router.post("/deban", usersController.deban);
router.get("/activate",usersController.acttivateUser);
router.post("/search",usersController.search);
router.post("/forgetpwd",usersController.fogetpwd)
module.exports = router;