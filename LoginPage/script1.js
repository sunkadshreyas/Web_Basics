// js file for registration page
let registerClick = document.querySelector("#register");

registerClick.addEventListener('click',function(){
    alert("Registration Successfull!!");
    registerClick.removeEventListener('click',RegisterClicked);
});