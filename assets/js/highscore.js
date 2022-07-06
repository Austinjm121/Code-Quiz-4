// Declaring relevant variables needed for highscore.

// Variable for recording highscores
var highScore = document.querySelector("#highScore");

// Variable for clearing the currently saved highscores
var clear = document.querySelector("#clear");

// Variable for going back to the main quiz page
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
	localStorage.clear();
	location.reload();
});

// Retreives local storage, then displays all highscores currently saved.
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

	for (var i = 0; i < allScores.length; i++) {

		var createLi = document.createElement("li");
		createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
		highScore.appendChild(createLi);

	}
}

// Even listener button made to return the user back to the main quiz page if wanted.
goBack.addEventListener("click", function () {
	window.location.replace("./index.html");
});