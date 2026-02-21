const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const loginBtn=document.getElementById("loginBtn");
const nameInput=document.getElementById("nameInput");
const userName=document.getElementById("userName");

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const area=document.getElementById("questionArea");

const quizBtn=document.getElementById("quizModeBtn");
const allBtn=document.getElementById("allModeBtn");

let currentQuestions=[];
let index=0;

/* LOGIN */
loginBtn.onclick=()=>{
  const name=nameInput.value.trim();
  if(!name)return;
  userName.textContent=name;
  loginPage.classList.add("hidden");
  appPage.classList.remove("hidden");
};

/* DATA */
const data={
 Computer:{
  Chapter4:[
   {q:"What is IDE?",a:"Integrated Development Environment"},
   {q:"What is variable?",a:"A memory location storing value"},
   {q:"Define BODMAS",a:"Order of operations"}
  ]
 }
};

/* SUBJECTS */
Object.keys(data).forEach(s=>{
  const opt=document.createElement("option");
  opt.textContent=s;
  subjectSelect.appendChild(opt);
});

subjectSelect.onchange=loadTopics;
topicSelect.onchange=loadQuestions;

function loadTopics(){
  topicSelect.innerHTML="";
  const subj=data[subjectSelect.value];
  Object.keys(subj).forEach(t=>{
    const opt=document.createElement("option");
    opt.textContent=t;
    topicSelect.appendChild(opt);
  });
  loadQuestions();
}

function loadQuestions(){
  currentQuestions=data[subjectSelect.value][topicSelect.value];
  showQuiz();
}

/* MODES */
quizBtn.onclick=showQuiz;
allBtn.onclick=showAll;

/* QUIZ */
function showQuiz(){
  const q=currentQuestions[index];
  if(!q)return;

  area.innerHTML=`
    <div class="quiz-card">
      <div>${q.q}</div>
      <button class="showBtn">Show Answer</button>
      <div class="answer">${q.a}</div>

      <div class="navBtns">
        <button id="prevBtn">Previous</button>
        <button id="nextBtn">Next</button>
      </div>
    </div>
  `;

  const ans=area.querySelector(".answer");
  area.querySelector(".showBtn").onclick=()=>{
    ans.style.display=ans.style.display==="block"?"none":"block";
  };

  document.getElementById("prevBtn").onclick=()=>{
    index=(index-1+currentQuestions.length)%currentQuestions.length;
    showQuiz();
  };

  document.getElementById("nextBtn").onclick=()=>{
    index=(index+1)%currentQuestions.length;
    showQuiz();
  };
}

/* ALL */
function showAll(){
  area.innerHTML="";
  currentQuestions.forEach(q=>{
    const card=document.createElement("div");
    card.className="all-card";
    card.innerHTML=`
      <div class="all-q">${q.q}</div>
      <button class="showBtn">Show Answer</button>
      <div class="all-a">${q.a}</div>
    `;
    const ans=card.querySelector(".all-a");
    card.querySelector(".showBtn").onclick=()=>{
      ans.style.display=ans.style.display==="block"?"none":"block";
    };
    area.appendChild(card);
  });
}

/* INIT */
loadTopics();
