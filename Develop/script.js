// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  passwordText.focus();
  passwordText.select();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// Generate Password
function generatePassword() {
  // character sets
  var upperString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerString = "abcdefghijklmnopqrstuvwxyz";
  var specialString = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  var numericString = "0123456789";
  // input variables
  var goodInput = false;
  var pwLength = 8;
  var useUpper = false;
  var useLower = false;
  var useSpecial = false;
  var useNumber = false;
  // character sets to use
  var charSetsToUse = [];
  // used position index arrays
  var usedUpperPos = [];
  var usedLowerPos = [];
  var usedSpecPos = [];
  var usedNumPos = [];
  var overAllPos = [];
  // variables to choose & store character set and random character into password
  var pw = [];
  var randChar = "";
  var pos = 0;
  var charSet = 0;

  // get inputs & configure character sets
  while (!goodInput) {
    pwLength = parseInt(prompt("Choose a password length from 8 to 128: "));
    if (typeof pwLength === "number" && pwLength >= 8 && pwLength <= 128) {
      goodInput = true;
    } else {
      alert("Invalid character length.  Please try again.");
    }
  }
  while (!useUpper && !useLower && !useSpecial && !useNumber) {
    useUpper = confirm("Use upper case characters?");
    if (useUpper) {
      charSetsToUse.push(upperString);
      overAllPos.push(usedUpperPos);
    }
    useLower = confirm("Use lower case characters?");
    if (useLower) {
      charSetsToUse.push(lowerString);
      overAllPos.push(usedLowerPos);
    }
    useSpecial = confirm("Use special?");
    if (useSpecial) {
      charSetsToUse.push(specialString);
      overAllPos.push(usedSpecPos);
    }
    useNumber = confirm("Use numbers?");
    if (useNumber) {
      charSetsToUse.push(numericString);
      overAllPos.push(usedNumPos);
    }
    if (!useUpper && !useLower && !useSpecial && !useNumber) {
      alert("At least one character set must be chosen.");
    }
  }

  // randomly generate the password
  for (var i = 0; i < pwLength; i++) {
    randChar = "";
    // choose a random character set to use and index the position that set was used
    charSet = Math.floor(Math.random() * charSetsToUse.length);
    overAllPos[charSet].push(i);
    // choose a random character from the set and store it in the password
    randChar = charSetsToUse[charSet][Math.floor(Math.random() * charSetsToUse[charSet].length)];
    pw.push(randChar);
  }

  // check to see if the randomly generated password used all of the selected character sets
  // if a selected character set is not used, then use the indexed positions to 
  // switch with a character set that has been used more than once
  for (var k = 0; k < overAllPos.length; k++) {
    if (overAllPos[k].length === 0) {
      for (var l = 0; l < overAllPos.length; l++) {
        if (overAllPos[k].length === 0 && overAllPos[l].length >= 2) {
          overAllPos[k].push(parseInt(overAllPos[l].splice(Math.floor(Math.random() * overAllPos[l].length), 1)));
          randChar = charSetsToUse[k][Math.floor(Math.random() * charSetsToUse[k].length)];
          pos = parseInt(overAllPos[k][0]);
          pw[pos] = randChar;
        }
      }
    }
  }

  //********run data checks to verify lower/upper/special************

  return pw.join('');
}