const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader, upload } = require("../middlewares/multer");

//register
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

//saat login membuat token
router.get("/v3", userController.getByToken, userController.getUserByToken);

//uploud avatar
router.post(
  "/image/avatar/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.uploudAvatar
);

module.exports = router;
