// Helper function to validate Date of Birth.
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

// Helper function to validate email.
function validateEmail(email) {
  if (!email || email.trim() === "") {
    return "ERROR: Missing Email";
  }
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? "pass" : "ERROR: Invalid email format";
}

// Helper function to validate phone number.
function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return "ERROR: Missing Phone Number";
  }
  var regex = /^\d{3}-\d{3}-\d{4}$/;
  return regex.test(phone) ? "pass" : "ERROR: Phone number must be in 000-000-0000 format";
}

// Helper function to validate user ID.
function validateUserID(userID) {
  if (!userID || userID.trim() === "") {
    return "ERROR: Missing User ID";
  }
  var regex = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
  return regex.test(userID) ? "pass" : "ERROR: Invalid User ID format";
}

// Helper function to validate password for review.
function validatePasswordReview(pwd, cpwd) {
  if (!pwd || !cpwd) {
    return "ERROR: Missing Password";
  }
  if (pwd !== cpwd) {
    return "ERROR: Passwords do not match";
  }
  var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#%^&*()\-_+=\\/><.,~])[A-Za-z\d!@#%^&*()\-_+=\\/><.,~]{8,30}$/;
  if (!regex.test(pwd)) {
    return "ERROR: Password must be 8-30 characters with at least one uppercase, one digit, and one special character";
  }
  return "pass";
}

// Dynamically validate password fields on input.
function validatePassword() {
  var pwd = document.getElementById("password").value;
  var cpwd = document.getElementById("confirmPassword").value;
  var userId = document.getElementById("userID").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var errorMsg = "";
  
  if (pwd === "" || cpwd === "") {
    errorMsg = "ERROR: Missing Password";
  } else if (pwd !== cpwd) {
    errorMsg = "Passwords do not match.";
  } else if (userId && pwd.toLowerCase().includes(userId.toLowerCase())) {
    errorMsg = "Password should not contain your user ID.";
  } else if ((firstName && pwd.toLowerCase().includes(firstName.toLowerCase())) ||
             (lastName && pwd.toLowerCase().includes(lastName.toLowerCase()))) {
    errorMsg = "Password should not contain your name.";
  }
  
  document.getElementById("passwordError").textContent = errorMsg;
}

// Function to check the form before submission.
function checkForm() {
  // Check if there's any dynamic password error message
  var error = document.getElementById("passwordError").textContent;
  if (error !== "") {
    alert("Please fix the password error before submitting.");
    return false;
  }
  return true;
}

// Function to review the form data and display it.
function reviewData() {
    // Get values from form fields (trim strings to remove extra spaces)
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
    
    // Get password and confirm password
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    
    // Truncate ZIP code to first 5 digits if ZIP+4 entered
    if (zip.indexOf('-') !== -1) {
      zip = zip.split('-')[0];
    } else if (zip.length > 5) {
      zip = zip.substring(0, 5);
    }
    
    // Validate required fields manually if empty
    var nameStatus = (firstName === "" || lastName === "") ? "ERROR: Missing Name" : "pass";
    var dobStatus = (dob === "") ? "ERROR: Missing Date of Birth" : validateDOB(dob);
    var ssnStatus = (ssn === "") ? "ERROR: Missing Social Security" : "pass";
    var addressStatus = (address1 === "") ? "ERROR: Missing Address" : "pass";
    var emailStatus = (email === "") ? "ERROR: Missing Email" : validateEmail(email);
    var phoneStatus = (phone === "") ? "ERROR: Missing Phone Number" : validatePhone(phone);
    var userIDStatus = (userID === "") ? "ERROR: Missing User ID" : validateUserID(userID);
    var pwdStatus = validatePasswordReview(password, confirmPassword);
    
    // Get selected gender (radio buttons)
    var gender = "";
    var genderRadios = document.getElementsByName("gender");
    for (var i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }
    var genderStatus = (gender !== "" ? "pass" : "ERROR: Not selected");
    
    // Get health scale value
    var healthScale = document.getElementById("healthScale").value;
    
    // Get vaccinated status (radio buttons)
    var vaccinated = "";
    var vaccinatedRadios = document.getElementsByName("vaccinated");
    for (var i = 0; i < vaccinatedRadios.length; i++) {
      if (vaccinatedRadios[i].checked) {
        vaccinated = vaccinatedRadios[i].value;
        break;
      }
    }
    var vaccinatedStatus = (vaccinated !== "" ? "pass" : "ERROR: Not selected");
    
    // Get insurance status (radio buttons)
    var insurance = "";
    var insuranceRadios = document.getElementsByName("insurance");
    for (var i = 0; i < insuranceRadios.length; i++) {
      if (insuranceRadios[i].checked) {
        insurance = insuranceRadios[i].value;
        break;
      }
    }
    var insuranceStatus = (insurance !== "" ? "pass" : "ERROR: Not selected");
    
    // Get checked checkboxes for medical history
    var history = [];
    var historyCheckboxes = document.getElementsByName("history");
    for (var i = 0; i < historyCheckboxes.length; i++) {
      if (historyCheckboxes[i].checked) {
        history.push(historyCheckboxes[i].value);
      }
    }
    
    // Build HTML for review table with Field, Value, and Status columns
    var reviewHTML = "<h3>PLEASE REVIEW THIS INFORMATION</h3>";
    reviewHTML += "<table border='1' cellpadding='5' cellspacing='0'>";
    
    // Name
    reviewHTML += "<tr><td><strong>Name</strong></td><td>" + (firstName + " " + middleInitial + " " + lastName) + "</td><td>" + 
                  (nameStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + nameStatus + "</span>") + "</td></tr>";
    
    // Date of Birth
    reviewHTML += "<tr><td><strong>Date of Birth</strong></td><td>" + dob + "</td><td>" + 
                  (dobStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + dobStatus + "</span>") + "</td></tr>";
    
    // Social Security
    reviewHTML += "<tr><td><strong>Social Security #</strong></td><td>" + ssn + "</td><td>" + 
                  (ssnStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + ssnStatus + "</span>") + "</td></tr>";
    
    // Address
    var addressValue = address1;
    if (address2 !== "") { 
      addressValue += ", " + address2; 
    }
    addressValue += "<br>" + city + ", " + state + " " + zip;
    reviewHTML += "<tr><td><strong>Address</strong></td><td>" + addressValue + "</td><td>" + 
                  (addressStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + addressStatus + "</span>") + "</td></tr>";
    
    // Email
    reviewHTML += "<tr><td><strong>Email</strong></td><td>" + email + "</td><td>" + 
                  (emailStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + emailStatus + "</span>") + "</td></tr>";
    
    // Phone
    reviewHTML += "<tr><td><strong>Phone Number</strong></td><td>" + phone + "</td><td>" + 
                  (phoneStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + phoneStatus + "</span>") + "</td></tr>";
    
    // Gender
    reviewHTML += "<tr><td><strong>Gender</strong></td><td>" + (gender || "Not selected") + "</td><td>" + 
                  (genderStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + genderStatus + "</span>") + "</td></tr>";
    
    // Health Scale
    reviewHTML += "<tr><td><strong>Health Scale</strong></td><td>" + healthScale + "</td><td><span style='color:green;'>pass</span></td></tr>";
    
    // Vaccinated
    reviewHTML += "<tr><td><strong>Vaccinated</strong></td><td>" + (vaccinated || "Not selected") + "</td><td>" + 
                  (vaccinatedStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + vaccinatedStatus + "</span>") + "</td></tr>";
    
    // Insurance
    reviewHTML += "<tr><td><strong>Insurance</strong></td><td>" + (insurance || "Not selected") + "</td><td>" + 
                  (insuranceStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + insuranceStatus + "</span>") + "</td></tr>";
    
    // Medical History
    reviewHTML += "<tr><td><strong>Medical History</strong></td><td>" + (history.length > 0 ? history.join(", ") : "None") + "</td><td><span style='color:green;'>pass</span></td></tr>";
    
    // Desired Salary
    reviewHTML += "<tr><td><strong>Desired Salary</strong></td><td>$" + salaryRange + "</td><td><span style='color:green;'>pass</span></td></tr>";
    
    // Described Symptoms
    reviewHTML += "<tr><td><strong>Described Symptoms</strong></td><td>" + (symptoms || "None") + "</td><td><span style='color:green;'>pass</span></td></tr>";
    
    // User ID
    reviewHTML += "<tr><td><strong>User ID</strong></td><td>" + userID + "</td><td>" + 
                  (userIDStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + userIDStatus + "</span>") + "</td></tr>";
    
    // Password (masked)
    reviewHTML += "<tr><td><strong>Password</strong></td><td>" + "********" + "</td><td>" + 
                  (pwdStatus === "pass" ? "<span style='color:green;'>pass</span>" : "<span style='color:red;'>" + pwdStatus + "</span>") + "</td></tr>";
    
    reviewHTML += "</table>";
    
    // Insert the review HTML into the designated div
    document.getElementById("reviewOutput").innerHTML = reviewHTML;
    
    // Scroll to the review section
    document.getElementById("reviewOutput").scrollIntoView({ behavior: "smooth" });
}




