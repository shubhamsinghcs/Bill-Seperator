// let signupBtn = document.getElementById("signupBtn");
// let signinBtn = document.getElementById("signinBtn");
// let nameField = document.getElementById("nameField");
// let title = document.getElementById("title");

// signupBtn.onclick = function () {
//   nameField.style.display = "block";
//   title.innerText = "Sign Up";
//   signupBtn.classList.remove("disable");
//   signinBtn.classList.add("disable");
// };

// signinBtn.onclick = function () {
//   nameField.style.display = "none";
//   title.innerText = "Sign In";
//   signupBtn.classList.add("disable");
//   signinBtn.classList.remove("disable");
// };




let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

let form = document.getElementById("auth-form");
let inputs = form.getElementsByTagName("input");

let isSignupMode = true;

// Toggle Signup Mode
signupBtn.onclick = function () {
  isSignupMode = true;
  nameField.style.display = "block";
  title.innerText = "Sign Up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
};

// Toggle Signin Mode
signinBtn.onclick = function () {
  isSignupMode = false;
  nameField.style.display = "none";
  title.innerText = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};

// Handle Form Submit
form.onsubmit = function (e) {
  e.preventDefault();

  let name = inputs[0].value.trim();
  let email = inputs[1].value.trim();
  let password = inputs[2].value;

  if (isSignupMode) {
    // Sign Up logic
    if (!email || !password || !name) {
      alert("Please fill all fields!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    let userExists = users.find(user => user.email === email);
    if (userExists) {
      alert("User already exists!");
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful! Now Sign In.");
      // Clear fields
      form.reset();
    }
  } else {
    // Sign In logic
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Welcome back, ${user.name}!`);
      // Redirect logic here (optional)
    } else {
      alert("Invalid email or password.");
    }
  }
};