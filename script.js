let pickUp = document.querySelector(".bor_less");
let drop = document.querySelector(".bor");
let button = document.querySelector(".check_butt");
let loader = document.querySelector(".loader");


window.onbeforeunload = () => {
    window.location.href("#loader");
}

window.onload = () => {
    setTimeout(() => {
        loader.style.display = "none";
    }, 2000);

    button.addEventListener("click", () => {
        if (! pickUp.value && ! drop.value) {
            return swal({title: "Pickup and drop locations are required", icon: "warning"});
        } else if (! pickUp.value) {
            return swal({title: "Pickup location is required", icon: "warning"});
        } else if (! drop.value) {
            return swal({title: "Drop location is required", icon: "warning"});
        } else {
            return;
        }
    });

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video: true})
    }

}
