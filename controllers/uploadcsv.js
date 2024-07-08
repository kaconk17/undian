const { pool } = require("../config/connection");

const fs = require("fs");
const csv = require("fast-csv");
const moment = require("moment");
const path = require("path");
const { empty, isEmpty } = require("../middlewares/validation");
const {
  errorMessage,
  successMessage,
  status,
} = require("../middlewares/status");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }
    let filepath = path.join(
      __dirname,
      "../public/uploads/" + req.file.filename,
    );

    fs.createReadStream(filepath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        const createUserQuery = `INSERT INTO
            tb_karyawan(nik, nama, departemen, created_at)
            VALUES($1, $2, $3, $4)`;
        const values = [row.nik, row.nama, row.departemen, moment(new Date())];

        try {
          const { rows } = pool.query(createUserQuery, values);
          //const dbResponse = rows[0];
        } catch (error) {
          errorMessage.error = "Insert user gagal";
          return res.status(status.error).send(errorMessage);
        }
      })
      .on("end", () => {
        //   Tutorial.bulkCreate(tutorials)
        //     .then(() => {
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });

        //     .catch((error) => {
        //       res.status(500).send({
        //         message: "Fail to import data into database!",
        //         error: error.message,
        //       });
        //     });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const uploadImg = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a jpg file!");
    }
    let filepath = path.join(__dirname, "../public/img/" + req.file.filename);

    const { hadiah, qty } = req.body;

    if (isEmpty(hadiah)) {
      errorMessage.error = "Nama hadiah tidak boleh kosong";
      return res.status(status.bad).send(errorMessage);
    }
    if (empty(qty)) {
      errorMessage.error = "Qty tidak boleh kosong";
      return res.status(status.bad).send(errorMessage);
    }

    const created_on = moment(new Date());
    const createInQuery = `INSERT INTO
      tb_hadiah (hadiah, qty, gambar, created_at)
      VALUES($1, $2, $3,$4) returning *`;
    const values = [hadiah, qty, req.file.filename, created_on];
    try {
      const response = await pool.query(createInQuery, values);
      const Response = response.rows[0];
      successMessage.data = Response;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      errorMessage.error = "Create hadiah gagal";
      return res.status(status.error).send(errorMessage);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = {
  upload,
  uploadImg,
};
