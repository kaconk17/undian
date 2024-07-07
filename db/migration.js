const { pool } = require("../config/connection");

const moment = require("moment");

const {
  hashPassword,
  generateUserToken,
} = require("../middlewares/validation");

const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

pool.on("connect", () => {
  console.log("berhasil koneksi ke DB");
});

const createUserTable = () => {
  const userCreateQuery =
    "CREATE TABLE IF NOT EXISTS tb_users (id UUID PRIMARY KEY,nama VARCHAR(100) NOT NULL,email VARCHAR(100) UNIQUE NOT NULL,password VARCHAR(100) NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)";

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createKaryawantTable = () => {
  const dompetCreateQuery =
    "CREATE TABLE IF NOT EXISTS tb_karyawan (nik VARCHAR(50) PRIMARY KEY,nama VARCHAR(100) NOT NULL,departemen VARCHAR(100) NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)";

  pool
    .query(dompetCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createHadiahTable = () => {
  const dompetCreateQuery =
    "CREATE TABLE IF NOT EXISTS tb_hadiah (id SERIAL PRIMARY KEY,hadiah VARCHAR(100) NOT NULL, qty INT NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)";

  pool
    .query(dompetCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createUndianTable = () => {
  const dompetCreateQuery =
    "CREATE TABLE IF NOT EXISTS tb_undian (id SERIAL PRIMARY KEY,nik VARCHAR(50) REFERENCES tb_karyawan(nik) ON DELETE CASCADE,id_hadiah int NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)";

  pool
    .query(dompetCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTable = () => {
  createUserTable();
  createKaryawantTable();
  createHadiahTable();
  createUndianTable();
};

const createUser = async () => {
  const nama = process.env.NAMA_USER;
  const email = process.env.EMAIL_USER;
  const password = process.env.PASS_USER;
  const created_on = moment(new Date());

  const id = uuidv4();
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
      tb_users(id, nama, email, password, created_at)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
  const values = [id, nama, email, hashedPassword, created_on];
  pool
    .query(createUserQuery, values)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createAllTable,
  createUser,
};

if (process.argv[2] === "createAllTable") {
  createAllTable();
}

if (process.argv[2] === "createUser") {
  createUser();
}
