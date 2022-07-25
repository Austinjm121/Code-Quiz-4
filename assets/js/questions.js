// Broken code, still needs fixing.

// Declaring relevant variables
var userScore = 0;
var questionPage = 0;

// Declared variables
var quizPace = document.querySelector("#quizPace");
var timer = document.querySelector("#startTime");
var questionsSection = document.querySelector("#questionsSection");
var casing = document.querySelector("#casing");

// From the video, the timer starts at 75, so we will start it at 76 to take in the input buffer
var timeLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 15;
// Creates new element
var ulBuild = document.createElement("ul");

// Questions
var questions = [{
      // Title= The question being asked, stored in a string.
      title: "Commonly used data types DO NOT include:",
      //Choices= The 4 answers displayed, one of them being correct, stored in an array.
      choices: ["strings", "booleans", "alerts", "numbers"],
      //Answer= The answer, a simple string.
      answer: "alerts"
   },

   // This proccess is copy and pasted 4 more times, with the strings/arrays obviously changed.
   {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
   },
   {
      title: "Arrays in Javascript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
   },
   {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parenthesis"],
      answer: "quotes"
   },
   {
      title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
   },
];

// Renders questions and choices to page: 
function render(questionPage) {
   // Clears and existing data if there is any 
   questionsSection.innerHTML = "";
   ulBuild.innerHTML = "";
   // For loops to loop through all info in array
   for (var i = 0; i < questions.length; i++) {
      // Appends question title only
      var studentQuestion = questions[questionPage].title;
      var studentChoices = questions[questionPage].choices;
      questionsSection.textContent = studentQuestion;
   }
   // New for each for question choices
   studentChoices.forEach(function (newQuestion) {
      var listQuestion = document.createElement("li");
      listQuestion.textContent = newQuestion;
      questionsSection.appendChild(ulBuild);
      ulBuild.appendChild(listQuestion);
      listQuestion.addEventListener("click", (compare));
   })
}
// Event to compare choices with answer
function compare(event) {
   var element = event.target;

   if (element.matches("li")) {

      var createSection = document.createElement("section");
      createSection.setAttribute("id", "createSection");
      // Correct condition 
      //function answerCheck() {
      //     if (userAnswer == questions[questionPage].answer) {
      //         score = score + 5
      //         correctCount++
      //     } else if (userAnswer !== questions[questionPage].answer) {
      //         timeLeft -= 5;
      //         incorrectCount++
      //     }
      //     questCount++;
      // };
      if (element.textContent == questions[questionPage].answer) {
         userScore++;
         createSection.textContent = "Correct! The answer is:  " + questions[questionPage].answer;
         // Correct condition 
      } else if (element.textContent !== questions[questionPage].answer) {
         // Will deduct -5 seconds off timeLeft for wrong answers
         timeLeft = -penalty;
         createSection.textContent = "Wrong!";
      }

   }
   // Question Index determines number question user is on, this adds a tick each question
   questionPage++;

   // Once the Question Index is greather than or equal to the questions.length,
   // This if function will run the endQuiz function, finishing the quiz, if not, it will continue to render.
   if (questionPage >= questions.length) {
      // All done will append last page with user stats
      endQuiz();
      createSection.textContent = "End of quiz!" + " " + "You got  " + userScore + "/" + questions.length + " Correct!";
   } else {
      render(questionPage);
   }
   questionsSection.appendChild(createSection);

}
// All done will append last page
function endQuiz() {
   questionsSection.innerHTML = "";
   quizPace.innerHTML = "";

   // Heading for the finished quiz screen
   var createH1 = document.createElement("h1");
   createH1.setAttribute("id", "createH1");
   createH1.textContent = "All Done!"

   questionsSection.appendChild(createH1);

   // Paragraph for the finished quiz screen
   var buildP = document.createElement("p");
   buildP.setAttribute("id", "buildP");

   questionsSection.appendChild(buildP);

   // Calculates time remaining and replaces it with userScore
   if (timeLeft >= 0) {
      var remainingTime = timeLeft;
      var buildP2 = document.createElement("p");
      clearInterval(holdInterval);
      buildP.textContent = "Your final Score is: " + remainingTime;

      questionsSection.appendChild(buildP2);
   }

   // Creates the text "Enter your initials", and it's properties
   var buildLabel = document.createElement("label");
   buildLabel.setAttribute("id", "buildLabel");
   buildLabel.textContent = "Enter your initials: ";

   questionsSection.appendChild(buildLabel);

   // Creates the "input" where you type your initials, and it's properties
   var buildInput = document.createElement("input");
   buildInput.setAttribute("type", "text");
   buildInput.setAttribute("id", "initials");
   buildInput.textContent = "";

   questionsSection.appendChild(buildInput).placeholder = "AM";

   // Creates the subtmit button and it's properties
   var buildSubmit = document.createElement("button");
   buildSubmit.setAttribute("type", "submit");
   buildSubmit.setAttribute("id", "Submit");
   buildSubmit.textContent = "Submit";

   questionsSection.appendChild(buildSubmit);

   // Event listener to listen for initials/score for local storage
   buildSubmit.addEventListener("click", function () {
      var initials = buildInput.value;

      if (initials == undefined) {

        console.error("Warning: Error");

      } else {
         var finalScore = {
            initials: initials,
            score: remainingTime
         }
         console.log(finalScore);
         var allScores = localStorage.getItem("allScores");
         if (allScores === null) {
            allScores = [];
         } else {
            allScores = JSON.parse(allScores);
         }
         allScores.push(finalScore);
         var newScore = JSON.stringify(allScores);
         localStorage.setItem("allScores", newScore);
         // Brings the user to the highscore page.
         window.location.replace("./highscore.html");
      }
   });
}