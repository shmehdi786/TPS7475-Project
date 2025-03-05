// Function to validate that the two password fields match and that the password
// does not include the desired user ID or parts of the user's name.
function validatePassword(){
  var pwd = document.getElementById("password").value;
  var cpwd = document.getElementById("confirmPassword").value;
  var userId = document.getElementById("userID").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var errorMsg = "";
  
  // Check if passwords match
  if(pwd !== cpwd){
      errorMsg = "Passwords do not match.";
  }
  // Check if password contains userID
  if(userId && pwd.toLowerCase().includes(userId.toLowerCase())){
      errorMsg = "Password should not contain your user ID.";
  }
  // Check if password contains first or last name
  if((firstName && pwd.toLowerCase().includes(firstName.toLowerCase())) || 
     (lastName && pwd.toLowerCase().includes(lastName.toLowerCase()))){
      errorMsg = "Password should not contain your name.";
  }
  document.getElementById("passwordError").textContent = errorMsg;
}

// Function to review the form data and display it in the review section.
function reviewData() {
    // Get values from form fields
    var firstName = document.getElementById("firstName").value;
    var middleInitial = document.getElementById("middleInitial").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var ssn = document.getElementById("ssn").value;
    var address1 = document.getElementById("address1").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var salaryRange = document.getElementById("salaryRange").value;
    var symptoms = document.getElementById("symptoms").value;
    var userID = document.getElementById("userID").value;
    
    // Truncate ZIP code to the first 5 digits if a ZIP+4 is entered
    if (zip.indexOf('-') !== -1) {
      zip = zip.split('-')[0];
    } else if (zip.length > 5) {
      zip = zip.substring(0, 5);
    }
    
    // Get selected gender (radio buttons)
    var gender = "";
    var genderRadios = document.getElementsByName("gender");
    for (var i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }
    
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
    
    // Get insurance status (radio buttons)
    var insurance = "";
    var insuranceRadios = document.getElementsByName("insurance");
    for (var i = 0; i < insuranceRadios.length; i++) {
      if (insuranceRadios[i].checked) {
        insurance = insuranceRadios[i].value;
        break;
      }
    }
    
    // Get checked checkboxes for medical history
    var history = [];
    var historyCheckboxes = document.getElementsByName("history");
    for (var i = 0; i < historyCheckboxes.length; i++) {
      if (historyCheckboxes[i].checked) {
        history.push(historyCheckboxes[i].value);
      }
    }
    
    // Build HTML to display the reviewed information
    var reviewHTML = "<h3>PLEASE REVIEW THIS INFORMATION</h3>";
    reviewHTML += "<table border='1' cellpadding='5' cellspacing='0'>";
    reviewHTML += "<tr><td><strong>Name</strong></td><td>" + firstName + " " + middleInitial + " " + lastName + "</td></tr>";
    reviewHTML += "<tr><td><strong>Date of Birth</strong></td><td>" + dob + "</td></tr>";
    reviewHTML += "<tr><td><strong>Social Security #</strong></td><td>" + ssn + "</td></tr>";
    reviewHTML += "<tr><td><strong>Address</strong></td><td>" + address1;
    if (address2.trim() !== "") { 
      reviewHTML += ", " + address2; 
    }
    reviewHTML += "<br>" + city + ", " + state + " " + zip + "</td></tr>";
    reviewHTML += "<tr><td><strong>Email</strong></td><td>" + email + "</td></tr>";
    reviewHTML += "<tr><td><strong>Phone Number</strong></td><td>" + phone + "</td></tr>";
    reviewHTML += "<tr><td><strong>Gender</strong></td><td>" + (gender || "Not selected") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Health Scale</strong></td><td>" + healthScale + "</td></tr>";
    reviewHTML += "<tr><td><strong>Vaccinated</strong></td><td>" + (vaccinated || "Not selected") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Insurance</strong></td><td>" + (insurance || "Not selected") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Medical History</strong></td><td>" + (history.length > 0 ? history.join(", ") : "None") + "</td></tr>";
    reviewHTML += "<tr><td><strong>Desired Salary</strong></td><td>$" + salaryRange + "</td></tr>";
    reviewHTML += "<tr><td><strong>Described Symptoms</strong></td><td>" + symptoms + "</td></tr>";
    reviewHTML += "<tr><td><strong>User ID</strong></td><td>" + userID + "</td></tr>";
    reviewHTML += "</table>";
    
    // Insert the review HTML into the designated div
    document.getElementById("reviewOutput").innerHTML = reviewHTML;
    
    // Scroll to the review section
    document.getElementById("reviewOutput").scrollIntoView({ behavior: "smooth" });
}
