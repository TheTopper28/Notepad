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
const quizToggle = document.getElementById("quizToggle");
quizToggle.onclick = () => {
  quizMode = !quizMode;
  quizToggle.textContent = quizMode ? "Practice Mode" : "Quiz Mode";
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
  list.forEach((it, i) => {
    const card = document.createElement("div");
    card.className = "question-card";

    if (quizMode) {
      // Quiz Mode: multiple choice
      const options = [it.a, "Option A", "Option B", "Option C"].sort(() => Math.random() - 0.5);
      card.innerHTML = `<div>Q${i + 1}. ${it.q}</div>`;
      options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "show-btn";
        btn.onclick = () => {
          if (opt === it.a) {
            btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
          } else {
            btn.style.background = "linear-gradient(135deg,#ef4444,#dc2626)";
          }
        };
        card.appendChild(btn);
      });
    } else {
      // Practice Mode: show answer
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
    }

    questionArea.appendChild(card);
  });
}

// ===== EVENT BINDINGS =====
subjectSelect.onchange = populateTopics;
topicSelect.onchange = showQuestions;
populateSubjects();
