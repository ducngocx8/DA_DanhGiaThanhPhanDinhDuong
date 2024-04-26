const BACKEND_BASE = "http://localhost:7000/api";
const BACKEND_HOME = "http://localhost:7000/";
const FRONTEND_BASE = "http://localhost:3000";
const GOOGLE_CLIENT_ID =
  "40528226647-82qjgdk15jhbgj5vcqdp54acg8500s9k.apps.googleusercontent.com";
const GOOGLE_WEB_CLIENT_ID =
  "508621019009-461kn6gbp9jtv7gkm4mphsv3dcqdio3s.apps.googleusercontent.com";

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
var { nanoid } = require("nanoid");
var regexUsername = /^[a-zA-Z0-9]+$/;
var regexRoleCode = /^[a-zA-Z0-9_]+$/;
var regexEmail = /^[a-z0-9]+@gmail.com+$/;
const regexSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const regexPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/;
const decodePassword = (password) => {
  return CryptoJS.AES.decrypt(password, "duc_ngoc_123").toString(
    CryptoJS.enc.Utf8
  );
};

const encodePassword = (password) => {
  return CryptoJS.AES.encrypt(password, "duc_ngoc_123").toString();
};

const createTokenLogin = (userLogin) => {
  const token = jwt.sign(
    {
      data: userLogin,
    },
    "ducngocx8_token",
    { expiresIn: 60 * 60 * 24 }
  );
  return token;
};

const createToken = () => {
  return nanoid(64);
};

const admin_code = "ROLE_ADMIN";
const customer_code = "ROLE_CUSTOMER";

module.exports = {
  decodePassword,
  encodePassword,
  regexUsername,
  regexEmail,
  regexPhone,
  admin_code,
  customer_code,
  regexRoleCode,
  createToken,
  BACKEND_BASE,
  FRONTEND_BASE,
  BACKEND_HOME,
  createTokenLogin,
  regexSlug,
  GOOGLE_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
};
