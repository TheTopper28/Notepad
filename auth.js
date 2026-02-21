let isLogin = false;

const title = document.getElementById("formTitle");
const btn = document.getElementById("authBtn");
const link = document.getElementById("switchLink");
const text = document.getElementById("switchText");
const msg = document.getElementById("msg");

link.onclick = () => {
  isLogin = !isLogin;
  if (isLogin) {
    title.textContent = "Login";
    btn.textContent = "Login";
    text.textContent = "New user?";
    link.textContent = "Create account";
  } else {
    title.textContent = "Create Account";
    btn.textContent = "Sign Up";
    text.textContent = "Already have account?";
    link.textContent = "Login";
  }
};

btn.onclick = () => {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return msg.textContent = "Enter details";

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isLogin) {
    if (users[u] === p) {
      localStorage.setItem("activeUser", u);
      location.href = "index.html";
    } else {
      msg.textContent = "Wrong login";
    }
  } else {
    users[u] = p;
    localStorage.setItem("users", JSON.stringify(users));
    msg.textContent = "Account created ✔ Login now";
  }
};
