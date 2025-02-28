const express = require('express');
const router = express.Router();
const loginController = require("../controller/loginController");
const loginMiddleware = require("../middleware/loginMiddleware");

router.post("/login", loginController.loginUser);

// router.post("/verify", loginController.verifyUser);
router.post("/verify", loginMiddleware, (req, res) => {
    res.json({ result: true, user: req.user });
});

module.exports = router;