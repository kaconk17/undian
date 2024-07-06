const express = require("express");

const { createUser, siginUser, getUser } = require("../controllers/users");
const verifyAuth = require("../middlewares/verifyAuth");
const upload = require("../middlewares/upload");
const csvcontroller = require("../controllers/uploadcsv");
const router = express.Router();

require("dotenv").config();

const appUrl = process.env.APP_URL;
// users Routes

router.post("/auth/signup", createUser);
router.post("/auth/signin", siginUser);
router.post("/auth/getuser", verifyAuth, getUser);
router.get("/main", (req, res) => {
  res.render("main", { app_url: appUrl });
});
router.get("/settings", (req, res) => {
  res.render("settings", { app_url: appUrl });
});
router.post(
  "/uploadcsv",
  verifyAuth,
  upload.single("file"),
  csvcontroller.upload,
);

module.exports = router;
