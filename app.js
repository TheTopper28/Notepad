// Wait until DOM ready
document.addEventListener("DOMContentLoaded",()=>{

const loginPage=document.getElementById("loginPage");
const appPage=document.getElementById("appPage");
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");
const nameInput=document.getElementById("nameInput");
const passInput=document.getElementById("passInput");
const error=document.getElementById("loginError");
const userName=document.getElementById("userName");

// ===== LOGIN FUNCTION =====
loginBtn.addEventListener("click",login);

function login(){
  const name=nameInput.value.trim();
  const pass=passInput.value.trim();

  if(!name || !pass){
    error.textContent="Enter username and password";
    return;
  }

  let users=JSON.parse(localStorage.getItem("rev_users")||"{}");

  // register
  if(!users[name]){
    users[name]=pass;
    localStorage.setItem("rev_users",JSON.stringify(users));
  }
  // login
  else if(users[name]!==pass){
    error.textContent="Wrong password";
    return;
  }

  localStorage.setItem("rev_current_user",name);
  showApp(name);
}

// ===== SHOW APP =====
function showApp(name){
  loginPage.classList.add("hidden");
  appPage.classList.remove("hidden");
  userName.textContent=name;
}

// ===== AUTO LOGIN =====
const savedUser=localStorage.getItem("rev_current_user");
if(savedUser){
  showApp(savedUser);
}

// ===== LOGOUT =====
logoutBtn.addEventListener("click",()=>{
  localStorage.removeItem("rev_current_user");
  location.reload();
});

});
