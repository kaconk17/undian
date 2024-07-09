const multer = require("multer");
const path = require("path");

// const jpgFilter = (req, file, cb) => {
//   if (file.mimetype.includes("jpg")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only jpg file.", false);
//   }
// };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img/photo"));
  },
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    console.log(file.originalname);
    cb(null, `${Date.now()}-img${ext}`);
  },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;
