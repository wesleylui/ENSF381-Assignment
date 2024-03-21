function validateSignup() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var email = document.getElementById("email").value;

  errorMessage.textContent = "";

  var errorOccured = false;

  if (!isValidUsername(username)) {
    displayErrorMessage("Check the Username.");
    errorOccured = true;
  }

  if (!isValidPassword(password)) {
    displayErrorMessage("Invalid password format.");
    errorOccured = true;
  }

  if (password !== confirmPassword) {
    displayErrorMessage("Passwords doesn't match.");
    errorOccured = true;
  }

  if (!isValidEmail(email)) {
    displayErrorMessage("Check the Email.");
    errorOccured = true;
  }

  if (errorOccured) {
    return;
  }
  displaySuccessMessage("Signup successful!");
}

function isValidUsername(username) {
  var usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
  return usernameRegex.test(username);
}

function isValidPassword(password) {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()-_=+[\]{}|;:'",.<>?/`~]{8,}$/;
  return passwordRegex.test(password);
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayErrorMessage(message) {
  var errorMessage = document.getElementById("errorMessage");
  var messageBox = document.getElementById("messageBox");

  errorMessage.textContent += message + "\n";
}

function displaySuccessMessage(message) {
  var errorMessage = document.getElementById("errorMessage");
  var messageBox = document.getElementById("messageBox");

  errorMessage.textContent = message;
}
