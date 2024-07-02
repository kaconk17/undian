var btn_check = document.getElementById('btn-check');
var nik = document.getElementById('nik');
var ardat = ['0928','2373','00923','36389','9208','27739'];
btn_check.addEventListener("click", function(){
    //console.log("test");
    // for (let index = 0; index < 300; index++) {
    //    nik.innerHTML = ardat[Math.floor(Math.random()*ardat.length)];
        
    // }
    randomcheck(0,50000);
});

function randomcheck(i=0,howmany){

    for (let index = 0; index < howmany; index++) {
       
        setTimeout(function(){
    
            nik.innerHTML = ardat[Math.floor(Math.random()*ardat.length)];
        },2000);
    }
     
     
}