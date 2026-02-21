// redirect if not logged
const currentUser = localStorage.getItem("rev_current_user");
if (!currentUser) { location.href = "login.html"; }

// show user
document.getElementById("userName").textContent = "👋 " + currentUser;

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("rev_current_user");
  location.href = "login.html";
};

// ===== DATA =====
const data = {
  Computer: {
    Chapter4: [
      { q: "What is the fullform of IDE", a: "Integrated Development Environment" },
      { q: "If a line begins from '//' it is a _______", a: "Comment line" },
      { q: "What are variables?", a: "A variable is a portion of memory used to store values." },
      { q: "What are constants?", a: "A constant is a sequence of characters that have fixed value." },
      { q: "Define BODMAS", a: "Brackets Of Division Multiplication Addition and Subtraction." },
      { q: "Give an example of logical operators", a: " '&&' '||'  '!' " },
      { q: "What are relational operators", a: "They are operators that show comparison i.e. ==,>=,<= etc." }
    ]
  },
  Science: {
    Physics: [
      { q: "QUESTIONS NOT YET UPLOADED", a: "" }
    ]
  }
};

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionArea = document.getElementById("questionArea");

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("rev_theme", document.body.classList.contains("light") ? "light" : "dark");
};
if (localStorage.getItem("rev_theme") === "light") {
  document.body.classList.add("light");
}

// ===== QUIZ MODE =====
let quizMode = false;
let currentIndex = 0;
const quizToggle = document.getElementById("quizToggle");
quizToggle.onclick = () => {
  quizMode = !quizMode;
  quizToggle.textContent = quizMode ? "Practice Mode" : "Quiz Mode";
  currentIndex = 0;
  showQuestions();
};

// ===== POPULATE SUBJECTS =====
function populateSubjects() {
  subjectSelect.innerHTML = "";
  Object.keys(data).forEach(s => {
    const o = document.createElement("option");
    o.value = s; o.textContent = s;
    subjectSelect.appendChild(o);
  });
  populateTopics();
}

// ===== POPULATE TOPICS =====
function populateTopics() {
  topicSelect.innerHTML = "";
  Object.keys(data[subjectSelect.value]).forEach(t => {
    const o = document.createElement("option");
    o.value = t; o.textContent = t;
    topicSelect.appendChild(o);
  });
  showQuestions();
}

// ===== SHOW QUESTIONS =====
function showQuestions() {
  questionArea.innerHTML = "";
  const list = data[subjectSelect.value][topicSelect.value];

  if (quizMode) {
    // Quiz Mode: one question at a time
    const it = list[currentIndex];
    const card = document.createElement("div");
    card.className = "question-card fade";
    card.innerHTML = `
      <div>Q${currentIndex + 1}. ${it.q}</div>
      <button class="show-btn">Show Answer</button>
      <div class="answer">${it.a}</div>
      <div class="nav-buttons">
        <button id="prevBtn" class="show-btn">Previous</button>
        <button id="nextBtn" class="show-btn">Next</button>
      </div>
    `;
    const b = card.querySelector(".show-btn");
    const a = card.querySelector(".answer");
    b.onclick = () => {
      a.style.display = a.style.display === "block" ? "none" : "block";
    };
    questionArea.appendChild(card);

    // Navigation
    document.getElementById("prevBtn").onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        transitionQuestion();
      }
    };
    document.getElementById("nextBtn").onclick = () => {
      if (currentIndex < list.length - 1) {
        currentIndex++;
        transitionQuestion();
      }
    };

  } else {
    // Practice Mode: all questions at once
    list.forEach((it, i) => {
      const card = document.createElement("div");
      card.className = "question-card";
      card.innerHTML = `
        <div>Q${i + 1}. ${it.q}</div>
        <button class="show-btn">Show Answer</button>
        <div class="answer">${it.a}</div>
      `;
      const b = card.querySelector(".show-btn");
      const a = card.querySelector(".answer");
      b.onclick = () => {
        a.style.display = a.style.display === "block" ? "none" : "block";
      };
      questionArea.appendChild(card);
    });
  }
}

// Smooth transition when switching questions
function transitionQuestion() {
  questionArea.classList.add("fade-out");
  setTimeout(() => {
    showQuestions();
    questionArea.classList.remove("fade-out");
  }, 300);
}

// ===== EVENT BINDINGS =====
subjectSelect.onchange = populateTopics;
topicSelect.onchange = showQuestions;
populateSubjects();
