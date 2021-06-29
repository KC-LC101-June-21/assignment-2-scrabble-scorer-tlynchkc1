// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let wordToScore;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  let invalidCharacters = ["0","1","2","3","4","5","6","7","8","9","10","!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","}","[","]","|","?","<",">",".","/"];

  let letters = /^[A-Za-z]+$/;
  
  let word;

  let inputValid = false;

  // loop at least once and continue to loop until the input only contains letters
  do {
    word = input.question(`Enter a word to score: `);
    // check if the string word only contains letters. If so set set the inputValid variable to true stopping the loop.
    if (word.match(letters)) {
      // The word only contains letters
      inputValid = true;
    } else {
      // The string inputed contains a character that is not a letter. Tell the user to try again.
      console.log(`You the entered ${word} which contains characters which are not valid, please retype the word only using letters.\n`);
    }
  } while (!inputValid)

    // return validated input
    return word;
}

function simpleScore(word) {
  // since each letter gets one point simply return the length of the word.
  return word.length;
}

function vowelBonusScore(word) {
  // check for number of vowels in word.
  let vowelsFound = word.match(/[aeiou]/gi).length;

  // All consonants are worth one point. Subtracting the length of the word - minues the vowels will give the total points for consonants. Since vowels are worth 3 points multiply the number of vowels * 3 and add total number of consonants
  return (word.length - vowelsFound) + (vowelsFound*3);
}


function transform(obj) {
  let newPointStructure={};

  for (let o in obj) {
    // loop through array getting the (the point values). In new array make the each index a letter of the alphabet and its value the points for that letter. Convert the point value from a string to integer using Number function
    for (let c = 0; c < obj[o].length; c++) {
      newPointStructure[(obj[o][c]).toLowerCase()] = Number(o);
    }
  }

  // return updated Scrablescoring algorithm
  return newPointStructure;
};

// Update scoring algorithm using transform function
let newPointStructure = transform(oldPointStructure);

function scrabbleScore(word) { 
  let wordScore=0;
  // loop through each character in the user inputed word and add the correspondent point value of each letter the the wordScore

  for (w = 0; w < word.length; w++) {
    wordScore += newPointStructure[word.charAt(w).toLowerCase()];         
  }
  return wordScore;
}


const scoringAlgorithms = [
  {
      name: "Simple",
      description: "One point per character.",
      scoringFunction: simpleScore 
      
  },
  {
      name: "Vowel Bonus",
      description: "Vowels are worth 3 points.",
      scoringFunction: vowelBonusScore
  },
  {
      name: "Scrabble",
      description: "Uses scrabble point system",
      scoringFunction: scrabbleScore
    }  
];

function scorerPrompt() {
  

  // variable to keep track of the word score
  let wordScore=0;

  let inputValid = false;

  // Loop at least once or until valid input has been entered by user.
  do {
    // Have user choose which scoring algorithm to use. Use Scoring scoringAlgorithms for the 3 choices
    console.log("Which scoring algorithm would you like to use?\n");
    console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
    console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
    console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`);
    let choice = input.question("Enter 0, 1, or 2: ");
    
    // score word based on user choice, if 0, 1, or 2 is choicen score the word bassed on chosen scoring function and end loop. If Input is not valid do not break the loop and have user try again

    if (choice==="0") {
      wordScore = scoringAlgorithms[0].scoringFunction(wordToScore);
      inputValid = true;
    } else if (choice === "1") {
      wordScore = scoringAlgorithms[1].scoringFunction(wordToScore);
      inputValid = true;
    } else if (choice === "2") {
      wordScore = scoringAlgorithms[2].scoringFunction(wordToScore);
      inputValid = true;
    } else {
      // if the user did not enter 0, 1, or 2 loop until they enter a valid entry
      console.log(`\n${choice} is not a valid option. Please enter 0, 1, or 2.\n`)
    }
  } while (!inputValid)

  // Display score to the console
  console.log(`Score for '${wordToScore}': ${wordScore}`);
}

function runProgram() {  
  wordToScore = initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};