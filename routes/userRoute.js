const express = require("express");

const {
  createUser,
  siginUser,
  getUser,
  getAllkaryawan,
  getUndikaryawan,
} = require("../controllers/users");
const verifyAuth = require("../middlewares/verifyAuth");
const upload = require("../middlewares/upload");
const csvcontroller = require("../controllers/uploadcsv");
const router = express.Router();
const { pool } = require("../config/connection");

require("dotenv").config();

const appUrl = process.env.APP_URL;
// users Routes

router.post("/auth/signup", createUser);
router.post("/auth/signin", siginUser);
router.post("/auth/getuser", verifyAuth, getUser);
router.get("/karyawan/getall", verifyAuth, getAllkaryawan);
router.get("/karyawan/getundi", verifyAuth, getUndikaryawan);

router.get("/main", async (req, res) => {
  const getHadiahQuery = "SELECT * FROM tb_hadiah";
  try {
    const { rows } = await pool.query(getHadiahQuery);
    res.render("main", { app_url: appUrl, hadiah: rows });
  } catch (error) {}
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
