const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const userName = document.getElementById("userName");
const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");
const logoutBtn = document.getElementById("logoutBtn");

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionArea = document.getElementById("questionArea");
const counter = document.getElementById("counter");
const themeBtn = document.getElementById("themeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleBtn = document.getElementById("toggleBtn");
const diffList = document.getElementById("diffList");
const difficultPanel = document.getElementById("difficultPanel");
const toggleDifficultBtn = document.getElementById("toggleDifficultBtn");

const data = {
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x=5",d:false},
      {q:"x²−9",a:"(x−3)(x+3)",d:true}
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

let questions=[];
let index=0;
let single=true;

// LOGIN
loginBtn.onclick=()=>{
  const u=userInput.value.trim();
  const p=passInput.value.trim();
  if(!u||!p) return;

  let users=JSON.parse(localStorage.getItem("rev_users")||"{}");
  if(!users[u]) users[u]=p;
  else if(users[u]!==p) return alert("Wrong password");

  localStorage.setItem("rev_users",JSON.stringify(users));
  localStorage.setItem("rev_current_user",u);
  startApp(u);
};

function startApp(u){
  loginPage.style.opacity="0";
  loginPage.style.transform="scale(.95)";
  setTimeout(()=>{
    loginPage.classList.add("hidden");
    appPage.classList.remove("hidden");
    userName.textContent="👤 "+u;
    loadTopics();
  },500);
}

logoutBtn.onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.reload();
};

const cu=localStorage.getItem("rev_current_user");
if(cu) startApp(cu);

// SUBJECTS
Object.keys(data).forEach(s=>subjectSelect.innerHTML+=`<option>${s}</option>`);
subjectSelect.onchange=loadTopics;
topicSelect.onchange=loadQuestions;

function loadTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    topicSelect.innerHTML+=`<option>${t}</option>`;
  });
  loadQuestions();
}

function loadQuestions(){
  questions=data[subjectSelect.value][topicSelect.value];
  index=0;
  render();
}

// RENDER
function render(){
  counter.textContent=`${index+1}/${questions.length}`;

  if(single){
    questionArea.innerHTML=cardHTML(questions[index],index);
  }else{
    questionArea.innerHTML=questions.map((q,i)=>cardHTML(q,i)).join("");
  }

  attachShowButtons();
  renderDiff();
}

function cardHTML(q,i){
  return `<div class="card">
    <b>${q.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${q.d?"⭐":"☆"}</span>
    <div class="answer">${q.a}</div>
    <button class="showAnswerBtn">Show/Hide Answer</button>
  </div>`;
}

function attachShowButtons(){
  document.querySelectorAll(".showAnswerBtn").forEach(btn=>{
    const ans=btn.previousElementSibling;
    btn.onclick=()=>ans.style.display=
      ans.style.display==="block"?"none":"block";
  });
}

function toggleDiff(i){
  questions[i].d=!questions[i].d;
  render();
}

function renderDiff(){
  const list=questions.filter(q=>q.d);
  diffList.innerHTML=list.length
    ? list.map(q=>`<li>${q.q}</li>`).join("")
    : "<li>No marked</li>";
}

toggleDifficultBtn.onclick=()=>{
  difficultPanel.classList.toggle("active");
};

prevBtn.onclick=()=>{
  if(index>0){index--;render();}
};

nextBtn.onclick=()=>{
  if(index<questions.length-1){index++;render();}
};

toggleBtn.onclick=()=>{
  single=!single;
  toggleBtn.textContent=single?"Show All":"Single";
  render();
};

themeBtn.onclick=()=>{
  document.body.classList.toggle("light");
};
