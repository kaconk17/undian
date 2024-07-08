const simpan = document.getElementById("save_hadiah");
const nama_hadiah = document.getElementById("nama_hadiah");
const qty = document.getElementById("qty_hadiah");
const frmHadiah = document.getElementById("frm_hadiah");

fetch(appurl + "/hadiah/getall", {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("undian_token"),
  },
})
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    if (res.status == "success") {
      var tblist = document.getElementById("list_hadiah");
      var nomer = 1;
      for (let i = 0; i < res.data.length; i++) {
        var newrow =
          "<tr><td>" +
          nomer +
          "</td><td>" +
          res.data[i].id +
          "</td><td>" +
          res.data[i].hadiah +
          "</td><td>" +
          res.data[i].qty +
          "</td><td><img src='static/img/" +
          res.data[i].gambar +
          "' class='img-fluid' style='heigth:50px;width:50px;'></td><td><button class='btn btn-danger' onClick='del_row(" +
          res.data[i].id +
          ")' type='button'>Del</button></td></tr>";
        tblist.insertAdjacentHTML("beforeend", newrow);
        nomer++;
      }
    } else {
      alert(res.error);
    }
  })
  .catch((error) => {
    console.log(error);
  });

fetch(appurl + "/karyawan/getall", {
  method: "get",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("undian_token"),
  },
})
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    if (res.status == "success") {
      var tblist = document.getElementById("list_karyawan");
      var title = document.getElementById("karyawan_title");
      var nomer = 1;
      title.innerHTML = "Data Karyawan " + res.data.length + " orang";
      for (let i = 0; i < res.data.length; i++) {
        var newrow =
          "<tr><td>" +
          nomer +
          "</td><td>" +
          res.data[i].nik +
          "</td><td>" +
          res.data[i].nama +
          "</td><td>" +
          res.data[i].departemen +
          "</td></tr>";
        tblist.insertAdjacentHTML("beforeend", newrow);
        nomer++;
      }
    } else {
      alert(res.error);
    }
  })
  .catch((error) => {
    console.log(error);
  });

frmHadiah.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nama_hadiah.value == "" || qty.value == "") {
    alert("Data belum lengkap !");
  } else {
    const formData = new FormData(document.querySelector("#frm_hadiah"));
    // let postObj = {
    //   hadiah: nama_hadiah.value,
    //   qty: qty.value,
    // };
    // let post = JSON.stringify(postObj);

    const url = appurl + "/hadiah/create";
    fetch(url, {
      method: "post",
      body: formData,
      headers: {
        //Accept: "application/json",
        //"Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("undian_token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status == "success") {
          //console.log(res.data.token);
          alert("Simpan data berhasil");
          window.location.href = appurl + "/settings";
        } else {
          alert(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function del_row(id) {
  var y = confirm("Apakah anda akan menghapus data id :" + id + " ?");
  if (y) {
    const url = appurl + "/hadiah/del/" + id;
    fetch(url, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("undian_token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status == "success") {
          //console.log(res.data.token);
          alert("Hapus data berhasil");
          window.location.href = appurl + "/settings";
        } else {
          alert(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
