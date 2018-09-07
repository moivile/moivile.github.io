document.documentElement.classList.replace("no-js", "js");

var writeToUsButton = document.querySelector(".contacts-button");
var writeToUsOverlay = document.querySelector(".modal-overlay");

var popupEmailing = document.querySelector(".modal-emailing");
var closeButton = popupEmailing.querySelector(".modal-close");

var form = popupEmailing.querySelector("form");
var username = popupEmailing.querySelector("[name=username]");
var email = popupEmailing.querySelector("[name=email]");
var text = popupEmailing.querySelector("[name=text]");

var isStorageSupport = true;
var usernameFromStorage = "";
var emailFromStorage = "";

try {
  usernameFromStorage = localStorage.getItem("username");
  emailFromStorage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

writeToUsButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupEmailing.classList.add("modal-show");
  writeToUsOverlay.classList.add("modal-show");

  if (usernameFromStorage && emailFromStorage) {
    username.value = usernameFromStorage;
    email.value = emailFromStorage;
    text.focus();
  } else {
    username.focus();
  }
});

closeButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeWriteToUsWindow();
});

writeToUsOverlay.addEventListener("click", closeWriteToUsWindow);

form.addEventListener("submit", function (evt) {
  if (!username.value || !email.value || !text.value) {
    evt.preventDefault();
    popupEmailing.classList.remove("modal-error");
    popupEmailing.offsetWidth = popupEmailing.offsetWidth;
    popupEmailing.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("username", username.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupEmailing.classList.contains("modal-show")) closeWriteToUsWindow();
  }
});

function closeWriteToUsWindow() {
  popupEmailing.classList.remove("modal-show");
  popupEmailing.classList.remove("modal-error");
  writeToUsOverlay.classList.remove("modal-show");
  form.reset();
}
