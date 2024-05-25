// firebase initialization
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDx3YoiqEICCu-WF9nre8M9tMuMDSf8nDk",
  authDomain: "todo-app-with-firebase-db.firebaseapp.com",
  projectId: "todo-app-with-firebase-db",
  storageBucket: "todo-app-with-firebase-db.appspot.com",
  messagingSenderId: "103066029277",
  appId: "1:103066029277:web:8785cb12337677b27b1f34",
};

firebase.initializeApp(firebaseConfig);

// var database = firebase.database().ref("todos");
// // generate key
// var key = database.push().key;
// console.log(key);
// // add object to db
// var todo = {
//   key: key,
//   value: "user1",
// };

// database.child(key).set(todo);
// // get data

// database.on("child_added", function (data) {
//   console.log(data.val());
// });

// old code

var main = document.getElementById("main");
var list = document.getElementById("list");
var todo = document.getElementById("todoText");
var editico = "./plus_ico.png";
main.appendChild(list);

function addTodo() {
  console.log("add function runs");
  var database = firebase.database().ref("todos");
  var key = database.push().key;

  var todoObj = { key: key, todo: todo.value };
  console.log(todoObj);

  // add child to database
  database.child(key).set(todoObj);

  list.innerHTML = "";
  todo.value = "";
  console.log("11");
  // render data to ui after every child added
  database.on("child_added", function (data) {
    var todoEl = document.createElement("li");
    todoEl.setAttribute("class", "todoChild");
    var todoElTxt = document.createTextNode(data.val().todo);
    todoEl.appendChild(todoElTxt);
    list.appendChild(todoEl);
    todo.value = "";

    // edit button
    var editBtnEl = document.createElement("button");
    var editBtnElTxt = document.createTextNode("Edit");

    editBtnEl.appendChild(editBtnElTxt);
    todoEl.appendChild(editBtnEl);
    editBtnEl.setAttribute("onclick", "updateTodo(this)");
    editBtnEl.setAttribute("class", "editBtn");
    editBtnEl.setAttribute("id", data.val().key);

    // delete button
    var data_key_to_pass = data.val().key;
    var delBtnEl = document.createElement("button");
    var delBtnElTxt = document.createTextNode("Delete");
    delBtnEl.appendChild(delBtnElTxt);
    todoEl.appendChild(delBtnEl);
    delBtnEl.setAttribute("id", data.val().key);
    delBtnEl.setAttribute("onclick", `delTodo(this)`);
    delBtnEl.setAttribute("class", "delBtn");
  });
}

function delTodo(e) {
  console.log("parent keys");
  console.log(console.log(e, e.id));
  console.log("parentNode :", e.parentNode);
  var todoListItem = e.parentNode;
  // remove child from database
  firebase.database().ref("todos").child(e.id).remove();
  todoListItem.remove();
}

function updateTodo(e) {
  var todo = document.getElementById("todo");
  var updText = prompt("Enter Updated Todo");
  console.log(e.id);
  console.log("parent node value ");
  console.log(e.parentNode.firstChild.nodeValue);
  //e.parentNode.firstChild = updText;
  e.parentNode.firstChild.nodeValue = updText;

  var editTodo = { key: e.id, todo: updText };
  console.log(editTodo);
  firebase.database().ref("todos").child(e.id).set(editTodo);
}

function delAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
  todo.value = "";
}
