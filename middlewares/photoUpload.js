const multer = require("multer");
const path = require('path');

// const jpgFilter = (req, file, cb) => {
//   if (file.mimetype.includes("jpg")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only jpg file.", false);
//   }
// };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img'));
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-npmi-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;