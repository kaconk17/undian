const loginForm = document.getElementById('frm_login');

loginForm.addEventListener('submit',function(e){
    e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
    const url = appurl+'/auth/signin';
   
    
    if (email.value == "" || password.value == "") {
        alert("Email & Password harus diisi !");
    }else{
        let postObj = {
            email:email.value,
            password:password.value
        }
        let post = JSON.stringify(postObj);
       
        fetch(url, {
            method: 'post',
            body: post,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
           
            return response.json()
        }).then((res) => {
            if (res.status == 'success') {
                //console.log(res.data.token);
                localStorage.setItem('undian_token',res.data.token);
                window.location.href=appurl+'/main';
            }
        }).catch((error) => {
            console.log(error)
        })
    }
   
})