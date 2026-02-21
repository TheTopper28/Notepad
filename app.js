document.addEventListener("DOMContentLoaded",()=>{

const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");
const userName=document.getElementById("userName");

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const quizContainer=document.getElementById("quizContainer");
const allContainer=document.getElementById("allContainer");

const modeBtn=document.getElementById("modeBtn");
const themeBtn=document.getElementById("themeBtn");

const markedBtn=document.getElementById("markedBtn");
const closeMarked=document.getElementById("closeMarked");
const markedPanel=document.getElementById("markedPanel");
const markedList=document.getElementById("markedList");

// ---------- LOGIN ----------
loginBtn.addEventListener("click",()=>{
  const name=document.getElementById("nameInput").value.trim();
  const pass=document.getElementById("passInput").value.trim();
  const error=document.getElementById("loginError");

  if(!name || !pass){
    error.textContent="Enter username & password";
    return;
  }

  let users=JSON.parse(localStorage.getItem("rev_users")||"{}");

  if(!users[name]){
    users[name]=pass;
    localStorage.setItem("rev_users",JSON.stringify(users));
  }
  else if(users[name]!==pass){
    error.textContent="Wrong password";
    return;
  }

  localStorage.setItem("rev_current_user",name);
  showApp(name);
});

function showApp(name){
  loginPage.style.display="none";
  appPage.classList.remove("hidden");
  userName.textContent=name;
  initSubjects();
}

const saved=localStorage.getItem("rev_current_user");
if(saved) showApp(saved);

logoutBtn.onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.reload();
};

// ---------- DATA ----------
const data={
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x=5"},
      {q:"Factor x²-9",a:"(x-3)(x+3)"}
    ],
    Geometry:[
      {q:"Triangle angle sum?",a:"180°"}
    ]
  },
  Science:{
    Physics:[
      {q:"Unit of force?",a:"Newton"},
      {q:"Speed formula?",a:"distance/time"}
    ]
  }
};

let questions=[],index=0,quizMode=true,marked=[];

// ---------- SELECTORS ----------
function initSubjects(){
  subjectSelect.innerHTML="";
  Object.keys(data).forEach(s=>subjectSelect.add(new Option(s,s)));
  subjectSelect.onchange=loadTopics;
  loadTopics();
}

function loadTopics(){
  const s=subjectSelect.value;
  topicSelect.innerHTML="";
  Object.keys(data[s]).forEach(t=>topicSelect.add(new Option(t,t)));
  topicSelect.onchange=loadQuestions;
  loadQuestions();
}

function loadQuestions(){
  questions=data[subjectSelect.value][topicSelect.value];
  index=0;
  render();
}

// ---------- RENDER ----------
function render(){
  quizMode?renderQuiz():renderAll();
}

function renderQuiz(){
  const q=questions[index];
  quizContainer.innerHTML=`
    <div class="card">
      <div>${q.q}</div>
      <button onclick="this.nextElementSibling.style.display='block'">Show Answer</button>
      <div class="answer">${q.a}</div>
      <div class="navBtns">
        <button onclick="prev()">Previous</button>
        <button onclick="next()">Next</button>
      </div>
    </div>`;
  allContainer.classList.add("hidden");
}

function renderAll(){
  allContainer.innerHTML="";
  questions.forEach(q=>{
    const div=document.createElement("div");
    div.className="allCard";
    div.innerHTML=`
      <div>${q.q}</div>
      <button onclick="this.nextElementSibling.style.display='block'">Show Answer</button>
      <div class="answer">${q.a}</div>
    `;
    allContainer.appendChild(div);
  });
  allContainer.classList.remove("hidden");
  quizContainer.innerHTML="";
}

// ---------- NAV ----------
window.next=()=>{if(index<questions.length-1){index++;renderQuiz();}}
window.prev=()=>{if(index>0){index--;renderQuiz();}}

// ---------- MODE ----------
modeBtn.onclick=()=>{
  quizMode=!quizMode;
  modeBtn.textContent=quizMode?"Quiz Mode":"Show All";
  render();
};

// ---------- THEME ----------
themeBtn.onclick=()=>document.body.classList.toggle("light");

// ---------- MARK PANEL ----------
markedBtn.onclick=()=>markedPanel.classList.toggle("open");
closeMarked.onclick=()=>markedPanel.classList.remove("open");

});
