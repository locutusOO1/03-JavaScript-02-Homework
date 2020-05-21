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
  var numericString = "0123456789";

  // input variables
  var goodInput = false;
  var pwLength = 8;
  var useUpper = false;
  var useLower = false;
  var useSpecial = false;
  var useNumber = false;

  var charSetsToUse = [];
  //var charSetsToUse = ["upper","lower","special"];
  //var charSetsToUse = ["upper","lower","special","number"];

  var usedUpperPos = [];
  var usedLowerPos = [];
  var usedSpecPos = [];
  var usedNumPos = [];
  var overAllPos = []
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

  for (var i = 0; i < pwLength; i++) {
    randChar = "";
    // choose character set
    // var charSet = charSetsToUse[Math.floor(Math.random() * charSetsToUse.length)];
    // if (charSet === "upper") {
    //   usedUpperPos.push(i);
    //   randChar = upperString[Math.floor(Math.random() * upperString.length)];
    // } else if (charSet === "lower") {
    //   usedLowerPos.push(i);
    //   randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
    // } else if (charSet === "special") {
    //   usedSpecPos.push(i);
    //   randChar = specialString[Math.floor(Math.random() * specialString.length)];
    // }

    // choose a random character set to use and index the position that set was used
    charSet = Math.floor(Math.random() * charSetsToUse.length);
    overAllPos[charSet].push(i);

    // choose a random character from the set
    randChar = charSetsToUse[charSet][Math.floor(Math.random() * charSetsToUse[charSet].length)];

    //alert("i: " + i + "\ncharSet: " + charSet + "\ncharacters: " + charSetsToUse[charSet] + "\nrandchar: " + randChar);

    pw.push(randChar);
  }

  //print positions
  var posResults = "";
  // for (var j = 0; j < overAllPos.length; j++) {
  //   posResults += overAllPos[j] + "\n";
  // }
  // alert(posResults);
  // posResults = "";

  for (var k = 0; k < overAllPos.length; k++) {
    if (overAllPos[k].length === 0) {
      // results before
      for (var j = 0; j < overAllPos.length; j++) {
        posResults += overAllPos[j] + "\n";
      }
      alert(posResults);
      posResults = "";


      for (var l = 0; l < overAllPos.length; l++) {
        if (overAllPos[k].length === 0 && overAllPos[l].length >= 2) {
          overAllPos[k].push(parseInt(overAllPos[l].splice(Math.floor(Math.random() * overAllPos[l].length), 1)));
          randChar = charSetsToUse[k][Math.floor(Math.random() * charSetsToUse[k].length)];
          pos = parseInt(overAllPos[k][0]);
          pw[pos] = randChar;
          alert("pw before: " + pw.join('') + " \npos: " + pos + " randchar: " + randChar + "\npw after: " + pw.join(''));
        }
      }


      // results after
      posResults = "";
      for (var j = 0; j < overAllPos.length; j++) {
        posResults += overAllPos[j] + "\n";
      }
      alert(posResults);


    }
  }


  // check for a 0 used array that is required and 
  // if ((charSetsToUse.indexOf("upper") >= 0) && (usedUpperPos.length === 0)) {
  //   pos = 0;
  //   if (usedLowerPos.length >= usedSpecPos.length) {
  //     usedUpperPos.push(parseInt(usedLowerPos.splice(Math.floor(Math.random() * usedLowerPos.length), 1)));
  //     randChar = upperString[Math.floor(Math.random() * upperString.length)];
  //     pos = parseInt(usedUpperPos[0]);
  //     pw[pos] = randChar;
  //   } else {
  //     usedUpperPos.push(parseInt(usedSpecPos.splice(Math.floor(Math.random() * usedSpecPos.length), 1)));
  //     randChar = upperString[Math.floor(Math.random() * upperString.length)];
  //     pos = parseInt(usedUpperPos[0]);
  //     pw[pos] = randChar;
  //   }
  // }
  // if ((charSetsToUse.indexOf("lower") >= 0) && (usedLowerPos.length === 0)) {
  //   if (usedUpperPos.length >= usedSpecPos.length) {
  //     usedLowerPos.push(parseInt(usedUpperPos.splice(Math.floor(Math.random() * usedUpperPos.length), 1)));
  //     randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
  //     pw[usedLowerPos[0]] = randChar;
  //   } else {
  //     usedLowerPos.push(parseInt(usedSpecPos.splice(Math.floor(Math.random() * usedSpecPos.length), 1)));
  //     randChar = lowerString[Math.floor(Math.random() * lowerString.length)];
  //     pw[usedLowerPos[0]] = randChar;
  //   }
  // }  
  // if ((charSetsToUse.indexOf("special") >= 0) && (usedSpecPos.length === 0)) {
  //   if (usedUpperPos.length >= usedLowerPos.length) {
  //     usedSpecPos.push(parseInt(usedUpperPos.splice(Math.floor(Math.random() * usedUpperPos.length), 1)));
  //     randChar = specialString[Math.floor(Math.random() * specialString.length)];
  //     pw[usedSpecPos[0]] = randChar;
  //   } else {
  //     usedSpecPos.push(parseInt(usedLowerPos.splice(Math.floor(Math.random() * usedLowerPos.length), 1)));
  //     randChar = specialString[Math.floor(Math.random() * specialString.length)];
  //     pw[usedSpecPos[0]] = randChar;
  //   }
  // }  

  //alert("Here is the password:")

  //********run data checks to verify lower/upper/special************

  return pw.join('');
}