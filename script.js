// DATA
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

// ELEMENTS
const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");
const counter=document.getElementById("counter");
const searchBox=document.getElementById("searchBox");
const themeBtn=document.getElementById("themeBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const toggleBtn=document.getElementById("toggleBtn");

// STATE
let questions=[];
let index=0;
let single=true;

// INIT SUBJECTS
Object.keys(data).forEach(s=>{
  const opt=document.createElement("option");
  opt.value=s; opt.textContent=s;
  subjectSelect.appendChild(opt);
});
subjectSelect.addEventListener("change",loadTopics);
topicSelect.addEventListener("change",loadQuestions);

// LOAD TOPICS
function loadTopics(){
  topicSelect.innerHTML="";
  const topics=Object.keys(data[subjectSelect.value]);
  topics.forEach(t=>{
    const opt=document.createElement("option");
    opt.value=t; opt.textContent=t;
    topicSelect.appendChild(opt);
  });
  loadQuestions();
}

// LOAD QUESTIONS
function loadQuestions(){
  questions=data[subjectSelect.value][topicSelect.value];
  index=0;
  render();
}

// RENDER FUNCTION
function render(){
  counter.textContent=`${index+1}/${questions.length}`;
  if(single){
    questionArea.innerHTML=cardHTML(questions[index],index);
  }else{
    questionArea.innerHTML=questions.map((q,i)=>cardHTML(q,i)).join("");
  }
}

// CARD HTML
function cardHTML(qObj,i){
  return `<div class="card">
    <b>${qObj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${qObj.d?"⭐":"☆"}</span>
    <div class="answer">${qObj.a}</div>
  </div>`;
}

// TOGGLE DIFFICULT
function toggleDiff(i){
  questions[i].d=!questions[i].d;
  render();
}

// NAVIGATION
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

// SEARCH
searchBox.oninput=()=>{
  const term=searchBox.value.toLowerCase();
  questions=data[subjectSelect.value][topicSelect.value]
    .filter(q=>q.q.toLowerCase().includes(term));
  index=0;
  render();
};

// THEME
themeBtn.onclick=()=>document.body.classList.toggle("light");

// INITIAL LOAD
loadTopics();
