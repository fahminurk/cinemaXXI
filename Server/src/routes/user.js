const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader, upload } = require("../middlewares/multer");

//register
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

//saat login membuat token, token yg masuk kedalam localstorage
router.get("/v3", userController.getByToken, userController.getUserByToken);

//validasi lewat email
router.get("/generate-token/email", userController.generateTokenByEmail);

//edit profile
router.patch("/editProfile/:id", userController.editProfile);

//edit password
router.patch("/editPassword/:id", userController.editPassword);

//forgot password
router.patch(
  "/forgotPassword",
  userController.getByToken,
  userController.forgotPassword
);

//mengirim token ke email user
router.get("/generate-token/email", userController.generateTokenByEmail);

//uploud avatar
router.post(
  "/image/avatar/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.uploudAvatar
);

module.exports = router;
