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

router.post("/auth/signup", verifyAuth, createUser);
router.post("/auth/signin", siginUser);
router.post("/auth/getuser", verifyAuth, getUser);
router.get("/karyawan/getall", verifyAuth, getAllkaryawan);
router.get("/karyawan/getundi", verifyAuth, getUndikaryawan);

router.get("/main", async (req, res) => {
  const getHadiahQuery =
    "select a.id, a.hadiah, (a.qty - coalesce(b.jmlh,0)) as qty from (select * from tb_hadiah) a left join (select id_hadiah, count(id_hadiah) as jmlh from tb_undian group by id_hadiah) b on b.id_hadiah = a.id where (a.qty - coalesce(b.jmlh,0)) > 0 ORDER BY a.id DESC";
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
