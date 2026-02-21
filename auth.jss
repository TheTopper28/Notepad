let isLogin = false;

const titleEl = document.getElementById("formTitle");
const btn = document.getElementById("authBtn");
const switchText = document.getElementById("switchText");
const switchLink = document.getElementById("switchLink");
const msg = document.getElementById("msg");

switchLink.onclick = () => {
  isLogin = !isLogin;
  msg.textContent = "";
  if (isLogin) {
    titleEl.textContent = "Login";
    btn.textContent = "Login";
    switchText.textContent = "New student?";
    switchLink.textContent = "Create account";
  } else {
    titleEl.textContent = "Create Account";
    btn.textContent = "Sign Up";
    switchText.textContent = "Already have an account?";
    switchLink.textContent = "Login";
  }
};

btn.onclick = () => {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  if (!u || !p) {
    msg.textContent = "Enter username & password";
    return;
  }

  const stored = JSON.parse(localStorage.getItem("rev_users") || "{}");

  if (isLogin) {
    if (!stored[u] || stored[u] !== p) {
      msg.textContent = "Wrong username or password";
      return;
    }
  } else {
    if (stored[u]) {
      msg.textContent = "User already exists";
      return;
    }
    stored[u] = p;
    localStorage.setItem("rev_users", JSON.stringify(stored));
  }

  localStorage.setItem("rev_current_user", u);
  location.href = "index.html";
};
