var btn_check = document.getElementById('btn-check');
var nik = document.getElementById('nik');
const btn_save = document.getElementById('btn-save');
const btn_logout = document.getElementById('btn_logout');

var ardat = ['0928','2373','00923','36389','9208','27739'];

const colors = ['#00ccff', 'white'];
const bgBlink = document.getElementById('display_body');
let currentColorIndex = 0; 
btn_check.addEventListener("click", function(){
  
   
    randomcheck(0,30);
   
});

btn_save.addEventListener("click", function(){
    
});

btn_logout.addEventListener("click",function(e){
    e.preventDefault();
  	localStorage.removeItem('undian_token');
  	window.location.href = appurl;
});
function randomcheck(i=0,howmany){

 
    let interval = setInterval(() => {

        nik.innerHTML = ardat[Math.floor(Math.random()*ardat.length)];
        i++;
        if (i == howmany) {
          clearInterval(interval);
          const blinkingInterval = 
          setInterval(blinkBackground, 100); 
          setTimeout(() => { 
              clearInterval(blinkingInterval); 
          }, 2000); 
        }
    }, 80);
    //bgBlink.style.backgroundColor = colors[0];

      //bgBlink.style.backgroundColor = 'blue';
     
     
}

function blinkBackground() { 
    bgBlink.style.backgroundColor = 
        colors[currentColorIndex]; 
    currentColorIndex = 
        (currentColorIndex + 1) % colors.length; 
} 