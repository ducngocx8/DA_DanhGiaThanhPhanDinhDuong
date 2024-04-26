const express = require("express");
const { sendOTPPassword, reSendEmailVerify } = require("./mail.controller");
const { checkUserNameAndEmail, checkEmailValid } = require("../../middlewares/validations/mail.validation");
const mailRouter = express.Router();


mailRouter.post("/forgot-password", checkUserNameAndEmail, sendOTPPassword);
mailRouter.post("/resend-email", checkEmailValid, reSendEmailVerify);
module.exports = mailRouter;
