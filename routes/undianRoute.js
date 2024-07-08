const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const upload = require("../middlewares/photoUpload");
const {
  createHadiah,
  getAllhadiah,
  getHadiah,
  updateHadiah,
  deleteHadiah,
  createUndian,
  getAllUndian,
} = require("../controllers/undianController");


const uploadImg = require("../controllers/uploadcsv");

router.post("/hadiah/create", verifyAuth,upload.single("file"), uploadImg.uploadImg);
router.get("/hadiah/getall", verifyAuth, getAllhadiah);
router.get("/hadiah/get/:Id", verifyAuth, getHadiah);
router.put("/hadiah/update/:Id", verifyAuth, updateHadiah);
router.delete("/hadiah/del/:Id", verifyAuth, deleteHadiah);
router.post("/undian/create", verifyAuth, createUndian);
router.get("/undian/getall", verifyAuth, getAllUndian);

module.exports = router;
