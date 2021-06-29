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
    return input.question(`Enter a word to score: `);
};

function simpleScore(word) {
  return word.length;
}

function vowelBonusScore(word) {
  let vowels = ["A", "E", "I", "O", "U"];
  let vowelsFound = 0;

  for (let w = 0; w < word.length; w++) {
    for (let v = 0; v < vowels.length; v++) {
      if (word.charAt(w).toUpperCase()===vowels[v]) {
        vowelsFound++
      }
    }
  }
  return (word.length - vowelsFound) + (vowelsFound*3);
}
//  transform(obj) {
// for (let x in obj) {
// for (let i = 0; i < obj[x].length; i++) {
// newScoreKey[(obj[x][i]).toLowerCase()] = x;

// }
// newScoreKey[' '] = 0;
// }}
function transform(obj) {
  let newPointStructure={};
  for (let o in obj) {
    for (let c = 0; c < obj[o].length; c++) {
      newPointStructure[(obj[o][c]).toLowerCase()] = o;
    }
  }
  return newPointStructure;
};

function scrabbleScore(word) {
let wordScore=0;
  for (w = 0; w < word.length; w++) {
    wordScore += Number(newPointStructure[word.charAt(w).toLowerCase()]);         
  }
  return wordScore;
}


const scoringAlgorithms = [
  {
      name: "Simple",
      description: "One point per character.",
      //scorerFunction: "A function with a parameter for user input that returns a score."
      scoringFunction: simpleScore
      
  },
  {
      name: "Vowel Bonus",
      description: "Vowels are worth 3 points.",
      // scorerFunction: "A function that returns a score based on the number of vowels and consonants."
      scoringFunction: vowelBonusScore
  },
  {
      name: "Scrabble",
      description: "Uses scrabble point system",
      //scorerFunction: "Uses the oldScrabbleScorer() function to determine the score for a given word."
      scoringFunction: scrabbleScore
    }  
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
  console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
  console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`);
  let choice = input.question("Enter 0, 1, or 2: ");
  let wordScore;
  if (choice==="0") {
    //wordScore = simpleScorer(word);
    wordScore = scoringAlgorithms[0].scoringFunction(wordToScore);
    
  } else if (choice === "1") {
    wordScore = scoringAlgorithms[1].scoringFunction(wordToScore);
  } else if (choice === "2") {
    wordScore = scoringAlgorithms[2].scoringFunction(wordToScore);
  }
  console.log(`Score for '${wordToScore}': ${wordScore}`);
}



let newPointStructure;

function runProgram() {
  newPointStructure = transform(oldPointStructure);
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