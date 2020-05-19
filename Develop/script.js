// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Generate Password
function generatePassword() {
  // need input for password length
  // need input for if special characters and which ones
  // need input for upper/lower case
  // tally to determine if uppper case has been used and how many, keep position in another array
  // tally to determine if lower case has been used and how many, keep position in another array
  // tally to determine if special character has been used and how many, keep position in another array
  // 65 >=  (A-Z characters) <= 90
  // 0-2 based on selected group criteria random number to choose between upper/lower/special with weighting based on occurance
  // if tally for a need upper/lower/special is 0 by end of array, then force a non 1 tally group to be one of the 0 groups

  // character sets
  var upperString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerString = "abcdefghijklmnopqrstuvwxyz";
  var specialString = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

  var pwLength = 4;
  //var charSetsToUse = [];
  var charSetsToUse = ["upper","lower","special"];

  var usedUpperPos = [];
  var usedLowerPos = [];
  var usedSpecPos = [];
  var pw = [];
  var randChar = "";
  var pos = 0;

  // get inputs

  // populate charSetsToUse

  var charArray = [];
  for (var i = 0; i < pwLength; i++) {
    randChar = "";
    // choose character set
    var charSet = charSetsToUse[Math.floor(Math.random() * charSetsToUse.length)];
    if (charSet === "upper") {
      usedUpperPos.push(i);
      randChar = upperString[Math.floor(Math.random() * upperString.length)];
    } else if (charSet === "lower") {
      usedLowerPos.push(i);
      randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
    } else if (charSet === "special") {
      usedSpecPos.push(i);
      randChar = specialString[Math.floor(Math.random() * specialString.length)];
    }
    pw.push(randChar);
  }

  // check for a 0 used array that is required and 
  if ((charSetsToUse.indexOf("upper") >= 0) && (usedUpperPos.length === 0)) {
    pos = 0;
    if (usedLowerPos.length >= usedSpecPos.length) {
      usedUpperPos.push(parseInt(usedLowerPos.splice(Math.floor(Math.random() * usedLowerPos.length), 1)));
      randChar = upperString[Math.floor(Math.random() * upperString.length)];
      pos = parseInt(usedUpperPos[0]);
      pw[pos] = randChar;
    } else {
      usedUpperPos.push(parseInt(usedSpecPos.splice(Math.floor(Math.random() * usedSpecPos.length), 1)));
      randChar = upperString[Math.floor(Math.random() * upperString.length)];
      pos = parseInt(usedUpperPos[0]);
      pw[pos] = randChar;
    }
  }
  if ((charSetsToUse.indexOf("lower") >= 0) && (usedLowerPos.length === 0)) {
    if (usedUpperPos.length >= usedSpecPos.length) {
      usedLowerPos.push(parseInt(usedUpperPos.splice(Math.floor(Math.random() * usedUpperPos.length), 1)));
      randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
      pw[usedLowerPos[0]] = randChar;
    } else {
      usedLowerPos.push(parseInt(usedSpecPos.splice(Math.floor(Math.random() * usedSpecPos.length), 1)));
      randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
      pw[usedLowerPos[0]] = randChar;
    }
  }  
  if ((charSetsToUse.indexOf("special") >= 0) && (usedSpecPos.length === 0)) {
    if (usedUpperPos.length >= usedLowerPos.length) {
      usedSpecPos.push(parseInt(usedUpperPos.splice(Math.floor(Math.random() * usedUpperPos.length), 1)));
      randChar = specialString[Math.floor(Math.random() * specialString.length)];
      pw[usedSpecPos[0]] = randChar;
    } else {
      usedSpecPos.push(parseInt(usedLowerPos.splice(Math.floor(Math.random() * usedLowerPos.length), 1)));
      randChar = specialString[Math.floor(Math.random() * specialString.length)];
      pw[usedSpecPos[0]] = randChar;
    }
  }  

  //alert("Here is the password:")

  //********run data checks to verify lower/upper/special************

  return "Here is the password: " + pw.join('');
}