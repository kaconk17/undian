var btn_check = document.getElementById("btn-check");
var nik = document.getElementById("nik");
const btn_save = document.getElementById("btn-save");
const btn_logout = document.getElementById("btn_logout");
const selHadiah = document.getElementById("hadiah");

var ardat = [];

const colors = ["#00ccff", "white"];
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
      }
    } else {
      alert(res.error);
    }
  })
  .catch((error) => {
    console.log(error);
  });

btn_check.addEventListener("click", function () {
  randomcheck(0, 30);
});

btn_save.addEventListener("click", function () {});

btn_logout.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("undian_token");
  window.location.href = appurl;
});
function randomcheck(i = 0, howmany) {
  let interval = setInterval(() => {
    nik.innerHTML = ardat[Math.floor(Math.random() * ardat.length)];
    i++;
    if (i == howmany) {
      clearInterval(interval);
      const blinkingInterval = setInterval(blinkBackground, 100);
      setTimeout(() => {
        clearInterval(blinkingInterval);
      }, 2000);
    }
  }, 80);
  //bgBlink.style.backgroundColor = colors[0];

  //bgBlink.style.backgroundColor = 'blue';
}

function blinkBackground() {
  bgBlink.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}
