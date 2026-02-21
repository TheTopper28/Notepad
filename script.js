// ================= LOGIN SYSTEM =================
document.addEventListener("DOMContentLoaded",()=>{

const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const loginBtn=document.getElementById("loginBtn");
const resetBtn=document.getElementById("resetBtn");
const nameInput=document.getElementById("nameInput");
const passInput=document.getElementById("passInput");
const error=document.getElementById("loginError");
const userName=document.getElementById("userName");

// LOGIN / REGISTER
loginBtn.onclick=()=>{
  const name=nameInput.value.trim();
  const pass=passInput.value.trim();

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
};

// SHOW APP
function showApp(name){
  loginPage.style.display="none";
  appPage.classList.remove("hidden");
  userName.textContent=name;
}

// AUTO LOGIN
const savedUser=localStorage.getItem("rev_current_user");
if(savedUser){
  showApp(savedUser);
}

// RESET
if(resetBtn){
  resetBtn.onclick=()=>{
    localStorage.clear();
    alert("Accounts cleared");
    location.reload();
  };
}

});
// LOGOUT
logoutBtn.onclick=()=>{
  localStorage.removeItem("activeUser");
  location.href="login.html";
};

// SAMPLE QUESTIONS (YOU EDIT HERE)
const data={
  Math:{
    Algebra:[
      {q:"2x+3=7",a:"x=2"},
      {q:"3x=12",a:"x=4"}
    ]
  },
  Science:{
    Physics:[
      {q:"Unit of force?",a:"Newton"}
    ]
  }
};

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const quizContainer=document.getElementById("quizContainer");

let mode="quiz";
let current=0;
let marked=[];

function loadSubjects(){
  subjectSelect.innerHTML="";
  Object.keys(data).forEach(s=>{
    subjectSelect.innerHTML+=`<option>${s}</option>`;
  });
  loadTopics();
}

function loadTopics(){
  const s=subjectSelect.value;
  topicSelect.innerHTML="";
  Object.keys(data[s]).forEach(t=>{
    topicSelect.innerHTML+=`<option>${t}</option>`;
  });
  render();
}

subjectSelect.onchange=loadTopics;
topicSelect.onchange=render;

modeToggle.onclick=()=>{
  mode=mode==="quiz"?"all":"quiz";
  render();
};

themeToggle.onclick=()=>{
  document.body.classList.toggle("light");
};

markedToggle.onclick=()=>{
  markedPanel.classList.add("open");
};
closeMarked.onclick=()=>{
  markedPanel.classList.remove("open");
};

function render(){
  const q=data[subjectSelect.value][topicSelect.value];

  if(mode==="all"){
    quizContainer.innerHTML="";
    q.forEach((x,i)=>{
      quizContainer.innerHTML+=`
        <div class="card">
          ${x.q}
          <div class="answer">${x.a}</div>
          <button onclick="this.previousElementSibling.style.display='block'">
            Show Answer
          </button>
        </div>
      `;
    });
  }else{
    const x=q[current];
    quizContainer.innerHTML=`
      <div class="card">
        ${x.q}
        <div class="answer">${x.a}</div>
        <button onclick="this.previousElementSibling.style.display='block'">
          Show Answer
        </button>

        <div class="navBtns">
          <button onclick="prev()">Prev</button>
          <button onclick="next()">Next</button>
        </div>
      </div>
    `;
  }
}

function next(){
  const q=data[subjectSelect.value][topicSelect.value];
  current=(current+1)%q.length;
  render();
}

function prev(){
  const q=data[subjectSelect.value][topicSelect.value];
  current=(current-1+q.length)%q.length;
  render();
}

loadSubjects();
