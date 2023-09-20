const userControllers = require("../controllers/user.controller")
const tutorialControllers = require("../controllers/tutorial.controller.js");
const router = require("express").Router();

// User Sign-up and Sign-in API's
router.post('/signup',userControllers.signup)
router.post('/login',userControllers.login)
router.post('/activate-user',userControllers.activateUser)

// Tutorials API's
router.post("/tutorials/", tutorialControllers.create);
router.get("/tutorials/", tutorialControllers.findAll);
router.get("/tutorials/published", tutorialControllers.findAllPublished);
router.get("/tutorials/:id", tutorialControllers.findOne);
router.put("/tutorials/:id", tutorialControllers.update);
router.delete("/tutorials/:id", tutorialControllers.delete);
router.delete("/tutorials/deleteAll", tutorialControllers.deleteAll);

module.exports = router;