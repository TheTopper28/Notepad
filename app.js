// LOGIN
const USER="student";
const PASS="1234";

function login(){
  const name=document.getElementById("nameInput").value.trim();
  const pass=document.getElementById("passInput").value.trim();
  const error=document.getElementById("loginError");

  if(pass!==PASS){
    error.textContent="Wrong password";
    return;
  }
  if(!name){
    error.textContent="Enter your name";
    return;
  }

  document.getElementById("userName").textContent=name;

  // switch pages correctly
  document.getElementById("loginPage").style.display="none";
  document.getElementById("appPage").classList.remove("hidden");

  initSelectors();
}

// DATA
const data={
  Math:{
    Algebra:[
      {q:"Solve: 2x + 5 = 15",a:"x = 5"},
      {q:"Factor: x² - 9",a:"(x-3)(x+3)"}
    ],
    Geometry:[
      {q:"Angle sum of triangle?",a:"180°"}
    ]
  },
  Science:{
    Physics:[
      {q:"Unit of force?",a:"Newton"},
      {q:"Speed formula?",a:"distance / time"}
    ]
  }
};

let currentSubject,currentTopic,questions=[],index=0,marked=[],quizMode=true;

// SELECTORS
function initSelectors(){
  const subj=document.getElementById("subjectSelect");
  subj.innerHTML="";
  Object.keys(data).forEach(s=>subj.add(new Option(s,s)));
  subj.onchange=loadTopics;
  loadTopics();
}

function loadTopics(){
  currentSubject=document.getElementById("subjectSelect").value;
  const topicSel=document.getElementById("topicSelect");
  topicSel.innerHTML="";
  Object.keys(data[currentSubject]).forEach(t=>topicSel.add(new Option(t,t)));
  topicSel.onchange=loadQuestions;
  loadQuestions();
}

function loadQuestions(){
  currentTopic=document.getElementById("topicSelect").value;
  questions=data[currentSubject][currentTopic];
  index=0;
  render();
}

// RENDER
function render(){
  quizMode?renderQuiz():renderAll();
}

function renderQuiz(){
  const q=questions[index];
  document.getElementById("quizContainer").innerHTML=`
  <div class="card">
    <div class="star" onclick="toggleMark(${index})">
      ${marked.includes(q.q)?"⭐":"☆"}
    </div>
    <div>${q.q}</div>
    <button class="showBtn" onclick="this.nextElementSibling.style.display='block'">Show Answer</button>
    <div class="answer">${q.a}</div>
    <div class="navBtns">
      <button onclick="prev()">Previous</button>
      <button onclick="next()">Next</button>
    </div>
  </div>`;
  document.getElementById("allContainer").classList.add("hidden");
}

function renderAll(){
  const cont=document.getElementById("allContainer");
  cont.innerHTML="";
  questions.forEach((q,i)=>{
    const div=document.createElement("div");
    div.className="allCard";
    div.innerHTML=`
      <div class="star" onclick="toggleMark(${i})">
        ${marked.includes(q.q)?"⭐":"☆"}
      </div>
      <div>${q.q}</div>
      <button onclick="this.nextElementSibling.style.display='block'">Show Answer</button>
      <div class="answer">${q.a}</div>
    `;
    cont.appendChild(div);
  });
  cont.classList.remove("hidden");
  document.getElementById("quizContainer").innerHTML="";
}

// NAV
function next(){ if(index<questions.length-1){ index++; renderQuiz(); } }
function prev(){ if(index>0){ index--; renderQuiz(); } }

// MODE
function toggleMode(){
  quizMode=!quizMode;
  document.getElementById("modeBtn").textContent=quizMode?"Quiz Mode":"Show All";
  render();
}

// THEME
function toggleTheme(){
  document.body.classList.toggle("light");
}

// MARK
function toggleMark(i){
  const q=questions[i].q;
  marked.includes(q)?marked=marked.filter(m=>m!==q):marked.push(q);
  render();
  renderMarked();
}

function toggleMarked(){
  document.getElementById("markedPanel").classList.toggle("open");
  renderMarked();
}

function renderMarked(){
  const list=document.getElementById("markedList");
  list.innerHTML="";
  marked.forEach(m=>{
    const div=document.createElement("div");
    div.className="markedItem";
    div.textContent=m;
    list.appendChild(div);
  });
}
