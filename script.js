// ===== LOGIN =====
const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const userName=document.getElementById("userName");
const loginBtn=document.getElementById("loginBtn");
const userInput=document.getElementById("userInput");
const passInput=document.getElementById("passInput");
const logoutBtn=document.getElementById("logoutBtn");

loginBtn.onclick=()=>{
  const u=userInput.value.trim();
  const p=passInput.value.trim();
  if(!u||!p){alert("Enter details"); return;}
  let users=JSON.parse(localStorage.getItem("rev_users")||"{}");
  if(!users[u]){users[u]=p; alert("Account created");}
  else if(users[u]!==p){alert("Wrong password"); return;}
  localStorage.setItem("rev_users",JSON.stringify(users));
  localStorage.setItem("rev_current_user",u);
  startApp(u);
};

function startApp(u){
  loginPage.classList.add("hidden");
  appPage.classList.remove("hidden");
  userName.textContent="👤 "+u;
}

// Check if already logged in
const currentUser=localStorage.getItem("rev_current_user");
if(currentUser) startApp(currentUser);
logoutBtn.onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.reload();
};

// ===== DATA =====
const data={
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

// ===== ELEMENTS =====
const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");
const counter=document.getElementById("counter");
const themeBtn=document.getElementById("themeBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const toggleBtn=document.getElementById("toggleBtn");

// ===== STATE =====
let questions=[];
let index=0;
let single=true;

// ===== INIT SUBJECTS =====
Object.keys(data).forEach(s=>{
  subjectSelect.innerHTML+=`<option>${s}</option>`;
});
subjectSelect.addEventListener("change",loadTopics);
topicSelect.addEventListener("change",loadQuestions);

// ===== LOAD TOPICS =====
function loadTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    topicSelect.innerHTML+=`<option>${t}</option>`;
  });
  loadQuestions();
}

// ===== LOAD QUESTIONS =====
function loadQuestions(){
  questions=data[subjectSelect.value][topicSelect.value];
  index=0;
  render();
}

// ===== RENDER =====
function render(){
  counter.textContent=`${index+1}/${questions.length}`;
  if(single){
    questionArea.innerHTML=questions.length>0?singleCardHTML(questions[index],index):"No questions";
    attachShowButtons();
  }else{
    questionArea.innerHTML=questions.map((q,i)=>multiCardHTML(q,i)).join("");
    attachShowButtons();
  }
}

// ===== CARD HTML =====
function singleCardHTML(qObj,i){
  return `<div class="card">
    <b>${qObj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${qObj.d?"⭐":"☆"}</span>
    <div class="answer">${qObj.a}</div>
    <button class="showAnswerBtn">Show/Hide Answer</button>
  </div>`;
}

function multiCardHTML(qObj,i){
  return `<div class="card">
    <b>${qObj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${qObj.d?"⭐":"☆"}</span>
    <div class="answer">${qObj.a}</div>
    <button class="showAnswerBtn">Show/Hide Answer</button>
  </div>`;
}

// ===== ATTACH SHOW BUTTONS =====
function attachShowButtons(){
  document.querySelectorAll(".showAnswerBtn").forEach(btn=>{
    const ans=btn.previousElementSibling;
    btn.onclick=()=>{ans.style.display=ans.style.display==="block"?"none":"block";}
  });
}

// ===== TOGGLE DIFFICULT =====
function toggleDiff(i){
  questions[i].d=!questions[i].d;
  render();
}

// ===== NAVIGATION =====
prevBtn.onclick=()=>{
  if(index>0) index--;
  render();
};
nextBtn.onclick=()=>{
  if(index<questions.length-1) index++;
  render();
};
toggleBtn.onclick=()=>{
  single=!single;
  toggleBtn.textContent=single?"Show All":"Single";
  render();
};

// ===== THEME =====
themeBtn.onclick=()=>document.body.classList.toggle("light");

// ===== INITIAL LOAD =====
loadTopics();
