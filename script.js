const name = document.getElementById("name");

const lname = document.getElementById("l-name");

const email = document.getElementById("email");

const number = document.getElementById("number");

const address = document.getElementById("Address");

const password = document.getElementById("password");

const submit = document.getElementById("submit");

const image = document.getElementById("avatar");
const resume = document.getElementById("upload-Resume");

function validation() {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (name.value.length === 0 || name.value === null) {
    alert("Fill the form carefully!!");
    name.style.border = "2px solid red";
    return;
  }
  if (lname.value.length === 0 || lname.value === null) {
    alert("Fill the form carefully!!");
    lname.style.border = "2px solid red";
    return;
  }

  if (number.value.match(phoneno)) {
    return true;
  } else {
    alert("Fill the form carefully!!");
    number.style.border = "2px solid red";
    return;
  }
  if (address.value.length === 0 || address.value === null) {
    alert("Fill the form carefully!!");
    address.style.border = "2px solid red";
    return;
  }
  if (email.value.length === 0 || email.value === null) {
    alert("Fill the form carefully!!");
    email.style.border = "2px solid red";
    return;
  }
  if (
    password.value.length === 0 ||
    password.value === null ||
    password.value.length < 4
  ) {
    alert("Fill the form carefully!!");
    password.style.border = "2px solid red";
  }
}

submit.addEventListener("click", () => {
  validation();
});

// <--------------image store in localStorage------------->

image.addEventListener("change", handleImage, false);

function handleImage(event) {
  const files = event.target.files;

  if (files.length === 0) {
    return;
  }
  const file = files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64 = event.target.result;
    localStorage.setItem("image", base64);

    const imageShow = document.getElementById("display");

    imageShow.src = base64;
    imageShow.style.display = "block";
  };
  reader.readAsDataURL(file);
}

resume.addEventListener("change", getResume, false);

function getResume(event) {
  const pdf = event.target.files;
  if (pdf === 0) {
    return;
  }

  const getPdf = pdf[0];

  const pdfReader = new FileReader();

  pdfReader.onload = function (event) {
    const base64pdf = event.target.result;
    localStorage.setItem("pdfSave", base64pdf);
    const pdfShow = document.getElementById("pdfShow");

    pdfShow.src = "data:application/pdf;base64," + base64pdf;
    pdfShow.style.display = "block";
  };
  pdfReader.readAsDataURL(getPdf);
}

// <------------Timer ------->
const time = document.getElementById("hrs");
var countDown = new Date("july 1, 2023 23:47:00").getTime();

const update = setInterval(function () {
  let now = new Date().getTime();

  let diff = countDown - now;

  var second = Math.floor((diff % (1000 * 60)) / 1000);
  var minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var hrs = Math.floor((diff % (1000 * 60 * 24)) / (1000 * 60 * 60));

  //   var days = Math.floor(diff % (1000 * 60 * 60 * 24));

  // if (minute > 10 || second < 10 || hrs < 10) {
  //   time.innerHTML = `0${hrs}:0${minute}:0${second}`;
  // } else {
  time.innerHTML = `${hrs}:${minute}:${second}`;
  // }

  if (diff < 0) {
    resume.disabled = true;
    image.disabled = true;
    time.innerHTML = `Time Has Expired`;
  }
}, 1000);
