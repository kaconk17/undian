var btn_check = document.getElementById("btn-check");
var nik = document.getElementById("nik");
const btn_save = document.getElementById("btn-save");
const btn_logout = document.getElementById("btn_logout");
const selHadiah = document.getElementById("hadiah");
const winName = document.getElementById("nama_pemenang");
const jHadiah = document.getElementById("jHadiah");
const imgHadiah = document.getElementById("imgHadiah");
const btnDis = document.getElementById("btn-dis");

var ardat = [];
var namdat = [];
var winner = "";
var prize = "";
var undi = false;

const colors = ["#9966ff", "white"];
const bgBlink = document.getElementById("display_body");
let currentColorIndex = 0;
fetch(appurl + "/karyawan/getundi", {
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
      for (let i = 0; i < res.data.length; i++) {
        ardat.push(res.data[i].nik);
        namdat.push(res.data[i].nama);
      }
      document.getElementById("tot_peserta").innerHTML =
        "Total Peserta : " + ardat.length + " Orang";
    } else {
      alert(res.error);
    }
  })
  .catch((error) => {
    console.log(error);
  });

fetch(appurl + "/undian/getall", {
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
      var pemenang = document.getElementById("list_pemenang");
      var dis = document.getElementById("list_dis");
      var nomer = 1;
      var nomer1 = 1;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].jenis == "winner") {
          var newrow =
            "<tr><td>" +
            nomer +
            "</td><td>" +
            res.data[i].nik +
            "</td><td>" +
            res.data[i].nama +
            "</td><td>" +
            res.data[i].departemen +
            "</td><td>" +
            res.data[i].hadiah +
            "</td><td>" +
            res.data[i].tgl +
            "</td></tr>";
          pemenang.insertAdjacentHTML("beforeend", newrow);
          nomer++;
        }else{
          var newrow =
          "<tr><td>" +
          nomer1 +
          "</td><td>" +
          res.data[i].nik +
          "</td><td>" +
          res.data[i].nama +
          "</td><td>" +
          res.data[i].departemen +
          "</td><td>" +
          res.data[i].hadiah +
          "</td><td>" +
          res.data[i].tgl +
          "</td></tr>";
          dis.insertAdjacentHTML("beforeend",newrow);
          nomer1++;
        }
      }
    } else {
      alert(res.error);
    }
  })
  .catch((error) => {
    console.log(error);
  });

btn_check.addEventListener("click", function () {
  if (selHadiah.value == "" || ardat.length == 0) {
    alert("Hadiah belum dipilih!");
  } else {
    //btn_check.disabled = true;
    if (undi) {
      undi = false;
      btn_check.innerHTML = "Start";
      btn_check.className = "btn btn-success btn-lg";
    } else {
      undi = true;
      btn_check.innerHTML = "Stop";
      btn_check.className = "btn btn-danger btn-lg";
    }
    btn_save.disabled = true;
    btnDis.disabled = true;

    randomcheck();
  }
});

function getHadiah() {
  prize = selHadiah.value;
  jHadiah.innerHTML = selHadiah.selectedOptions[0].text;

  fetch(appurl + "/hadiah/get/" + prize, {
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
        imgHadiah.innerHTML =
          "<img src='static/img/photo/" +
          res.data.gambar +
          "' class='img-fluid' style='width:auto; height:400px'>";
      } else {
        alert(res.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
btn_save.addEventListener("click", function () {
  if (winner == "") {
    alert("Pemenang belum dipilih !");
  } else {
    var y = confirm("Apakah anda akan menyimpan pemenang undian ?");
    if (y) {
     createUndian("winner");
    }
  }
});

btn_logout.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("undian_token");
  window.location.href = appurl;
});

btnDis.addEventListener("click",function () {
  if (winner == "") {
    alert("Pemenang belum dipilih !");
  } else {
    var y = confirm("Apakah anda akan diskualifikasi pemenang undian ?");
    if (y) {
     createUndian("dis");
    }
  }
});

function randomcheck() {
  winner = "";
  prize = "";
  bgBlink.style.backgroundColor = colors[1];
  let interval = setInterval(() => {
    var indx = Math.floor(Math.random() * ardat.length);
    winner = ardat[indx];
    prize = selHadiah.value;
    nik.innerHTML = winner;
    winName.innerHTML = namdat[indx];
    if (!undi) {
      clearInterval(interval);
      const blinkingInterval = setInterval(blinkBackground, 100);
      setTimeout(() => {
        clearInterval(blinkingInterval);

        bgBlink.style.backgroundColor = colors[0];
        btn_check.disabled = false;
        btn_save.disabled = false;
        btnDis.disabled = false;
      }, 2000);
    }
  }, 80);
}

function createUndian(win) {
  let postObj = {
    hadiah: prize,
    nik: winner,
    ket:win,
  };
  let post = JSON.stringify(postObj);
  const url = appurl + "/undian/create";
  fetch(url, {
    method: "post",
    body: post,
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
        alert("Data berhasil disimpan");
        window.location.href = appurl + "/main";
      } else {
        alert(res.error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function blinkBackground() {
  bgBlink.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}
