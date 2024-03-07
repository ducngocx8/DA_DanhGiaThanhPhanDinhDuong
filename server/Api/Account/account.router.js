const express = require("express");
const acountRouter = express.Router();

const {
  signup,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
  updatePassword,
  verifyAccount,
  verifyForgotPassword,
  customerUpdateImage,
  loginGoogle,
} = require("./account.controller");
const {
  checkInputSignup,
  checkInputLogin,
  verifyToken,
  checkUserToken,
  checkPhoneNumber,
  passwordUpdateValidation,
  checkVerifyForgotPassword,
  checkInputLoginGoogle,
} = require("../../middlewares/validations/account.validation");
const { allPermission } = require("../../middlewares/permission");
const {
  imageUserValidation,
} = require("../../middlewares/validations/user.validation");

// All Route
/**
 * @swagger
 * /account/login:
 *   tags:
 *       - Books
 *   post:
 *     summary: Use to validate your text for bla bla format
 *     description: Đăng nhập
 *     requestBody:
 *         content: 
 *          application/json :
*             schema:
*               type: object
*               properties:
*                 username:
*                   type: string
*                 password:
*                   type: string
*               required:
*                  - username
*                  - password
*             description: User Info
 *     responses:
 *       201:
 *         description: Đăng nhập thành công.
 */
acountRouter.post("/login", checkInputLogin, login);
acountRouter.post("/login-google", checkInputLoginGoogle, loginGoogle);
acountRouter.post("/signup", checkInputSignup, signup);
acountRouter.get(
  "/info",
  verifyToken,
  checkUserToken,
  allPermission,
  getUserInfo
);
acountRouter.post(
  "/info/update_info",
  verifyToken,
  checkUserToken,
  allPermission,
  checkPhoneNumber,
  updateUserInfo
);

acountRouter.post(
  "/info/update_password",
  passwordUpdateValidation,
  verifyToken,
  checkUserToken,
  allPermission,
  updatePassword
);
acountRouter.put(
  "/info/upload_image",
  verifyToken,
  checkUserToken,
  allPermission,
  imageUserValidation,
  customerUpdateImage
);

acountRouter.get("/verify/email/:email/:token", verifyAccount);
acountRouter.post(
  "/forgot/password",
  checkVerifyForgotPassword,
  verifyForgotPassword
);
acountRouter.get("/logout", logout);

module.exports = acountRouter;
