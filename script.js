// ========= DATA =========
const data={
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x=5",d:false},
      {q:"Factor x²-9",a:"(x-3)(x+3)",d:true}
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

// LOGIN
const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const loginBtn=document.getElementById("loginBtn");
const resetBtn=document.getElementById("resetBtn");
const logoutBtn=document.getElementById("logoutBtn");
const nameInput=document.getElementById("nameInput");
const passInput=document.getElementById("passInput");
const loginError=document.getElementById("loginError");
const userName=document.getElementById("userName");

loginBtn.onclick=()=>{
  const name=nameInput.value.trim();
  const pass=passInput.value.trim();
  if(!name||!pass){loginError.textContent="Enter details";return;}

  let users=JSON.parse(localStorage.getItem("rev_users")||"{}");

  if(!users[name]){
    users[name]=pass;
    localStorage.setItem("rev_users",JSON.stringify(users));
  }
  else if(users[name]!==pass){
    loginError.textContent="Wrong password";
    return;
  }

  localStorage.setItem("rev_current_user",name);
  loginPage.style.display="none";
  appPage.classList.remove("hidden");
  userName.textContent=name;
};

const savedUser=localStorage.getItem("rev_current_user");
if(savedUser){
  loginPage.style.display="none";
  appPage.classList.remove("hidden");
  userName.textContent=savedUser;
}

resetBtn.onclick=()=>{localStorage.clear();location.reload();}
logoutBtn.onclick=()=>{localStorage.removeItem("rev_current_user");location.reload();}

// THEME
document.getElementById("themeBtn").onclick=()=>{
  document.body.classList.toggle("light");
};

// QUIZ
const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const quizContainer=document.getElementById("quizContainer");
const modeBtn=document.getElementById("modeBtn");
const markedBtn=document.getElementById("markedBtn");
const markedPanel=document.getElementById("markedPanel");
const closeMarked=document.getElementById("closeMarked");
const markedList=document.getElementById("markedList");

let questions=[];
let index=0;
let quizMode=true;

Object.keys(data).forEach(s=>{
  subjectSelect.innerHTML+=`<option>${s}</option>`;
});

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

function render(){
  if(quizMode){
    const q=questions[index];
    quizContainer.innerHTML=`
      <div class="card">
        ${q.q}
        <button class="showBtn">Show Answer</button>
        <div class="answer">${q.a}</div>
        <span class="star">${q.d?"⭐":"☆"}</span>
        <div class="navBtns">
          <button id="prevBtn">Previous</button>
          <button id="nextBtn">Next</button>
        </div>
      </div>
    `;
  }else{
    quizContainer.innerHTML=`<div class="allContainer">${
      questions.map(q=>`
        <div class="allCard">
          ${q.q}
          <button class="showBtn">Show Answer</button>
          <div class="answer">${q.a}</div>
          <span class="star">${q.d?"⭐":"☆"}</span>
        </div>
      `).join("")
    }</div>`;
  }

  attachEvents();
}

function attachEvents(){
  document.querySelectorAll(".showBtn").forEach(btn=>{
    btn.onclick=()=>{
      const ans=btn.nextElementSibling;
      ans.style.display=ans.style.display==="block"?"none":"block";
    };
  });

  document.querySelectorAll(".star").forEach((s,i)=>{
    s.onclick=()=>{
      questions[i].d=!questions[i].d;
      render();
      updateMarked();
    };
  });

  const prev=document.getElementById("prevBtn");
  const next=document.getElementById("nextBtn");

  if(prev) prev.onclick=()=>{if(index>0) index--; render();};
  if(next) next.onclick=()=>{if(index<questions.length-1) index++; render();};
}

modeBtn.onclick=()=>{
  quizMode=!quizMode;
  modeBtn.textContent=quizMode?"Quiz Mode":"Show All";
  render();
};

markedBtn.onclick=()=>{
  markedPanel.classList.add("open");
  updateMarked();
};

closeMarked.onclick=()=>{
  markedPanel.classList.remove("open");
};

function updateMarked(){
  const marked=questions.filter(q=>q.d);
  markedList.innerHTML=marked.map(q=>`<div>${q.q}</div>`).join("");
}

loadTopics();
