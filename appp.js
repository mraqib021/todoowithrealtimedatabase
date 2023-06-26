import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtQLIdY3OLg7kcEA392jqNhms4Dn60MJc",
  authDomain: "jawanpakistan-b9ed6.firebaseapp.com",
  databaseURL: "https://jawanpakistan-b9ed6-default-rtdb.firebaseio.com",
  projectId: "jawanpakistan-b9ed6",
  storageBucket: "jawanpakistan-b9ed6.appspot.com",
  messagingSenderId: "455865725186",
  appId: "1:455865725186:web:f316c27f18d3f4395f121b",
  measurementId: "G-QDN6DEW5EW",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// console.log(app);
// console.log(db);

window.add = () => {
  if (inp_val.value == "" || inp_val.value == " ") {
    alert("Please Insert Todoo");
  } else {
    var refrence = push(ref(db, "todos/"));
    // console.log(refrence.key);
    var obj = {
      value: inp_val.value,
    };
    obj.uid = refrence.key;
    set(refrence, obj);
    inp_val.value = "";
    ul_list.innerHTML = " ";
    getalltodos();
  }
};

window.getalltodos = () => {
  var refer = ref(db, "todos/");
  onValue(refer, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    var x = Object.values(data);
    // console.log(x);
    for (let i = 0; i < x.length; i++) {
      ul_list.innerHTML += `<li><div class="inputbox"><input type="text" name="" disabled value="${x[i].value}" id="modify_val">
      <div class="btn-manage"><button onclick="edit('${x[i].uid}',this)"><i class="fa-solid fa-pen" id="fa-pen"></i><i class="fa-solid fa-check" id="fa-check"></i></button>
      <button onclick="deleted('${x[i].uid}')"><i class="fa-solid fa-trash"></i></button></div></div></li>`;
    }
  });
};

window.edit = (msg, btn) => {
  var uid = msg;
  var editbtn = btn;
  var pen = editbtn.firstChild;
  var check = editbtn.parentElement.firstChild.childNodes[1];
  pen.style.display = "none";
  check.style.display = "block";
  // console.log(inp_val);
  // console.log(editbtn.parentElement.parentElement.firstChild.firstChild);
  var val = editbtn.parentElement.parentElement.firstChild;
  // console.log(editbtn.parentElement.parentElement.firstChild)
  inp_val.focus();
  val.style.textDecoration = "line-through";
  inp_val.value = val.value;
  inp_val.value == "";
  editbtn.removeAttribute("onclick");
  editbtn.setAttribute("onclick", `updated('${uid}',this)`);
};

window.updated = (msgs, btn) => {
  var editbtn = btn;
  var pen = editbtn.firstChild;
  var check = editbtn.parentElement.firstChild.childNodes[1];
  var modify_val = editbtn.parentElement.parentElement.firstChild;
  pen.style.display = "block";
  check.style.display = "none";
  modify_val.style.textDecoration = "none";
  modify_val.value = inp_val.value;
  // console.log(modify_val);
  var refer = ref(db, `todos/${msgs}`);
  var obj = {
    value: inp_val.value,
  };
  update(refer, obj);
  inp_val.value = "";
  ul_list.innerHTML = " ";
  getalltodos();
  editbtn.removeAttribute("onclick");
  editbtn.setAttribute("onclick", `edit('${msgs}')`);
};

window.deleted = (msg) => {
  // console.log(msg);
  remove(ref(db, `todos/${msg}`));
  // console.log(msg);
  ul_list.innerHTML = " ";
  getalltodos();
};
