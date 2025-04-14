// ------------------------
// Cookie Functions for Remembering User's First Name
// ------------------------
function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
function eraseCookie(name) {
  setCookie(name, "", -1);
}

function rememberUser() {
  if (document.getElementById("rememberMe").checked) {
    var userId = document.getElementById("userID").value.trim();
    setCookie("userID", userId, 2); // Set cookie for 2 days (48 hours)
  } else {
    eraseCookie("userID");
  }
}

function checkUserCookie() {
  var uid = getCookie("userID");
  var welcomeMessage = document.getElementById("welcomeMessage");
  var notUserElem = document.getElementById("notUser");
  if (uid !== "") {
    welcomeMessage.textContent = "Welcome back, " + uid;
    document.getElementById("userID").value = uid;
    notUserElem.style.display = "block";
    notUserElem.textContent = "Not " + uid + "? Click here to start as a new user.";
  } else {
    welcomeMessage.textContent = "Hello New User";
    notUserElem.style.display = "none";
  }
}
function resetUserCookie() {
  eraseCookie("userID");
  document.getElementById("userID").value = "";
  checkUserCookie();
  document.forms[0].reset();
}

// ------------------------
// Helper Functions for Field Validation
// ------------------------

function validateDOB(dob) {
  if (!dob || dob.trim() === "") {
    return "ERROR: Missing Date of Birth";
  }
  var dobDate = new Date(dob);
  var today = new Date();
  if (dobDate > today) {
    return "ERROR: Cannot be in the future";
  }
  var diff = today - dobDate;
  var age = diff / (365.25 * 24 * 60 * 60 * 1000);
  if (age > 120) {
    return "ERROR: Age cannot be more than 120 years";
  }
  return "pass";
}

function validateEmail(email) {
  if (!email || email.trim() === "") {
    return "ERROR: Missing Email";
  }
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? "pass" : "ERROR: Invalid email format";
}

function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return "ERROR: Missing Phone Number";
  }
  var regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(phone) ? "pass" : "ERROR: Phone number must be in 000-000-0000 format";
}

function validateUserID(userID) {
  if (!userID || userID.trim() === "") {
    return "ERROR: Missing User ID";
  }
  var regex = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/;
  return regex.test(userID) ? "pass" : "ERROR: Invalid User ID format";
}

function validatePasswordReview(pwd, cpwd) {
  if (!pwd || !cpwd) {
    return "ERROR: Missing Password";
  }
  if (pwd !== cpwd) {
    return "ERROR: Passwords do not match";
  }
  var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\\/><.,`~])[A-Za-z\d!@#%^&*()\-_+=\\/><.,`~]{8,30}$/;
  if (!regex.test(pwd)) {
    return "ERROR: Password must be 8-30 characters with at least one uppercase, one digit, and one special character";
  }
  return "pass";
}

// ------------------------
// Dynamic Validation Functions for Each Field
// ------------------------

function validateFirstNameField() {
  var firstName = document.getElementById("firstName").value.trim();
  var errorSpan = document.getElementById("firstNameError");
  var regex = /^[A-Za-z'\-]{1,30}$/;
  if(firstName === ""){
    errorSpan.textContent = "ERROR: Missing First Name";
    return false;
  }
  if(!regex.test(firstName)){
    errorSpan.textContent = "ERROR: Only letters, apostrophes, and dashes allowed";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateMiddleInitialField() {
  var mi = document.getElementById("middleInitial").value.trim();
  var errorSpan = document.getElementById("middleInitialError");
  var regex = /^[A-Za-z]$/;
  if(mi === ""){
    errorSpan.textContent = "";
    return true; // Optional
  }
  if(!regex.test(mi)){
    errorSpan.textContent = "ERROR: Must be a single letter";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateLastNameField() {
  var lastName = document.getElementById("lastName").value.trim();
  var errorSpan = document.getElementById("lastNameError");
  var regex = /^[A-Za-z'\-]{1,30}$/;
  if(lastName === ""){
    errorSpan.textContent = "ERROR: Missing Last Name";
    return false;
  }
  if(!regex.test(lastName)){
    errorSpan.textContent = "ERROR: Only letters, apostrophes, and dashes allowed";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateDOBField() {
  var dob = document.getElementById("dob").value.trim();
  var errorSpan = document.getElementById("dobError");
  var result = validateDOB(dob);
  errorSpan.textContent = (result === "pass") ? "" : result;
  return result === "pass";
}

function validateSSNField() {
  var ssn = document.getElementById("ssn").value.trim();
  var errorSpan = document.getElementById("ssnError");
  if(ssn === ""){
    errorSpan.textContent = "ERROR: Missing Social Security";
    return false;
  }
  // Expect formatted SSN: XXX-XX-XXXX
  var regex = /^\d{3}-\d{2}-\d{4}$/;
  if(!regex.test(ssn)){
    errorSpan.textContent = "ERROR: SSN must be formatted as 123-45-6789";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateAddress1Field() {
  var addr = document.getElementById("address1").value.trim();
  var errorSpan = document.getElementById("address1Error");
  if(addr === ""){
    errorSpan.textContent = "ERROR: Missing Address";
    return false;
  }
  if(addr.length < 2 || addr.length > 30){
    errorSpan.textContent = "ERROR: Must be 2-30 characters";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateAddress2Field() {
  var addr = document.getElementById("address2").value.trim();
  var errorSpan = document.getElementById("address2Error");
  if(addr === ""){
    errorSpan.textContent = "";
    return true; // Optional field
  }
  if(addr.length < 2 || addr.length > 30){
    errorSpan.textContent = "ERROR: Must be 2-30 characters";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateCityField() {
  var city = document.getElementById("city").value.trim();
  var errorSpan = document.getElementById("cityError");
  if(city === ""){
    errorSpan.textContent = "ERROR: Missing City";
    return false;
  }
  if(city.length < 2 || city.length > 30){
    errorSpan.textContent = "ERROR: City must be 2-30 characters";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateStateField() {
  var state = document.getElementById("state").value.trim();
  var errorSpan = document.getElementById("stateError");
  if(state === ""){
    errorSpan.textContent = "ERROR: Must select a state";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateZipField() {
  var zip = document.getElementById("zip").value.trim();
  var errorSpan = document.getElementById("zipError");
  if(zip === ""){
    errorSpan.textContent = "ERROR: Missing Zip";
    return false;
  }
  var regex = /^\d{5}(-\d{4})?$/;
  if(!regex.test(zip)){
    errorSpan.textContent = "ERROR: Invalid Zip format";
    return false;
  }
  errorSpan.textContent = "";
  return true;
}

function validateEmailField() {
  var email = document.getElementById("email").value.trim();
  var errorSpan = document.getElementById("emailError");
  var result = validateEmail(email);
  errorSpan.textContent = (result === "pass") ? "" : result;
  return result === "pass";
}

function validatePhoneField() {
  var phone = document.getElementById("phone").value.trim();
  var errorSpan = document.getElementById("phoneError");
  var result = validatePhone(phone);
  errorSpan.textContent = (result === "pass") ? "" : result;
  return result === "pass";
}

function validateUserIDField() {
  var userID = document.getElementById("userID").value.trim();
  var errorSpan = document.getElementById("userIDError");
  var result = validateUserID(userID);
  errorSpan.textContent = (result === "pass") ? "" : result;
  return result === "pass";
}

// ------------------------
// Auto-format Functions
// ------------------------

// Auto-format Social Security Number as the user types.
// Expected format: XXX-XX-XXXX
function autoFormatSSN() {
  var ssnField = document.getElementById("ssn");
  var value = ssnField.value;
  // Remove all non-digit characters
  value = value.replace(/\D/g, "");
  // Insert dashes as needed to format as XXX-XX-XXXX
  if (value.length > 3 && value.length <= 5) {
    value = value.substring(0, 3) + "-" + value.substring(3);
  } else if (value.length > 5) {
    value = value.substring(0, 3) + "-" + value.substring(3, 5) + "-" + value.substring(5, 9);
  }
  ssnField.value = value;
}

// Auto-format Phone Number as the user types.
// Expected format: 000-000-0000
function autoFormatPhone() {
  var phoneField = document.getElementById("phone");
  var value = phoneField.value;
  // Remove all non-digit characters
  value = value.replace(/\D/g, "");
  if (value.length > 3 && value.length <= 6) {
    value = value.substring(0, 3) + "-" + value.substring(3);
  } else if (value.length > 6) {
    value = value.substring(0, 3) + "-" + value.substring(3, 6) + "-" + value.substring(6, 10);
  }
  phoneField.value = value;
}

// ------------------------
// Form and Review Functions
// ------------------------

function checkForm() {
  var valid = true;
  valid = validateFirstNameField() && valid;
  valid = validateMiddleInitialField() && valid;
  valid = validateLastNameField() && valid;
  valid = validateDOBField() && valid;
  valid = validateSSNField() && valid;
  valid = validateAddress1Field() && valid;
  valid = validateCityField() && valid;
  valid = validateStateField() && valid;
  valid = validateZipField() && valid;
  valid = validateEmailField() && valid;
  valid = validatePhoneField() && valid;
  valid = validateUserIDField() && valid;
  
  // Explicitly validate the password fields
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var pwdStatus = validatePasswordReview(password, confirmPassword);
  if (pwdStatus !== "pass") {
    // Set the error message in the dedicated span and alert the user
    document.getElementById("passwordError").textContent = pwdStatus;
    alert("Please fix the password error before submitting.");
    valid = false;
  }
  return valid;
}

function reviewData() {
    // Get trimmed values from form fields
    var firstName = document.getElementById("firstName").value.trim();
    var middleInitial = document.getElementById("middleInitial").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var dob = document.getElementById("dob").value.trim();
    var ssn = document.getElementById("ssn").value.trim();
    var address1 = document.getElementById("address1").value.trim();
    var address2 = document.getElementById("address2").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value.trim();
    var zip = document.getElementById("zip").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var salaryRange = document.getElementById("salaryRange").value.trim();
    var symptoms = document.getElementById("symptoms").value.trim();
    var userID = document.getElementById("userID").value.trim();
    
    // Get password fields
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    
    // Truncate ZIP code if needed
    if (zip.indexOf('-') !== -1) {
      zip = zip.split('-')[0];
    } else if (zip.length > 5) {
      zip = zip.substring(0, 5);
    }
    
    // Manual validations for review
    var nameStatus = (firstName === "" || lastName === "") ? "ERROR: Missing Name" : "pass";
    var dobStatus = (dob === "") ? "ERROR: Missing Date of Birth" : validateDOB(dob);
    var ssnStatus = (ssn === "") ? "ERROR: Missing Social Security" : validateSSN(ssn);
    var addressStatus = (address1 === "") ? "ERROR: Missing Address" : "pass";
    var emailStatus = (email === "") ? "ERROR: Missing Email" : validateEmail(email);
    var phoneStatus = (phone === "") ? "ERROR: Missing Phone Number" : validatePhone(phone);
    var userIDStatus = (userID === "") ? "ERROR: Missing User ID" : validateUserID(userID);
    var pwdStatus = validatePasswordReview(password, confirmPassword);
    
    // Gender from radio buttons
    var gender = "";
    var genderRadios = document.getElementsByName("gender");
    for (var i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }
    var genderStatus = (gender !== "" ? "pass" : "ERROR: Not selected");
    
    // Health scale value
    var healthScale = document.getElementById("healthScale").value;
    
    // Vaccinated status
    var vaccinated = "";
    var vaccinatedRadios = document.getElementsByName("vaccinated");
    for (var i = 0; i < vaccinatedRadios.length; i++) {
      if (vaccinatedRadios[i].checked) {
        vaccinated = vaccinatedRadios[i].value;
        break;
      }
    }
    var vaccinatedStatus = (vaccinated !== "" ? "pass" : "ERROR: Not selected");
    
    // Insurance status
    var insurance = "";
    var insuranceRadios = document.getElementsByName("insurance");
    for (var i = 0; i < insuranceRadios.length; i++) {
      if (insuranceRadios[i].checked) {
        insurance = insuranceRadios[i].value;
        break;
      }
    }
    var insuranceStatus = (insurance !== "" ? "pass" : "ERROR: Not selected");
    
    // Medical history checkboxes
    var history = [];
    var historyCheckboxes = document.getElementsByName("history");
    for (var i = 0; i < historyCheckboxes.length; i++) {
      if (historyCheckboxes[i].checked) {
        history.push(historyCheckboxes[i].value);
      }
    }
    
    // Build review table
    var reviewHTML = "<h3>PLEASE REVIEW THIS INFORMATION</h3>";
    reviewHTML += "<table border='1' cellpadding='5' cellspacing='0'>";
    reviewHTML += "<tr><td><strong>Name</strong></td><td>" + (firstName + " " + middleInitial + " " + lastName) + "</td><td>" +
                  (nameStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + nameStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Date of Birth</strong></td><td>" + dob + "</td><td>" +
                  (dobStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + dobStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Social Security #</strong></td><td>" + ssn + "</td><td>" +
                  (ssnStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + ssnStatus + "</span>") + "</td></tr>";
    var addressValue = address1;
    if (address2 !== "") { addressValue += ", " + address2; }
    addressValue += "<br>" + city + ", " + state + " " + zip;
    reviewHTML += "<tr><td><strong>Address</strong></td><td>" + addressValue + "</td><td>" +
                  (addressStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + addressStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Email</strong></td><td>" + email + "</td><td>" +
                  (emailStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + emailStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Phone Number</strong></td><td>" + phone + "</td><td>" +
                  (phoneStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + phoneStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Gender</strong></td><td>" + (gender || "Not selected") + "</td><td>" +
                  (genderStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + genderStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Health Scale</strong></td><td>" + healthScale + "</td><td><span style='color:green;'>pass</span></td></tr>";
    reviewHTML += "<tr><td><strong>Vaccinated</strong></td><td>" + (vaccinated || "Not selected") + "</td><td>" +
                  (vaccinatedStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + vaccinatedStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Insurance</strong></td><td>" + (insurance || "Not selected") + "</td><td>" +
                  (insuranceStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + insuranceStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Medical History</strong></td><td>" + (history.length > 0 ? history.join(", ") : "None") + "</td><td><span style='color:green;'>pass</span></td></tr>";
    reviewHTML += "<tr><td><strong>Desired Salary</strong></td><td>$" + salaryRange + "</td><td><span style='color:green;'>pass</span></td></tr>";
    reviewHTML += "<tr><td><strong>Described Symptoms</strong></td><td>" + (symptoms || "None") + "</td><td><span style='color:green;'>pass</span></td></tr>";
    reviewHTML += "<tr><td><strong>User ID</strong></td><td>" + userID + "</td><td>" +
                  (userIDStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + userIDStatus + "</span>") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Password</strong></td><td>" + "********" + "</td><td>" +
                  (pwdStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + pwdStatus + "</span>") + "</td></tr>";
    reviewHTML += "</table>";
    
    document.getElementById("reviewOutput").innerHTML = reviewHTML;
    document.getElementById("reviewOutput").scrollIntoView({ behavior: "smooth" });
}






