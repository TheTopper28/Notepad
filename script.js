// LOGIN
const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.onclick = () => {
  const u = userInput.value.trim();
  const p = passInput.value.trim();
  if(!u || !p) return;

  localStorage.setItem("revUser", u);
  startApp(u);
};

function startApp(u){
  loginPage.classList.add("hidden");
  appPage.classList.remove("hidden");
  userName.textContent = u;
}

const savedUser = localStorage.getItem("revUser");
if(savedUser) startApp(savedUser);

logoutBtn.onclick = () => {
  localStorage.removeItem("revUser");
  location.reload();
};

// DATA
const data = {
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x = 5",d:false},
      {q:"Factor x²−9",a:"(x−3)(x+3)",d:true}
    ],
    Geometry:[
      {q:"Sum of triangle angles?",a:"180°",d:false}
    ]
  },
  Science:{
    Physics:[
      {q:"Unit of force?",a:"Newton",d:false}
    ]
  }
};

// ELEMENTS
const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const quizContainer = document.getElementById("quizContainer");
const modeToggle = document.getElementById("modeToggle");
const themeBtn = document.getElementById("themeBtn");
const markedToggle = document.getElementById("markedToggle");
const markedPanel = document.getElementById("markedPanel");
const markedList = document.getElementById("markedList");
const closeMarked = document.getElementById("closeMarked");

// STATE
let questions = [];
let index = 0;
let quizMode = true;

// INIT SUBJECTS
Object.keys(data).forEach(s=>{
  subjectSelect.innerHTML += `<option>${s}</option>`;
});
subjectSelect.onchange = loadTopics;
topicSelect.onchange = loadQuestions;

function loadTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    topicSelect.innerHTML += `<option>${t}</option>`;
  });
  loadQuestions();
}

function loadQuestions(){
  questions = data[subjectSelect.value][topicSelect.value];
  index = 0;
  render();
}

// RENDER
function render(){
  if(quizMode){
    renderQuiz();
  }else{
    renderAll();
  }
  updateMarked();
}

// QUIZ MODE
function renderQuiz(){
  const q = questions[index];
  quizContainer.innerHTML = `
    <div class="card">
      <div class="star" onclick="toggleMark(${index})">${q.d?"⭐":"☆"}</div>
      <div>${q.q}</div>
      <div class="answer">${q.a}</div>
      <button class="showBtn">Show Answer</button>

      <div class="navBtns">
        <button onclick="prevQ()">Prev</button>
        <button onclick="nextQ()">Next</button>
      </div>
    </div>
  `;

  document.querySelector(".showBtn").onclick = e=>{
    const ans = document.querySelector(".answer");
    ans.style.display = ans.style.display==="block"?"none":"block";
  };
}

// SHOW ALL
function renderAll(){
  quizContainer.innerHTML = `
    <div class="allContainer">
      ${questions.map((q,i)=>`
        <div class="allCard">
          <div class="star" onclick="toggleMark(${i})">${q.d?"⭐":"☆"}</div>
          <div>${q.q}</div>
          <div class="answer">${q.a}</div>
          <button class="showBtn">Show</button>
        </div>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".showBtn").forEach(btn=>{
    btn.onclick = ()=>{
      const ans = btn.previousElementSibling;
      ans.style.display = ans.style.display==="block"?"none":"block";
    };
  });
}

// NAV
function nextQ(){
  if(index < questions.length-1){
    index++;
    renderQuiz();
  }
}

function prevQ(){
  if(index > 0){
    index--;
    renderQuiz();
  }
}

// MARK
function toggleMark(i){
  questions[i].d = !questions[i].d;
  render();
}

// MARKED PANEL
function updateMarked(){
  const marked = questions.filter(q=>q.d);
  markedList.innerHTML = marked.map(q=>`
    <div class="markedItem">${q.q}</div>
  `).join("");
}

markedToggle.onclick = ()=> markedPanel.classList.add("open");
closeMarked.onclick = ()=> markedPanel.classList.remove("open");

// MODE
modeToggle.onclick = ()=>{
  quizMode = !quizMode;
  modeToggle.textContent = quizMode ? "Quiz" : "All";
  render();
};

// THEME
themeBtn.onclick = ()=>{
  document.body.classList.toggle("light");
};

// START
loadTopics();
