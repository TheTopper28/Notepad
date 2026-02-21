let mode = "all";
let currentIndex = 0;
let marked = [];

const data = {
  math: [
    {q:"What is CI formula?",a:"A = P(1+r/n)^(nt)"},
    {q:"Area of circle?",a:"πr²"}
  ],
  science: [
    {q:"Unit of force?",a:"Newton"},
    {q:"Speed formula?",a:"Distance/Time"}
  ]
};

function login(){
  const name = document.getElementById("username").value;
  if(!name) return;

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");

  renderQuestions();
}

function toggleTheme(){
  document.body.classList.toggle("light");
}

function toggleMode(){
  mode = mode==="all" ? "quiz":"all";
  renderQuestions();
}

function toggleMarked(){
  document.getElementById("markedPanel").classList.toggle("open");
  renderMarked();
}

function renderMarked(){
  const list = document.getElementById("markedList");
  list.innerHTML = marked.map(q=>`<div>${q}</div>`).join("");
}

function renderQuestions(){
  const subject = document.getElementById("subjectSelect").value;
  const container = document.getElementById("quizContainer");
  const questions = data[subject];

  if(mode==="all"){
    container.innerHTML = questions.map((item,i)=>`
      <div class="questionCard">
        <div class="questionText">${item.q}</div>

        <button class="showBtn" onclick="toggleAnswer(${i})">
          Show Answer
        </button>

        <div id="ans${i}" class="answer">${item.a}</div>
      </div>
    `).join("");
  }

  else{
    const q = questions[currentIndex];
    container.innerHTML = `
      <div class="quizCard">
        <div class="quizQuestion">${q.q}</div>

        <button onclick="toggleAnswer('quizAns')">
          Show Answer
        </button>

        <div id="quizAns" class="answer">${q.a}</div>

        <div class="quizButtons">
          <button onclick="prev()">Previous</button>
          <button onclick="next()">Next</button>
          <button onclick="mark('${q.q}')">⭐</button>
        </div>
      </div>
    `;
  }
}

function toggleAnswer(id){
  const el = document.getElementById(
    typeof id==="number" ? "ans"+id : id
  );
  el.style.display = el.style.display==="block"?"none":"block";
}

function next(){
  const subject = document.getElementById("subjectSelect").value;
  currentIndex = (currentIndex+1)%data[subject].length;
  renderQuestions();
}

function prev(){
  const subject = document.getElementById("subjectSelect").value;
  currentIndex =
    (currentIndex-1+data[subject].length)%data[subject].length;
  renderQuestions();
}

function mark(q){
  if(!marked.includes(q)) marked.push(q);
  renderMarked();
}
