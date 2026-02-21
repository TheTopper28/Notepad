// redirect if not logged
const currentUser=localStorage.getItem("rev_current_user");
if(!currentUser){location.href="login.html";}

// show user
document.getElementById("userName").textContent="👋 "+currentUser;

document.getElementById("logoutBtn").onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.href="login.html";
};

// ===== DATA =====
const data={
 Computer:{
    Chapter4:[
      {q:"What is the fullform of IDE",a:"Integrated Development Environment"},
      {q:"If a line begins from '//' it is a _______",a:"Comment line"},
      {q:"What are variables?",a:"A variable is a portion of memory used to store values."},
      {q:"What are constants?",a:"A constant is a sequence of characters that have fixed value."},
      {q:"Define BODMAS",a:"Brackets Of Division Multiplication Addition and Subtraction."},
      {q:"Give an example of logical operators",a:" '&&' '||'  '!' "},
      {q:"What are relational operators",a:"They are operators that show comparison i.e. ==,>=,<= etc."}
    ]
  },
  Science:{
    Physics:[
      {q:"QUESTIONS NOT YET UPLOADED",a:""}
    ]
  }
};

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
  localStorage.setItem("rev_theme", document.body.classList.contains("light") ? "light" : "dark");
};
if (localStorage.getItem("rev_theme") === "light") {
  document.body.classList.add("light");
}

// Quiz Mode
let quizMode = false;
const quizToggle = document.getElementById("quizToggle");
quizToggle.onclick = () => {
  quizMode = !quizMode;
  quizToggle.textContent = quizMode ? "Practice Mode" : "Quiz Mode";
  showQuestions();
};

function populateSubjects(){
  subjectSelect.innerHTML="";
  Object.keys(data).forEach(s=>{
    const o=document.createElement("option");
    o.value=s;o.textContent=s;
    subject
