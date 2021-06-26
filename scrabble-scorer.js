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

let vowels = ["A", "E", "I", "O", "U"];

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
   return input.question("Enter a word: ");
};

function simpleScore(word) {
  return word.length;
}
function vowelBonusScore(word) {
  word= word.toUpperCase();
  let vowelsFound = [];
  for (w = 0; w < word.length; w++) {
    for (v = 0; v < vowels.length; v++) {
        if (word.charAt(w) === vowels[v]) {
          vowelsFound.push(word.charAt(w));
        }
    }
  }
  return (word.length-vowelsFound.length) + (vowelsFound.length*3)
}







const scoringAlgorithms = [
  {
      name: "Simple",
      description: "One point per character.",
      //scorerFunction: "A function with a parameter for user input that returns a score."
      scorerFunction: simpleScore
      
    },
  {
      name: "Vowel Bonus",
      description: "Vowels are worth 3 points.",
      // scorerFunction: "A function that returns a score based on the number of vowels and consonants."
      scorerFunction: vowelBonusScore
    },
  {
      name: "Scrabble",
      description: "Uses scrabble point system",
      //scorerFunction: "Uses the oldScrabbleScorer() function to determine the score for a given word."
      scorerFunction: scrabbleScore
    }  
];

function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`);
  console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`);
  console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`);
  let choice = input.question("Enter 0, 1, or 2: ");
  let wordScore;
  if (choice==="0") {
    //wordScore = simpleScorer(word);
    wordScore = scoringAlgorithms[0].scorerFunction(word);
    
  } else if (choice === "1") {
    wordScore = scoringAlgorithms[1].scorerFunction(word);
  } else if (choice === "2") {
    wordScore = scoringAlgorithms[2].scorerFunction(word);
  }
  console.log(`Score for '${word}': ${wordScore}`);
}


let newPointStructure = [];

function transform(obj) {
  for (let c in obj){
      for (let r=0; r < obj[c].length; r++){
        newPointStructure.push(
          {
            letter: obj[c][r].toUpperCase(), points: c
          });
      }
    }

    // newPointStructure.sort(function(a, b){
    //   let x = a.letter.toLowerCase();
    //   let y = b.letter.toLowerCase();
    //   if (x < y) {return -1;}
    //   if (x > y) {return 1;}
    //   return 0;
    // });
};

function scrabbleScore(word) {
  let wordScore=0;
  for (w = 0; w < word.length; w++) {
    for (let l in newPointStructure) {
      if (newPointStructure[l].letter.toUpperCase() === word.charAt(w).toUpperCase()) {
        
      //console.log(newPointStructure[l].letter);
        wordScore += Number(newPointStructure[l].points);
      }
    }    
  }
  return wordScore;
}

function runProgram() {
  
  transform(oldPointStructure);

  console.log("Let's play some scrabble!\n");
  let word = initialPrompt();
  
  let userChoise = scorerPrompt(word)
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

