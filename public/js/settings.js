const simpan = document.getElementById("save_hadiah");
const nama_hadiah = document.getElementById("nama_hadiah");
const qty = document.getElementById("qty_hadiah");
const frmHadiah = document.getElementById("frm_hadiah");

frmHadiah.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nama_hadiah.value == "" || qty.value == "") {
    alert("Data belum lengkap !");
  } else {
    let postObj = {
      hadiah: nama_hadiah.value,
      qty: qty.value,
    };
    let post = JSON.stringify(postObj);
    const url = appurl + "/auth/signin";
    fetch(url, {
      method: "post",
      body: post,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status == "success") {
          //console.log(res.data.token);
          localStorage.setItem("undian_token", res.data.token);
          window.location.href = appurl + "/main";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
