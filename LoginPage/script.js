//js file for sign in page

let text = document.querySelector("#text");
let password = document.querySelector("#password");
let submitBtn = document.querySelector("#login");
let registerBtn = document.querySelector("#account");


registerBtn.addEventListener('click',function(){
    alert("Do you want to redirect to Register Page!!!");
    document.location = 'index1.html';
    registerBtn.removeEventListener('click',RegsiterFunction);
});



submitBtn.addEventListener('click',function(){
    let username = text.value;
    let passtext = password.value;
    if (username==='' || passtext===''){
        alert("Empty username or password field not allowed!!!");
    }
    else if (username==='shreyas' && passtext==='abcd'){
        alert("Login Successful!!!");
    }
    else
        alert("Credentials do not match!!!");
    BtnClick.removeEventListener('click',BtnClick);
});





 