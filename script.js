// USER DISPLAY
const user = localStorage.getItem("reviseUser");
if (!user) window.location.href = "login.html";
document.getElementById("userDisplay").innerText = "👤 " + user;

// SUBJECT DATA (EDIT HERE)
const data = {
  Math: {
    Algebra: [
      "Solve: 2x + 5 = 15",
      "Factor: x² − 9",
      "Simplify: (a+b)²"
    ],
    Geometry: [
      "Area of circle formula?",
      "Sum of angles of triangle?",
      "Pythagoras theorem?"
    ]
  },
  Science: {
    Physics: [
      "Unit of force?",
      "Speed formula?",
      "Gravity value?"
    ],
    Chemistry: [
      "H2O is?",
      "pH of acid?",
      "Atomic number?"
    ]
  }
};

// SELECTORS
const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const container = document.getElementById("questionContainer");

Object.keys(data).forEach(sub => {
  subjectSelect.innerHTML += `<option>${sub}</option>`;
});

subjectSelect.addEventListener("change", loadTopics);
topicSelect.addEventListener("change", loadQuestions);

// NAVIGATION
let questions = [];
let currentIndex = 0;
let singleView = true;

function loadTopics() {
  topicSelect.innerHTML = "";
  const topics = Object.keys(data[subjectSelect.value]);
  topics.forEach(t => topicSelect.innerHTML += `<option>${t}</option>`);
  loadQuestions();
}

function loadQuestions() {
  questions = data[subjectSelect.value][topicSelect.value];
  currentIndex = 0;
  showSingleQuestion();
}

function showSingleQuestion() {
  container.innerHTML =
    `<div class="question">${questions[currentIndex]}</div>`;
}

function showAllQuestions() {
  container.innerHTML = questions
    .map(q => `<div class="question">${q}</div>`)
    .join("");
}

// BUTTONS
document.getElementById("nextBtn").onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showSingleQuestion();
  }
};

document.getElementById("prevBtn").onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    showSingleQuestion();
  }
};

document.getElementById("toggleViewBtn").onclick = () => {
  singleView = !singleView;
  if (singleView) {
    showSingleQuestion();
    toggleViewBtn.innerText = "📋 Show All";
  } else {
    showAllQuestions();
    toggleViewBtn.innerText = "🔎 Single View";
  }
};

// INITIAL LOAD
loadTopics();
