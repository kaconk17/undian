const { pool } = require("../config/connection");

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
    "CREATE TABLE IF NOT EXISTS tb_undian (id SERIAL PRIMARY KEY,nik VARCHAR(50) REFERENCES tb_karyawan(nik) ON DELETE CASCADE,id_hadiah VARCHAR(50) NOT NULL,created_at TIMESTAMP,updated_at TIMESTAMP)";

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

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createAllTable,
};

if (process.argv[2] === "createAllTable") {
  createAllTable();
}
