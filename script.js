const form = document.querySelector("form");
const inputs =document.querySelectorAll("input, select");

inputs.forEach(input=>{
   input.addEventListener("blur", function (){
   validateField(input);
 });
   input.addEventListener("input", function (){
   clearFieldError(input);
 });
});
// A partir d'ici on commence le blur
function validateField(field){
    clearFieldError(field);
    if(field.value.trim() === ""){
        showError(field,"This field is required");
    }

    if(field.type ==="email"){
        validateEmailField(field);
    }
    else if (field.name === "password" ||field.name ==="repeat-password"){
        validatePasswordsFields();
    }
    else if (field.name ==="Telephone"){
        validatePhoneField(field);
    }
}

function clearFieldError(field) {
    const parent =field.parentElement;
    const error= parent.querySelector(".error");
    if(error) {
        error.remove();
    }
}

function validateEmailField(field){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field.value.trim() === "" ) {
        return; 
     }

    if(!regex.test(field.value)){
        showError(field, "Invalid email");
    }
}

function validatePasswordsFields(){
    const pass1= document.querySelector('input[name="password"]');
    const pass2= document.querySelector('input[name="repeat-password"]');

    clearFieldError(pass2);
     if (pass1.value.trim() === "" || pass2.value.trim() === "") {
        return; 
     }

    if (pass1.value !== pass2.value) {
        showError(pass2, "The two passwords do not match");
    }
}

function validatePhoneField(field){
 if (field.value.trim() === "" ) {
        return; 
     } 
    if (!/^\+?\d+$/.test(field.value)) {
        showError(field, "The phone must contain only numbers");
    }
}



form.addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
});
// A partir d'ici c'est la validation normale du formulaire
function validateForm() {
    let isValid = true;

    clearErrors();

    if (!checkEmptyFields()) isValid = false;
    if (!checkEmail()) isValid = false;
    if (!checkPasswords()) isValid = false;
    if (!checkPhone()) isValid = false;

    if (isValid) {
        alert("Form sent successfully!");
        form.submit();
    }
}

function checkEmptyFields() {
    let valid = true;
    const fields = document.querySelectorAll("input, select");

    fields.forEach(field => {
        if (field.value.trim() === "") {
            showError(field, "This field is required");
            valid = false;
        }
    });

    return valid;
}

function checkEmail() {
    const email = document.querySelector('input[type="email"]');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.value.trim()=== ""){
        return true;
    }
    

    if (!regex.test(email.value)) {
        showError(email, "Invalid email");
        return false;
    }
    return true;
}

function checkPasswords() {
    const pass1 = document.querySelector('input[name="password"]');
    const pass2 = document.querySelector('input[name="repeat-password"]');

    if (pass1.value !== pass2.value) {
        showError(pass2, "The two passwords do not match");
        return false;
    }
    return true;
}

function checkPhone() {
    const phone = document.querySelector('input[name="Telephone"]');

    if(phone.value.trim() === ""){
        return true;
    }

    if (!/^\+?\d+$/.test(phone.value)) {
        showError(phone, "The phone must contain only numbers");
        return false;
    }
    return true;
}

function showError(field, message) {
    const error = document.createElement("span");
    error.classList.add("error");
    error.textContent = message;
    field.parentElement.appendChild(error);
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.remove());
}
