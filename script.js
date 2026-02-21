let questions = [
  {q: "What is 2+2?", a: "4", subject: "Math", topic: "Basics"},
  {q: "Capital of France?", a: "Paris", subject: "Geography", topic: "Europe"},
  {q: "Who wrote Hamlet?", a: "William Shakespeare", subject: "Literature", topic: "Drama"}
];

let currentIndex = 0;
let marked = [];

function login() {
  const name = document.getElementById("username").value;
  if(name.trim() === "") return alert("Enter your name!");
  document.getElementById("login-page").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("welcome").innerText = `Welcome, ${name}`;
  loadSubjects();
  renderQuestions();
}

function loadSubjects() {
  let subjects = [...new Set(questions.map(q => q.subject))];
  let subjectSelect = document.getElementById("subject");
  subjectSelect.innerHTML = subjects.map(s => `<option>${s}</option>`).join("");
  subjectSelect.onchange = loadTopics;
  loadTopics();
}

function loadTopics() {
  let subject = document.getElementById("subject").value;
  let topics = [...new Set(questions.filter(q => q.subject === subject).map(q => q.topic))];
  let topicSelect = document.getElementById("topic");
  topicSelect.innerHTML = topics.map(t => `<option>${t}</option>`).join("");
  renderQuestions();
}

function renderQuestions() {
  let subject = document.getElementById("subject").value;
  let topic = document.getElementById("topic").value;
  let list = document.getElementById("question-list");
  list.innerHTML = "";
  questions.filter(q => q.subject === subject && q.topic === topic).forEach((q, i) => {
    let div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<strong>${q.q}</strong>
      <button onclick="toggleAnswer(this, '${q.a}')">Show Answer</button>
      <button onclick="markQuestion(${i})">Mark Difficult</button>`;
    list.appendChild(div);
  });
}

function toggleAnswer(btn, answer) {
  if(btn.nextElementSibling && btn.nextElementSibling.className === "answer") {
    btn.nextElementSibling.remove();
  } else {
    let ans = document.createElement("div");
    ans.className = "answer";
    ans.innerText = answer;
    btn.insertAdjacentElement("afterend", ans);
  }
}

function markQuestion(i) {
  if(!marked.includes(i)) {
    marked.push(i);
    updateMarkedPanel();
  }
}

function updateMarkedPanel() {
  let ul = document.getElementById("marked-list");
  ul.innerHTML = marked.map(i => `<li>${questions[i].q}</li>`).join("");
}

function togglePanel() {
  let panel = document.getElementById("marked-panel");
  panel.classList.toggle("show");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Quiz Mode
function showAnswer() {
  document.getElementById("quiz-answer").classList.remove("hidden");
}

function nextQuestion() {
  currentIndex = (currentIndex + 1) % questions.length;
  loadQuiz();
}

function prevQuestion() {
  currentIndex = (currentIndex - 1 + questions.length) % questions.length;
  loadQuiz();
}

function loadQuiz() {
  let q = questions[currentIndex];
  document.getElementById("quiz-question").innerText = q.q;
  document.getElementById("quiz-answer").innerText = q.a;
  document.getElementById("quiz-answer").classList.add("hidden");
}
