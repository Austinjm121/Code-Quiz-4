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

// Declaring relevant variables
var score = 0;
var questionIndex = 0;

// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsSection = document.querySelector("#questionsSection");
var casing = document.querySelector("#casing");

// From the video, the timer starts at 75, so we will start it at 76 to take in the input buffer
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 15;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
// We are checking zero because its originally set to zero
if (holdInterval === 0) {
    holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = "Time: " + secondsLeft;
// If the user runes out of time, it will run the endQuiz function, which ends the quiz
        if (secondsLeft <= 0) {
            clearInterval(holdInterval);
            endQuiz();
            currentTime.textContent = "Time's up!";
        }
    }, 1000);
}
render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
// Clears and existing data if there is any 
questionsSection.innerHTML = "";
ulCreate.innerHTML = "";
// For loops to loop through all info in array
for (var i = 0; i < questions.length; i++) {
    // Appends question title only
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsSection.textContent = userQuestion;
}
// New for each for question choices
userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsSection.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
})
}
// Event to compare choices with answer
function compare(event) {
var element = event.target;

if (element.matches("li")) {

    var createSection = document.createElement("section");
    createSection.setAttribute("id", "createSection");
    // Correct condition 
    if (element.textContent == questions[questionIndex].answer) {
        score++;
        createSection.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        // Correct condition 
    } else {
        // Will deduct -5 seconds off secondsLeft for wrong answers
        secondsLeft = secondsLeft - penalty;
        createSection.textContent = "Wrong!";
    }

}
// Question Index determines number question user is on, this adds a tick each question
questionIndex++;

// Once the Question Index is greather than or equal to the questions.length,
// This if function will run the endQuiz function, finishing the quiz, if not, it will continue to render.
if (questionIndex >= questions.length) {
    // All done will append last page with user stats
    endQuiz();
    createSection.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
} else {
    render(questionIndex);
}
questionsSection.appendChild(createSection);

}
// All done will append last page
function endQuiz() {
questionsSection.innerHTML = "";
currentTime.innerHTML = "";

// Heading for the finished quiz screen
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.textContent = "All Done!"

questionsSection.appendChild(createH1);

// Paragraph for the finished quiz screen
var createP = document.createElement("p");
createP.setAttribute("id", "createP");

questionsSection.appendChild(createP);

// Calculates time remaining and replaces it with score
if (secondsLeft >= 0) {
    var remainingTime = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + remainingTime;

    questionsSection.appendChild(createP2);
}

// Creates the text "Enter your initials", and it's properties
var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Enter your initials: ";

questionsSection.appendChild(createLabel);

// Creates the "input" where you type your initials, and it's properties
var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initials");
createInput.textContent = "";

questionsSection.appendChild(createInput).placeholder = "AM";

// Creates the subtmit button and it's properties
var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "Submit");
createSubmit.textContent = "Submit";

questionsSection.appendChild(createSubmit);

// Event listener to listen for initials/score for local storage
createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

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
        // Travels to final page
        window.location.replace("./highscore.html");
    }
});
}