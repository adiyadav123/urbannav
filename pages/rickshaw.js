const webCamElement = document.getElementById("webCam");
const canvas = document.getElementById("canvas");
const webcam =  new Webcam(webCamElement, "qr", canvas);

webcam.start();