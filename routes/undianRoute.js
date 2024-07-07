const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");

const {
  createHadiah,
  getAllhadiah,
  getHadiah,
  updateHadiah,
  deleteHadiah,
  createUndian,
  getAllUndian,
} = require("../controllers/undianController");

router.post("/hadiah/create", verifyAuth, createHadiah);
router.get("/hadiah/getall", verifyAuth, getAllhadiah);
router.get("/hadiah/get/:Id", verifyAuth, getHadiah);
router.put("/hadiah/update/:Id", verifyAuth, updateHadiah);
router.delete("/hadiah/del/:Id", verifyAuth, deleteHadiah);
router.post("/undian/create", verifyAuth, createUndian);
router.get("/undian/getall", verifyAuth, getAllUndian);
module.exports = router;
