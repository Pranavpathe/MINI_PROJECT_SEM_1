// Questions for each stream
const quizQuestions = {
    science: [
        {
            question: "Which scientific field interests you the most?",
            answers: {
                a: "Physics",
                b: "Biology",
                c: "Chemistry"
            }
        },
        {
            question: "Do you prefer working in labs or with data?",
            answers: {
                a: "Labs",
                b: "Data analysis",
                c: "Field research"
            }
        },
        {
            question: "Which career path excites you the most?",
            answers: {
                a: "Research Scientist",
                b: "Doctor",
                c: "Engineer"
            }
        }
    ],
    commerce: [
        {
            question: "Which aspect of business interests you the most?",
            answers: {
                a: "Marketing",
                b: "Finance",
                c: "Entrepreneurship"
            }
        },
        {
            question: "Do you enjoy analyzing financial data?",
            answers: {
                a: "Yes",
                b: "No",
                c: "Maybe"
            }
        },
        {
            question: "Which career path would you prefer?",
            answers: {
                a: "Accountant",
                b: "Business Analyst",
                c: "Entrepreneur"
            }
        }
    ],
    arts: [
        {
            question: "Which artistic medium do you prefer?",
            answers: {
                a: "Visual arts",
                b: "Performing arts",
                c: "Literature"
            }
        },
        {
            question: "What inspires your creativity the most?",
            answers: {
                a: "Nature",
                b: "Culture",
                c: "Emotions"
            }
        },
        {
            question: "Which career excites you in the arts field?",
            answers: {
                a: "Artist",
                b: "Writer",
                c: "Filmmaker"
            }
        }
    ]
};

// Field selection logic
document.getElementById("startQuiz").addEventListener("click", function() {
    document.getElementById("streamModal").style.display = "block"; // Show the stream selection modal
});

document.getElementById("selectStream").addEventListener("click", function() {
    const selectedStream = document.querySelector('input[name="stream"]:checked').value;
    if (selectedStream) {
        document.getElementById("streamModal").style.display = "none"; // Hide the stream modal
        document.getElementById("quizModal").style.display = "block"; // Show the quiz modal
        loadQuiz(selectedStream); // Load quiz based on the selected stream
    }
});

// Function to load the quiz based on the selected stream
function loadQuiz(selectedStream) {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Clear previous questions

    quizQuestions[selectedStream].forEach((questionObj, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        questionElement.innerHTML = `
            <p>${index + 1}. ${questionObj.question}</p>
            <div class="answers">
                <label><input type="radio" name="question${index}" value="a"> ${questionObj.answers.a}</label><br>
                <label><input type="radio" name="question${index}" value="b"> ${questionObj.answers.b}</label><br>
                <label><input type="radio" name="question${index}" value="c"> ${questionObj.answers.c}</label><br>
            </div>
        `;

        quizContainer.appendChild(questionElement);
    });
}

document.getElementById("submitQuiz").addEventListener("click", function() {
    const selectedStream = document.querySelector('input[name="stream"]:checked').value;
    let answerCount = { a: 0, b: 0, c: 0 }; // Count how many A, B, and C answers are selected

    quizQuestions[selectedStream].forEach((questionObj, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer) {
            answerCount[selectedAnswer.value]++; // Track the count of A, B, or C answers
        }
    });

    // Find the dominant answer choice (A, B, or C)
    let dominantChoice = Object.keys(answerCount).reduce((a, b) => answerCount[a] > answerCount[b] ? a : b);

    // Reset previous results
    document.getElementById("results").innerText = "";
    document.getElementById("interestMessage").innerText = "";

    // Display personalized message based on the dominant choice and selected stream
    let interestMessage = "";
    if (selectedStream === 'science') {
        if (dominantChoice === 'a') {
            interestMessage = "You have a strong interest in Physics! Consider pursuing a career in research or engineering.";
        } else if (dominantChoice === 'b') {
            interestMessage = "You are fascinated by Biology! You might enjoy a career in healthcare or environmental sciences.";
        } else if (dominantChoice === 'c') {
            interestMessage = "You seem to love Chemistry! A career in chemical engineering or pharmaceuticals might be perfect for you.";
        }
    } else if (selectedStream === 'commerce') {
        if (dominantChoice === 'a') {
            interestMessage = "You have a knack for Marketing! Consider pursuing a career in advertising or brand management.";
        } else if (dominantChoice === 'b') {
            interestMessage = "You are interested in Finance! You might enjoy a career as a financial analyst or accountant.";
        } else if (dominantChoice === 'c') {
            interestMessage = "You are entrepreneurial! Starting your own business or working in management could be a great path for you.";
        }
    } else if (selectedStream === 'arts') {
        if (dominantChoice === 'a') {
            interestMessage = "You have a talent for Visual Arts! A career as a professional artist or designer might suit you.";
        } else if (dominantChoice === 'b') {
            interestMessage = "You love Performing Arts! You may want to explore a career in theater, music, or dance.";
        } else if (dominantChoice === 'c') {
            interestMessage = "You have a passion for Literature! Writing, publishing, or filmmaking could be exciting career paths for you.";
        }
    }

    document.getElementById("interestMessage").innerText = interestMessage; // Display the personalized message
});
// Close the quiz modal when the cross button is clicked
document.getElementById("closeQuiz").addEventListener("click", function() {
    document.getElementById("quizModal").style.display = "none";
});

// Close the stream modal when clicking the close button
document.getElementById("closeStream").addEventListener("click", function() {
    document.getElementById("streamModal").style.display = "none";
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("quizModal")) {
        document.getElementById("quizModal").style.display = "none";
    }
    if (event.target == document.getElementById("streamModal")) {
        document.getElementById("streamModal").style.display = "none";
    }
};

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == document.getElementById("quizModal") || event.target == document.getElementById("streamModal")) {
        document.getElementById(event.target.id).style.display = "none";
    }
};
