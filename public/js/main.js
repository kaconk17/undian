var btn_check = document.getElementById("btn-check");
var nik = document.getElementById("nik");
const btn_save = document.getElementById("btn-save");
const btn_logout = document.getElementById("btn_logout");
const selHadiah = document.getElementById("hadiah");
const winName = document.getElementById("nama_pemenang");

var ardat = [];
var namdat = [];
var winner = "";
var prize = "";

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
      var nomer = 1;
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
          "</td><td>" +
          res.data[i].hadiah +
          "</td><td>" +
          res.data[i].tgl +
          "</td></tr>";
        pemenang.insertAdjacentHTML("beforeend", newrow);
        nomer++;
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
    randomcheck(0, 30);
  }
});

btn_save.addEventListener("click", function () {
  if (winner == "") {
    alert("Pemenang belum dipilih !");
  } else {
    var y = confirm("Apakah anda akan menyimpan pemenang undian ?");
    if (y) {
      let postObj = {
        hadiah: prize,
        nik: winner,
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
            alert("Pemenang berhasil disimpan");
            window.location.href = appurl + "/main";
          } else {
            alert(res.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});

btn_logout.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("undian_token");
  window.location.href = appurl;
});
function randomcheck(i = 0, howmany) {
  winner = "";
  prize = "";
  bgBlink.style.backgroundColor = colors[1];
  let interval = setInterval(() => {
    var indx = Math.floor(Math.random() * ardat.length);
    winner = ardat[indx];
    prize = selHadiah.value;
    nik.innerHTML = winner;
    winName.innerHTML = namdat[indx];
    i++;
    if (i == howmany) {
      clearInterval(interval);
      const blinkingInterval = setInterval(blinkBackground, 100);
      setTimeout(() => {
        clearInterval(blinkingInterval);

        bgBlink.style.backgroundColor = colors[0];
      }, 2000);
    }
  }, 80);
}

function blinkBackground() {
  bgBlink.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}
