let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginContainer = document.querySelector(".login-container");
let homeContent = document.querySelector(".home-content");
let invalidLoginParagraph = document.querySelector(".invalid-login");
let invalidSignUpParagraph = document.querySelector(".invalid-signup");
let invalidName = document.querySelector(".invalid-name");
let invalidEmail = document.querySelector(".invalid-email");
let invalidPassword = document.querySelector(".invalid-password");
let loginBtn = document.querySelector('.login-btn');
let signUpBtn = document.querySelector(".sign-up-btn");
let logOutBtn = document.querySelector(".logout");
let loginLink = document.querySelector(".login-paragraph .login-link");
let signUpLink = document.querySelector(".sign-up-paragraph .sign-up-link");
let loginParagraph = document.querySelector(".login-paragraph");
let signUpParagraph = document.querySelector(".sign-up-paragraph");
let nameInputContainer = document.querySelector(".name-input-container");
let welcome = document.querySelector(".welcome");

let regex = {
    name: {
        value: /^[a-zA-Z0-9\s]{3,15}$/,
        isValid: false,
    },
    email: {
        value: /^[a-zA-Z0-9]{2,12}@(gmail|yahoo|hotmail).com$/,
        isValid: false,
    },
    password: {
        value: /^[a-zA-Z0-9]{8,15}$/,
        isValid: false,
    }
};


let users = JSON.parse(localStorage.getItem('users')) || [];
resetForm();
handleContent();

function handleContent() {
    if (localStorage.getItem("isLoggedIn") == "true") {
        loginContainer.classList.add("d-none");
        loginContainer.classList.remove("d-flex");
        homeContent.classList.add("d-block");
        homeContent.classList.remove("d-none");
        welcome.innerHTML = `Welcome, ${localStorage.getItem("userName")}`
    } else {
        loginContainer.classList.remove("d-none");
        loginContainer.classList.add("d-flex");
        homeContent.classList.remove("d-block");
        homeContent.classList.add("d-none");
    }
}

function validateSignUpInputs(input) {
    if (regex[input.id].value.test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid");
        regex[input.id].isValid = true;
        input.nextElementSibling.classList.remove("d-block");
        input.nextElementSibling.classList.add("d-none");
        handleContent()
    } else {
        input.classList.remove("is-valid")
        input.classList.add("is-invalid");
        regex[input.id].isValid = false;
        input.nextElementSibling.classList.add("d-block");
        input.nextElementSibling.classList.remove("d-none");
    }
}

function resetForm() {
    name.value = "";
    email.value = "";
    password.value = "";
    invalidLoginParagraph.classList.add("d-none");
    invalidLoginParagraph.classList.remove("d-block");
    invalidSignUpParagraph.classList.remove("d-block");
    invalidSignUpParagraph.classList.add("d-none")
    invalidName.classList.add("d-none");
    invalidName.classList.remove("d-block");
    invalidEmail.classList.add("d-none");
    invalidEmail.classList.remove("d-block");
    invalidPassword.classList.add("d-none");
    invalidPassword.classList.remove("d-block");
    name.classList.remove("is-valid");
    name.classList.remove("is-invalid");
    email.classList.remove("is-valid");
    email.classList.remove("is-invalid");
    password.classList.remove("is-valid");
    password.classList.remove("is-invalid");
}

function createNewUser(name, email, password) {
    const userObject = {
        name,
        email,
        password
    }

    let currentUsersList = JSON.parse(localStorage.getItem("users")) || [];
    currentUsersList.push(userObject);
    localStorage.setItem("users", JSON.stringify(currentUsersList));
}

function navigateToLoginContent() {
    resetForm();
    nameInputContainer.classList.remove("d-block");
    nameInputContainer.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    loginBtn.classList.add("d-block");
    signUpBtn.classList.add("d-none");
    signUpBtn.classList.remove("d-block");
    loginParagraph.classList.remove("d-none");
    loginParagraph.classList.add("d-block");
    signUpParagraph.classList.remove("d-block");
    signUpParagraph.classList.add("d-none");
}

name.addEventListener("input", () => {
    validateSignUpInputs(name);
});

email.addEventListener("input", () => {
    validateSignUpInputs(email);
});

password.addEventListener("input", () => {
    validateSignUpInputs(password);
});

loginBtn.addEventListener("click", (e) => {
    if (regex.email.isValid && regex.password.isValid) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.length > 0) {
            users.forEach(user => {
                if (user.email === email.value && user.password === password.value) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userName", user.name)
                    handleContent();
                    resetForm()
                } else {
                    invalidLoginParagraph.classList.add("d-block");
                    invalidLoginParagraph.classList.remove("d-none");
                }
            });
        } else {
            invalidLoginParagraph.classList.add("d-block");
            invalidLoginParagraph.classList.remove("d-none");
        }
    } else { 
        if (email.value == "") {
            invalidEmail.classList.add("d-block");
            invalidEmail.classList.remove("d-none");
        } 
        if (password.value == "") {
            invalidPassword.classList.add("d-block");
            invalidPassword.classList.remove("d-none");
        }
        invalidLoginParagraph.classList.add("d-block");
        invalidLoginParagraph.classList.remove("d-none");
    }
});

logOutBtn.addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("userName");
    handleContent();
});

signUpBtn.addEventListener("click", () => {
    invalidLoginParagraph.classList.add("d-none");
    invalidLoginParagraph.classList.remove("d-block");

    let isNewUser = true;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (regex.name.value.test(name.value) && regex.email.value.test(email.value) && regex.password.value.test(password.value)) {
        if (users.length > 0) {
            users.forEach(user => {
                if (user.email === email.value) {
                    isNewUser = false;
                    return;
                }
            });
            if (isNewUser) {
                createNewUser(name.value, email.value, password.value);
                navigateToLoginContent();
            } else {
                invalidSignUpParagraph.classList.remove('d-none');
                invalidSignUpParagraph.classList.add('d-block');
            }

        } else {
            createNewUser(name.value, email.value, password.value);
            navigateToLoginContent();
        }

    } else {
        if (name.value == "") {
            invalidName.classList.add("d-block");
            invalidName.classList.remove("d-none");
        } 
        if (email.value == "") {
            invalidEmail.classList.add("d-block");
            invalidEmail.classList.remove("d-none");
        } 
        if (password.value == "") {
            invalidPassword.classList.add("d-block");
            invalidPassword.classList.remove("d-none");
        }
    }

});

loginLink.addEventListener("click", () => {
    resetForm();
    nameInputContainer.classList.add("d-block");
    nameInputContainer.classList.remove("d-none");
    loginBtn.classList.add("d-none");
    loginBtn.classList.remove("d-block");
    signUpBtn.classList.remove("d-none");
    signUpBtn.classList.add("d-block");
    loginParagraph.classList.add("d-none");
    loginParagraph.classList.remove("d-block");
    signUpParagraph.classList.add("d-block");
    signUpParagraph.classList.remove("d-none");
});

signUpLink.addEventListener("click", navigateToLoginContent);


