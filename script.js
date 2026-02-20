// DATA
const data={
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=15",a:"x=5",d:false},
      {q:"x²-9",a:"(x-3)(x+3)",d:true}
    ],
    Geometry:[
      {q:"Sum of triangle angles",a:"180°",d:false}
    ]
  },
  Science:{
    Physics:[
      {q:"Unit of force",a:"Newton",d:false}
    ]
  }
};

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");
const counter=document.getElementById("counter");
const searchBox=document.getElementById("searchBox");
const themeBtn=document.getElementById("themeBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const toggleBtn=document.getElementById("toggleBtn");

let questions=[];
let index=0;
let single=true;

// SUBJECTS
Object.keys(data).forEach(s=>{
  subjectSelect.innerHTML+=`<option>${s}</option>`;
});

subjectSelect.onchange=loadTopics;
topicSelect.onchange=loadQuestions;

function loadTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value])
    .forEach(t=>topicSelect.innerHTML+=`<option>${t}</option>`);
  loadQuestions();
}

function loadQuestions(){
  questions=data[subjectSelect.value][topicSelect.value];
  index=0;
  render();
}

function cardHTML(obj,i){
  return `
  <div class="card">
    <b>${obj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">
      ${obj.d?"⭐":"☆"}
    </span>
    <div class="answer">${obj.a}</div>
  </div>`;
}

function render(){
  counter.textContent=`${index+1}/${questions.length}`;
  if(single){
    questionArea.innerHTML=cardHTML(questions[index],index);
  }else{
    questionArea.innerHTML=
      questions.map((q,i)=>cardHTML(q,i)).join("");
  }
}

function toggleDiff(i){
  questions[i].d=!questions[i].d;
  render();
}

// NAV
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
themeBtn.onclick=()=>{
  document.body.classList.toggle("light");
};

// INIT
loadTopics();
