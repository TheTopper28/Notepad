// ===== LOGIN =====
const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");
const userName = document.getElementById("userName");
const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("userInput");
const passInput = document.getElementById("passInput");
const logoutBtn = document.getElementById("logoutBtn");

// ===== QUIZ ELEMENTS =====
const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionArea = document.getElementById("questionArea");
const counter = document.getElementById("counter");
const themeBtn = document.getElementById("themeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleBtn = document.getElementById("toggleBtn");
const navButtons = document.getElementById("navButtons");
const diffList = document.getElementById("diffList");
const difficultPanel = document.getElementById("difficultPanel");
const toggleDifficultBtn = document.getElementById("toggleDifficultBtn");

// ===== DATA =====
const data = {
  Mathematics: {
    Algebra: [
      {q:"Solve 2x+5=15", a:"x=5", d:false},
      {q:"x²-9", a:"(x-3)(x+3)", d:true}
    ],
    Geometry: [
      {q:"Sum of triangle angles?", a:"180°", d:false}
    ]
  },
  Science: {
    Physics: [
      {q:"Unit of force?", a:"Newton", d:false}
    ]
  }
};

// ===== STATE =====
let questions = [];
let index = 0;
let single = true;
let animating = false;

// ===== LOGIN FUNCTION =====
loginBtn.onclick = () => {
  const u = userInput.value.trim();
  const p = passInput.value.trim();
  if(!u || !p){ alert("Enter details"); return; }
  let users = JSON.parse(localStorage.getItem("rev_users") || "{}");
  if(!users[u]){ users[u] = p; alert("Account created"); }
  else if(users[u] !== p){ alert("Wrong password"); return; }
  localStorage.setItem("rev_users", JSON.stringify(users));
  localStorage.setItem("rev_current_user", u);
  startApp(u);
};

// ===== START APP WITH SAFE TRANSITION =====
function startApp(u){
  loginPage.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  loginPage.style.opacity = "0";
  loginPage.style.transform = "scale(0.95)";

  setTimeout(() => {
    loginPage.classList.add("hidden");
    document.body.style.overflowY = "auto";

    // Show app page
    appPage.classList.remove("hidden");
    appPage.style.opacity = "0";
    appPage.style.transform = "scale(0.95)";
    void appPage.offsetWidth; // force reflow

    appPage.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    appPage.style.opacity = "1";
    appPage.style.transform = "scale(1)";

    userName.textContent = "👤 " + u;

    // First render of questions after page visible
    loadTopics();
  }, 500);
}

// ===== LOGOUT =====
logoutBtn.onclick = () => {
  localStorage.removeItem("rev_current_user");
  location.reload();
};

// ===== INITIAL LOGIN CHECK =====
const currentUser = localStorage.getItem("rev_current_user");
if(currentUser) startApp(currentUser);

// ===== LOAD SUBJECTS =====
Object.keys(data).forEach(s => subjectSelect.innerHTML += `<option>${s}</option>`);
subjectSelect.addEventListener("change", loadTopics);
topicSelect.addEventListener("change", loadQuestions);

// ===== LOAD TOPICS =====
function loadTopics(){
  topicSelect.innerHTML = "";
  Object.keys(data[subjectSelect.value]).forEach(t => {
    topicSelect.innerHTML += `<option>${t}</option>`;
  });
  loadQuestions();
}

// ===== LOAD QUESTIONS =====
function loadQuestions(){
  questions = data[subjectSelect.value][topicSelect.value];
  index = 0;
  render();
}

// ===== RENDER QUESTIONS =====
function render(direction="next"){
  if(animating) return;
  counter.textContent = `${index+1}/${questions.length}`;
  navButtons.style.display = single ? "flex" : "none";

  const oldCard = questionArea.querySelector(".card");
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.innerHTML = questions.length>0
    ? single ? singleCardHTML(questions[index], index)
             : multiCardHTML(questions[index], index)
    : "No questions";

  questionArea.appendChild(newCard);
  attachShowButtons();

  if(oldCard){
    animating = true;
    oldCard.classList.add("exit","exit-active");

    newCard.classList.add("enter");
    void newCard.offsetWidth;
    newCard.classList.add("enter-active");

    setTimeout(() => {
      if(oldCard) oldCard.remove();
      newCard.classList.remove("enter","enter-active");
      animating = false;
    }, 500);
  } else {
    newCard.style.opacity = 1;
    newCard.style.transform = "translateX(0)";
  }

  renderDifficultPanel();
}

// ===== CARD HTML =====
function singleCardHTML(qObj,i){
  return `<b>${qObj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${qObj.d?"⭐":"☆"}</span>
    <div class="answer">${qObj.a}</div>
    <button class="showAnswerBtn">Show/Hide Answer</button>`;
}
function multiCardHTML(qObj,i){
  return `<b>${qObj.q}</b>
    <span class="star" onclick="toggleDiff(${i})">${qObj.d?"⭐":"☆"}</span>
    <div class="answer">${qObj.a}</div>
    <button class="showAnswerBtn">Show/Hide Answer</button>`;
}

// ===== SHOW/HIDE ANSWER =====
function attachShowButtons(){
  document.querySelectorAll(".showAnswerBtn").forEach(btn=>{
    const ans = btn.previousElementSibling;
    btn.onclick = () => { ans.style.display = ans.style.display==="block"?"none":"block"; }
  });
}

// ===== TOGGLE DIFFICULT =====
function toggleDiff(i){
  questions[i].d = !questions[i].d;
  render();
}

// ===== DIFFICULT PANEL =====
function renderDifficultPanel(){
  const difficultQs = questions.filter(q => q.d);
  diffList.innerHTML = difficultQs.length>0
    ? difficultQs.map(q => `<li>${q.q}</li>`).join('')
    : "<li>No difficult questions marked</li>";
}
toggleDifficultBtn.onclick = () => difficultPanel.classList.toggle("active");

// ===== NAVIGATION =====
prevBtn.onclick = () => { if(index>0){ index--; render("prev"); } };
nextBtn.onclick = () => { if(index<questions.length-1){ index++; render("next"); } };

// ===== TOGGLE SINGLE / ALL =====
toggleBtn.onclick = () => {
  single = !single;
  toggleBtn.textContent = single ? "Show All" : "Single";
  render();
};

// ===== THEME =====
themeBtn.onclick = () => document.body.classList.toggle("light");
