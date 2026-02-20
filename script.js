// login check
const currentUser=localStorage.getItem("rev_current_user");
if(!currentUser){location.href="login.html";}
document.getElementById("userName").textContent="👋 "+currentUser;

document.getElementById("logoutBtn").onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.href="login.html";
};

// DATA (ADD SUBJECTS HERE)
const data={
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=17",a:"x=6"},
      {q:"x^2+5x+6",a:"(x+2)(x+3)"},
      {q:"3x=12",a:"x=4"}
    ]
  },
  Science:{
    Physics:[
      {q:"Define velocity",a:"Speed with direction"},
      {q:"Unit of force",a:"Newton"}
    ]
  }
};

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");
const counter=document.getElementById("questionCounter");
const progressText=document.getElementById("topicProgress");
const searchBox=document.getElementById("searchBox");

let random=false;

function populateSubjects(){
  subjectSelect.innerHTML="";
  Object.keys(data).forEach(s=>{
    const o=document.createElement("option");
    o.value=s;o.textContent=s;
    subjectSelect.appendChild(o);
  });
  populateTopics();
}

function populateTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    const o=document.createElement("option");
    o.value=t;o.textContent=t;
    topicSelect.appendChild(o);
  });
  showQuestions();
}

function showQuestions(){
  questionArea.innerHTML="";
  let list=[...data[subjectSelect.value][topicSelect.value]];

  const search=searchBox.value.toLowerCase();
  if(search) list=list.filter(x=>x.q.toLowerCase().includes(search));

  if(random) list=[list[Math.floor(Math.random()*list.length)]];

  counter.textContent=list.length+" question(s)";

  const done=JSON.parse(localStorage.getItem(currentUser+"_done")||"{}");

  list.forEach((it,i)=>{
    const card=document.createElement("div");
    card.className="question-card";

    const key=it.q;
    if(done[key]?.difficult) card.classList.add("difficult");

    card.innerHTML=`
      <div>Q${i+1}. ${it.q}</div>
      <button class="show-btn">Show</button>
      <button class="diff-btn">⭐</button>
      <div class="answer">${it.a}</div>
    `;

    const show=card.querySelector(".show-btn");
    const ans=card.querySelector(".answer");
    const diff=card.querySelector(".diff-btn");

    show.onclick=()=>{
      ans.style.display=ans.style.display==="block"?"none":"block";
      done[key]={...done[key],seen:true};
      saveProgress(done);
    };

    diff.onclick=()=>{
      card.classList.toggle("difficult");
      done[key]={...done[key],difficult:card.classList.contains("difficult")};
      saveProgress(done);
    };

    questionArea.appendChild(card);
  });

  updateTopicProgress(done);
}

function saveProgress(obj){
  localStorage.setItem(currentUser+"_done",JSON.stringify(obj));
  checkAchievements(obj);
}

function updateTopicProgress(done){
  const all=data[subjectSelect.value][topicSelect.value];
  const seen=all.filter(q=>done[q.q]?.seen).length;
  progressText.textContent=`Progress: ${seen}/${all.length}`;
}

// THEME
document.getElementById("toggleTheme").onclick=()=>{
  document.body.style.background=
    document.body.style.background===""?"#f1f5f9":"";
};

// RANDOM
document.getElementById("randomMode").onclick=()=>{
  random=!random;
  showQuestions();
};

// SEARCH
searchBox.oninput=showQuestions;

// ACHIEVEMENTS
function checkAchievements(done){
  const count=Object.values(done).filter(x=>x.seen).length;
  if(count===10) alert("🏆 10 Questions Done!");
  if(count===25) alert("🏆 25 Questions Done!");
}

subjectSelect.onchange=populateTopics;
topicSelect.onchange=showQuestions;

populateSubjects();
