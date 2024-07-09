const moment = require("moment");
const { pool } = require("../config/connection");

const { empty, isEmpty } = require("../middlewares/validation");
const {
  errorMessage,
  successMessage,
  status,
} = require("../middlewares/status");
const fs = require("fs");
const path = require("path");

const createHadiah = async (req, res) => {
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
      tb_hadiah (hadiah, qty, created_at)
      VALUES($1, $2, $3) returning *`;
  const values = [hadiah, qty, created_on];
  try {
    const response = await pool.query(createInQuery, values);
    const Response = response.rows[0];
    successMessage.data = Response;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Create hadiah gagal";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllhadiah = async (req, res) => {
  const getHadiahQuery = "SELECT * FROM tb_hadiah";

  try {
    const { rows } = await pool.query(getHadiahQuery);
    const Response = rows;

    successMessage.data = Response;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getHadiah = async (req, res) => {
  const { Id } = req.params;
  if (isEmpty(Id)) {
    errorMessage.error = "ID tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }
  const getInQuery = "SELECT * FROM tb_hadiah WHERE id = $1";
  try {
    const { rows } = await pool.query(getInQuery, [Id]);
    const inResponse = rows[0];
    if (!inResponse) {
      errorMessage.error = "ID tidak valid";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = inResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateHadiah = async (req, res) => {
  const { Id } = req.params;
  const { hadiah, qty } = req.body;
  if (isEmpty(Id)) {
    errorMessage.error = "ID tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }
  if (isEmpty(hadiah)) {
    errorMessage.error = "Nama hadiah tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }
  if (empty(qty)) {
    errorMessage.error = "Qty tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }
  const getInQuery =
    "UPDATE tb_hadiah SET hadiah = $1, qty = $2 WHERE id = $3 returning *";
  try {
    const { rows } = await pool.query(getInQuery, [hadiah, qty, Id]);
    const inResponse = rows[0];
    if (!inResponse) {
      errorMessage.error = "ID tidak valid";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = inResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};
const deleteHadiah = async (req, res) => {
  const { Id } = req.params;
  if (isEmpty(Id)) {
    errorMessage.error = "ID tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }

  const findquery = "SELECT * FROM tb_hadiah WHERE id = $1";

  const delQuery = "DELETE FROM tb_hadiah WHERE id = $1";
  try {
    const { rows } = await pool.query(findquery, [Id]);
    const dbResponse = rows[0];
    var gambar = dbResponse.gambar;
    let filepath = path.join(__dirname, "../public/img/photo/" + gambar);
    await pool.query(delQuery, [Id]);
    successMessage.data.message = "Hapus data berhasil";
    fs.unlinkSync(filepath);
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createUndian = async (req, res) => {
  const { hadiah, nik, ket} = req.body;

  if (isEmpty(hadiah)) {
    errorMessage.error = "Nama hadiah tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }
  if (empty(nik)) {
    errorMessage.error = "NIK tidak boleh kosong";
    return res.status(status.bad).send(errorMessage);
  }

  const created_on = moment(new Date());
  const createInQuery = `INSERT INTO
      tb_undian (nik, id_hadiah,jenis, created_at)
      VALUES($1, $2, $3,$4) returning *`;
  const values = [nik, hadiah,ket, created_on];
  try {
    const response = await pool.query(createInQuery, values);
    const Response = response.rows[0];
    successMessage.data = Response;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Create Undian gagal";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllUndian = async (req, res) => {
  const getHadiahQuery =
    "select a.nik, b.nama ,b.departemen , c.hadiah , a.jenis, to_char(a.created_at, 'YYYY-MM-DD') as tgl  from tb_undian a join tb_karyawan b on a.nik = b.nik join tb_hadiah c on a.id_hadiah = c.id";

  try {
    const { rows } = await pool.query(getHadiahQuery);
    const Response = rows;

    successMessage.data = Response;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Operation was not successful";
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = {
  createHadiah,
  getAllhadiah,
  getHadiah,
  updateHadiah,
  deleteHadiah,
  createUndian,
  getAllUndian,
};
