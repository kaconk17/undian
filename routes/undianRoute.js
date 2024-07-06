const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");

const {
  createHadiah,
  getAllhadiah,
  getHadiah,
  updateHadiah,
  deleteHadiah,
} = require("../controllers/undianController");

router.post("/hadiah/create", createHadiah);
router.get("/hadiah/getall", getAllhadiah);
router.get("/hadiah/geta/:Id", getHadiah);
router.put("/hadiah/update/:Id", updateHadiah);
router.delete("/hadiah/del/:Id", deleteHadiah);

module.exports = router;
