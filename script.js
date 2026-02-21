const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionArea = document.getElementById("questionArea");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modeToggle = document.getElementById("modeToggle");

const markedToggle = document.getElementById("markedToggle");
const markedPanel = document.getElementById("markedPanel");
const closeMarked = document.getElementById("closeMarked");
const markedList = document.getElementById("markedList");

let questions = [];
let index = 0;
let singleMode = true;

const data = {
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x=5",d:false},
      {q:"x²-9",a:"(x-3)(x+3)",d:true}
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

loginBtn.onclick = () => {
  const u = userInput.value.trim();
  const p = passInput.value.trim();
  if(!u || !p) return;

  localStorage.setItem("rev_user", u);
  startApp(u);
};

logoutBtn.onclick = () => {
  localStorage.removeItem("rev_user");
  location.reload();
};

function startApp(u){
  userName.textContent = "👤 " + u;
  loginPage.classList.add("hidden");
  appPage.classList.remove("hidden");
  loadSubjects();
}

const saved = localStorage.getItem("rev_user");
if(saved) startApp(saved);

function loadSubjects(){
  subjectSelect.innerHTML = "";
  Object.keys(data).forEach(s=>{
    subjectSelect.innerHTML += `<option>${s}</option>`;
  });
  loadTopics();
}

function loadTopics(){
  topicSelect.innerHTML = "";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    topicSelect.innerHTML += `<option>${t}</option>`;
  });
  loadQuestions();
}

subjectSelect.onchange = loadTopics;
topicSelect.onchange = loadQuestions;

function loadQuestions(){
  questions = data[subjectSelect.value][topicSelect.value];
  index = 0;
  render();
}

function render(){
  counter.textContent = questions.length ? `${index+1}/${questions.length}` : "0/0";

  if(singleMode){
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";

    const q = questions[index];
    questionArea.innerHTML = `
      <div class="card">
        <span class="star" onclick="toggleMark(${index})">${q.d?"⭐":"☆"}</span>
        <div>${q.q}</div>
        <div class="answer">${q.a}</div>
        <button class="showBtn">Show Answer</button>
      </div>`;

    attachShow();
  }else{
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";

    questionArea.innerHTML = `<div class="allContainer">
      ${questions.map((q,i)=>`
        <div class="allCard">
          <span class="star" onclick="toggleMark(${i})">${q.d?"⭐":"☆"}</span>
          <div>${q.q}</div>
          <div class="answer">${q.a}</div>
          <button class="showBtn">Show Answer</button>
        </div>
      `).join("")}
    </div>`;

    attachShow();
  }

  updateMarked();
}

function attachShow(){
  document.querySelectorAll(".showBtn").forEach(btn=>{
    const ans = btn.previousElementSibling;
    btn.onclick = ()=>{
      ans.style.display = ans.style.display==="block"?"none":"block";
    };
  });
}

prevBtn.onclick = ()=>{
  if(index>0){ index--; render(); }
};

nextBtn.onclick = ()=>{
  if(index<questions.length-1){ index++; render(); }
};

modeToggle.onclick = ()=>{
  singleMode = !singleMode;
  modeToggle.textContent = singleMode?"Show All":"Quiz Mode";
  render();
};

function toggleMark(i){
  questions[i].d = !questions[i].d;
  render();
}

markedToggle.onclick = ()=> markedPanel.classList.add("open");
closeMarked.onclick = ()=> markedPanel.classList.remove("open");

function updateMarked(){
  const marked = questions.filter(q=>q.d);
  markedList.innerHTML = marked.length
    ? marked.map(q=>`<div class="markedItem">${q.q}</div>`).join("")
    : "No marked questions";
}
