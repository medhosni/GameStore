const router = require("express").Router();
const usersController = require("../Controllers/users.controller");


/**
 * @Path /users
 */
router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.post("/login", usersController.login);
module.exports = router;