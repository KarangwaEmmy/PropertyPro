// Code to toggle menu in smaller devices

function myFunction(){
    var x = document.getElementById("site-nav");
    if (x.style.display === "block") {
        x.style.display = "none";
    }else{
        x.style.display = "block";
    }
}

// checkbox manager

var btnSubscribe = document.getElementById("btnSubmitSubscribe");

btnSubscribe.addEventListener("click", function (evt) {

    evt.preventDefault();

    var subscribe = document.querySelector("[name=subscribe]");

    console.log(subscribe.value); //writes 'newsletter'

    return false;

});