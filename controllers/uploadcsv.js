const {pool} = require('../config/connection');

const fs = require("fs");
const csv = require("fast-csv");
const moment = require('moment');
const path = require('path');
const {
    errorMessage, successMessage, status,
  }  = require('../middlewares/status');

const upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
  
      let csvdata = [];
      let filepath = path.join(__dirname, "../public/uploads/" + req.file.filename);
  
      fs.createReadStream(filepath)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
            const createUserQuery = `INSERT INTO
            tb_karyawan(nik, nama, departemen, created_at)
            VALUES($1, $2, $3, $4)`;
            const values = [
                row.nik,
                row.nama,
                row.departemen,
                moment(new Date()),
              ];

              try {
                const { rows } =  pool.query(createUserQuery, values);
                //const dbResponse = rows[0];
                
              
               
              } catch (error) {
               
                errorMessage.error = 'Insert user gagal';
                return res.status(status.error).send(errorMessage);
              }
            console.log(row);

          csvdata.push(row);
        })
        .on("end", () => {

        //   Tutorial.bulkCreate(tutorials)
        //     .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
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

  module.exports = {
    upload,
  };