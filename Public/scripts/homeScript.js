
const dateFromInput = document.getElementById("depart-date");
const dateToInput = document.getElementById("return-date");

dateFromInput.addEventListener("change", function() {
  const dateFrom = new Date(dateFromInput.value);
  const dateTo = new Date(dateToInput.value);

  if (dateFrom > dateTo) {
    dateToInput.value = dateFromInput.value;
  }
});

dateToInput.addEventListener("change", function() {
  const dateFrom = new Date(dateFromInput.value);
  const dateTo = new Date(dateToInput.value);

  if (dateFrom > dateTo) {
    dateFromInput.value = dateToInput.value;
  }
});

var password = document.getElementById("Paswword")
var confirmPassword = document.getElementById("PasswordConfirm");

function validatePassword(){
if(password.value != confirmPassword.value) {
  confirmPassword.setCustomValidity("Τα συνθηματικά δεν ταιριάζουν");
} else {
  confirmPassword.setCustomValidity('');
}
}

var currentDate = new Date();

var passengerToggle = document.getElementById("passengerToggle");
var passengerDropdownContent = document.getElementById("passengerDropdownContent");

passengerToggle.addEventListener("click", function () {
passengerDropdownContent.classList.toggle("show");
passengerToggle.classList.toggle("active");
});

passengerDropdownContent.addEventListener("click", function (event) {
event.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function() {
var profileDropdown = document.querySelector(".profile");
var profileMenu = document.querySelector(".dropdown");
var isProfileMenuOpen = false;

profileDropdown.addEventListener("click", function(event) {
event.stopPropagation();
isProfileMenuOpen = !isProfileMenuOpen;
if (isProfileMenuOpen) {
profileMenu.classList.add("show");
} else {
profileMenu.classList.remove("show");
}
});

document.addEventListener("click", function() {
if (isProfileMenuOpen) {
profileMenu.classList.remove("show");
isProfileMenuOpen = false;
}
});

profileMenu.addEventListener("click", function(event) {
event.stopPropagation();
});
});

document.addEventListener("click", function() {
var profileMenu = document.querySelector(".dropdown");
profileMenu.classList.remove("show");
});

function incrementPassenger(type) {
var input;
if (type === 'adult') {
input = document.getElementById("num0");
} else if (type === 'child') {
input = document.getElementById("num1");
}
var value = parseInt(input.value);
input.value = value + 1;
}

function decrementPassenger(type) {
var input;
if (type === 'adult') {
input = document.getElementById("num0");
} else if (type === 'child') {
input = document.getElementById("num1");
}
var value = parseInt(input.value);
if (value > 0) {
input.value = value - 1;
}
}

